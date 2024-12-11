import { IObservableSuggestionsDataSource } from "./DataSources/DataSource.types";
import { SugggestionItemProps } from "./Suggestions/Items/SuggestionItem.types";

export interface AutocompleteProps<TSuggestion extends ISuggestion | string = string> {
    placeholder?: string | null;
    searchValue?: string;
    suggestionItemTemplate?: ((suggestionItemProps : SugggestionItemProps<TSuggestion>) => JSX.Element) | null;
    suggestionItemHeight?: number
    suggestionsDropdownMaxHeight?: number
    suggestionsSource: TSuggestion[] | IObservableSuggestionsDataSource<TSuggestion>
}

export interface ISuggestion {
    value: string
}