import { ISuggestion } from "../Autocomplete.types";

export interface DataSourceState<TSuggestion = ISuggestion | string> {
    isLoading: boolean;
    error: string | null;
    suggestions: TSuggestion[];
    suggestionsTotalNumber: number;
    valueToComplete: string;
}

export type SuggestionsDataSourceStateListener<TSuggestion = ISuggestion | string> = (state: DataSourceState<TSuggestion>) => void;

interface ISuggestionsDataSource<TSuggestion = ISuggestion | string> {
    suggestFor(valueToComplete: string, itemsNumber: number): Promise<TSuggestion[]>;
    suggestMore(offset: number, itemsNumber: number): Promise<TSuggestion[]>;
    isValidValue(value: string): boolean;
}

export interface IObservableSuggestionsDataSource<TSuggestion = ISuggestion | string> extends ISuggestionsDataSource<TSuggestion> {
    subscribe(listener: SuggestionsDataSourceStateListener<TSuggestion>): () => void;
}