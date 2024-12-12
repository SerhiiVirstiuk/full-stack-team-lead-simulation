import { DataSourceState, IObservableSuggestionsDataSource, SuggestionsDataSourceStateListener } from "../../../components/Autocomplete/DataSources/DataSource.types";
import { ICity } from "./CitiesApiSuggestionsDataSource.types";
import { CancelablePromise, CitiesService, CityModel, GetCitiesResponse } from "../../../integrations/CitiesApi";
import { Value } from "sass";

const DEFAULT_STATE: DataSourceState<ICity> = {
    isLoading: false,
    error: null,
    suggestions: [],
    suggestionsTotalNumber: 0,
    valueToComplete: ''
}

const DEFAULT_ERROR_MESSAGE = "An error occured while fetching suggestions";

class RequestCancelledError extends Error {
}

class CitiesApiSuggestionsDataSource implements IObservableSuggestionsDataSource<ICity> {
    private isInitialized: boolean = false;
    private listeners: SuggestionsDataSourceStateListener<ICity>[] = [];
    private currentRequest?: CancelablePromise<GetCitiesResponse>;
    private simultanousRequests: number = 0;

    private dataSourceState: DataSourceState<ICity> = DEFAULT_STATE;

    async suggestFor(valueToComplete: string, itemsNumber: number): Promise<ICity[]> {
        this.isInitialized = false;
        this.dataSourceState = {
            ...DEFAULT_STATE,
            valueToComplete: valueToComplete,
            isLoading: true
        };
        this.notifyStateChanged();

        const citiesResponsePromise = this.requestCities(valueToComplete, 0, itemsNumber, true);

        let citiesResponse: GetCitiesResponse | null = null;
        try {
            citiesResponse = await citiesResponsePromise;
        } catch (error) {
            if (error instanceof RequestCancelledError) {
                return [];
            } else {
                this.decrementRequestsCount();
                this.dataSourceState.error = (error as Error).message ?? DEFAULT_ERROR_MESSAGE;
                this.notifyStateChanged();
            }
        }

        if (!citiesResponse)
        {
            this.dataSourceState.error = DEFAULT_ERROR_MESSAGE;
            return [];
        }

        this.dataSourceState.suggestions = citiesResponse.cities 
            ? citiesResponse.cities.map<ICity>(this.mapCityModelToSuggestion)
            : [];
        this.dataSourceState.suggestionsTotalNumber = citiesResponse.totalCount ?? 0;

        this.decrementRequestsCount();
        this.isInitialized = true;
        this.notifyStateChanged();

        return this.dataSourceState.suggestions;
    }

    async suggestMore(offset: number, itemsNumber: number): Promise<ICity[]> {
        if (this.isInitialized)
        {
            const citiesResponsePromise = this.requestCities(this.dataSourceState.valueToComplete, 0, itemsNumber);
            this.incrementRequestsCount();
            this.notifyStateChanged();

            let citiesResponse: GetCitiesResponse | null = null;
            try {
                citiesResponse = await citiesResponsePromise;
            } catch (error) {
                if (error instanceof RequestCancelledError) {
                    return [];
                } else {
                    this.decrementRequestsCount();
                    this.dataSourceState.error = (error as Error).message ?? DEFAULT_ERROR_MESSAGE;
                    this.notifyStateChanged();
                }
            }
    
            if (!citiesResponse)
            {
                this.dataSourceState.error = DEFAULT_ERROR_MESSAGE;
                return [];
            }

            const additionalSuggestions = citiesResponse.cities
                ? citiesResponse.cities.map<ICity>(this.mapCityModelToSuggestion) 
                : [];

            for (const initialIndex in additionalSuggestions)
            {
                this.dataSourceState.suggestions[offset + parseInt(initialIndex)] = additionalSuggestions[initialIndex];
            }

            this.decrementRequestsCount();
            this.notifyStateChanged();

            return additionalSuggestions;
        }

        return [];
    }

    isValidValue(value: string): boolean {
        return this.dataSourceState.suggestions.some(s => s.value == value);
    }

    subscribe(listener: SuggestionsDataSourceStateListener<ICity>): () => void {
        this.listeners.push(listener);

        // Return unsubscribe function
        return () => {
          this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyStateChanged() {
        const updatedDataSourceState = structuredClone(this.dataSourceState);

        this.listeners.forEach((listener) =>
            listener(updatedDataSourceState)
        );
    }

    private async requestCities(startsWith?: string, offset?: number, limit?: number, cancelPrevious: boolean = false): Promise<GetCitiesResponse> {
        if (cancelPrevious && this.currentRequest && !this.currentRequest.isCancelled)
        {
            this.currentRequest.cancel();
        }
        
        const request = CitiesService.getApiV10Cities(startsWith, offset, limit);
        this.currentRequest = request;

        let citiesResponse;
        try {
            citiesResponse = await request;
        }
        catch (error)
        {
            if (request.isCancelled)
            {
                throw new RequestCancelledError;
            }

            throw error;
        }

        return citiesResponse;
    }

    private mapCityModelToSuggestion(cityModel: CityModel): ICity { 
        return {
            value: cityModel.name!,
            country: cityModel.country,
            lat: cityModel.latitude,
            lng: cityModel.longtitude
        };
    };

    private incrementRequestsCount()
    {
        this.simultanousRequests++;
        this.dataSourceState.isLoading = this.simultanousRequests > 0;
    }

    private decrementRequestsCount()
    {
        this.simultanousRequests--;
        this.dataSourceState.isLoading = this.simultanousRequests > 0;
    }
}

export default CitiesApiSuggestionsDataSource;