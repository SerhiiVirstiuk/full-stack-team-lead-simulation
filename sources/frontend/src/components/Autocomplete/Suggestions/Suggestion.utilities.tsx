import { ISuggestion } from "../Autocomplete.types";
import StringSuggestionItemComponent from "./Items/StringSuggestionItem";
import { convertToStringItemProps } from "./Items/StringSuggestionItem.types";
import { SugggestionItemProps } from "./Items/SuggestionItem.types";


export function resolveSuggestionItemTemplate<TSuggestion extends ISuggestion | string>(suggestionItemTemplate: ((suggestionItemProps : SugggestionItemProps<TSuggestion>) => JSX.Element) | null | undefined) 
    : (suggestionItemProps : SugggestionItemProps<TSuggestion>) => JSX.Element
{
    const defaultSuggestionItemTemplate = (suggestionItemProps : SugggestionItemProps<TSuggestion>) => 
        <StringSuggestionItemComponent {...convertToStringItemProps(suggestionItemProps)} />;

    return suggestionItemTemplate 
        ?? defaultSuggestionItemTemplate;
}