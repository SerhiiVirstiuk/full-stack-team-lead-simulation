import { ISuggestion } from "../Autocomplete.types";
import { getSuggestionValue } from "../Autocomplete.utilities";
import { DataSourceState, IObservableSuggestionsDataSource, SuggestionsDataSourceStateListener } from "./DataSource.types";

class LocalDataSource<TSuggestion extends ISuggestion | string> implements IObservableSuggestionsDataSource<TSuggestion> {
    totalSuggestionsNumber: number;
    private allPossibleSuggestions: TSuggestion[];
    private valueToComplete: string = '';

    private dataSourceState: DataSourceState<TSuggestion> = {
        isLoading: false,
        error: null,
        suggestions: [],
    };

    private listeners: SuggestionsDataSourceStateListener<TSuggestion>[] = [];

    constructor(suggestions: TSuggestion[]) {
        this.allPossibleSuggestions = suggestions;
        this.totalSuggestionsNumber = suggestions.length;
    }

    suggestFor(valueToComplete: string, itemsNumber: number): Promise<TSuggestion[]> {
        this.valueToComplete = valueToComplete;

        const allSatisfyingSuggestions = this.allPossibleSuggestions
        .filter(s => getSuggestionValue(s).startsWith(valueToComplete));

        this.totalSuggestionsNumber = allSatisfyingSuggestions.length;
        this.dataSourceState.suggestions = allSatisfyingSuggestions.slice(0, itemsNumber - 1);

        this.notifyStateChanged();
        return Promise.resolve(this.dataSourceState.suggestions);
    }

    suggestMore(offset: number, itemsNumber: number): Promise<TSuggestion[]> {
        const additionalSuggestions = this.allPossibleSuggestions
            .filter(s => getSuggestionValue(s).startsWith(this.valueToComplete))
            .slice(offset, offset + itemsNumber - 1);

        this.dataSourceState.suggestions = [...this.dataSourceState.suggestions, ...additionalSuggestions];

        this.notifyStateChanged();
        return Promise.resolve(additionalSuggestions);
    }

    getProposedSuggestions(): TSuggestion[] {
        return this.dataSourceState.suggestions ?? [];
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