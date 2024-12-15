import { IObservableSuggestionsDataSource } from "./DataSources/DataSource.types";
import { SuggestionItemProps } from "./Suggestions/Items/SuggestionItem.types";

export interface AutocompleteProps<TSuggestion extends ISuggestion | string = string> {
    placeholder?: string | null;
    initialValue?: string;
    isStrictMode?: boolean;
    loadSuggestionsAfterLength?: number;
    suggestionItemTemplate?: ((suggestionItemProps : SuggestionItemProps<TSuggestion>) => JSX.Element) | null;
    suggestionItemHeight?: number;
    suggestionsDropdownMaxHeight?: number;
    onValueChanged?: (value: string) => void;
    suggestionsSource: TSuggestion[] | IObservableSuggestionsDataSource<TSuggestion>;
}

export interface ISuggestion {
    value: string
}