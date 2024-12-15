import { ISuggestion } from "../Autocomplete.types";
import { getSuggestionValue } from "../Autocomplete.utilities";
import { DataSourceState, IObservableSuggestionsDataSource, SuggestionsDataSourceStateListener } from "./DataSource.types";

class LocalDataSource<TSuggestion extends ISuggestion | string> implements IObservableSuggestionsDataSource<TSuggestion> {
    private allPossibleSuggestions: TSuggestion[];
    private allSatisfyingSuggestions: TSuggestion[] = [];
    private isInitialized: boolean = false;
    private listeners: SuggestionsDataSourceStateListener<TSuggestion>[] = [];

    private dataSourceState: DataSourceState<TSuggestion> = {
        isLoading: false,
        error: null,
        suggestions: [],
        suggestionsTotalNumber: 0,
        valueToComplete: ''
    };

    constructor(suggestions: TSuggestion[]) {
        this.allPossibleSuggestions = suggestions;
    }

    suggestFor(valueToComplete: string, itemsNumber: number): Promise<TSuggestion[]> {
        this.allSatisfyingSuggestions = this.allPossibleSuggestions
            .filter(s => getSuggestionValue(s).toUpperCase().startsWith(valueToComplete.toUpperCase()));

        this.dataSourceState = {
            ...this.dataSourceState,
            suggestionsTotalNumber: this.allSatisfyingSuggestions.length,
            suggestions: this.allSatisfyingSuggestions.slice(0, itemsNumber),
            valueToComplete
        }

        this.isInitialized = true;
        this.notifyStateChanged();
        return Promise.resolve(this.dataSourceState.suggestions);
    }

    suggestMore(offset: number, itemsNumber: number): Promise<TSuggestion[]> {
        let additionalSuggestions: TSuggestion[] = [];

        if (this.isInitialized)
        {
            const additionalSuggestions = this.allSatisfyingSuggestions
                .slice(offset, offset + itemsNumber);

            for (const initialIndex in additionalSuggestions)
            {
                this.dataSourceState.suggestions[offset + parseInt(initialIndex)] = additionalSuggestions[initialIndex];
            }
            this.dataSourceState.suggestionsTotalNumber = this.allSatisfyingSuggestions.length;

            this.notifyStateChanged();
        }

        return Promise.resolve(additionalSuggestions);
    }
    
    isValidValue(value: string): boolean {
        return this.allPossibleSuggestions.some(s => getSuggestionValue(s) === value);
    }

    subscribe(listener: SuggestionsDataSourceStateListener<TSuggestion>): () => void {
        this.listeners.push(listener);

        // Return unsubscribe function
        return () => {
          this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyStateChanged() {
        this.listeners.forEach((listener) =>
            listener(this.dataSourceState)
        );
    }
}

export default LocalDataSource;