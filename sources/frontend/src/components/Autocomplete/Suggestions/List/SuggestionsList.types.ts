import { SugggestionItemProps } from "../Items/SuggestionItem.types";

export interface SuggestionsListComponentProps<TSuggestion> {
    valueToComplete: string,
    suggestions: TSuggestion[],
    suggestionsTotalNumber: number,
    suggestMoreDelegate: (startIndex: number, stopIndex: number) => Promise<void>,
    suggestionsBatchSize: number,
    suggestionItemTemplate: (suggestionItemProps : SugggestionItemProps<TSuggestion>) => JSX.Element;
    suggestionItemHeight: number,
    suggestionContainerMaxHeight: number,
    onChooseSuggestion: (suggestions: TSuggestion) => void;
}