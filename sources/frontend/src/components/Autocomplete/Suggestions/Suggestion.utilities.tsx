import { ISuggestion } from "../Autocomplete.types";
import StringSuggestionItemComponent from "./Items/StringSuggestionItem";
import { convertToStringItemProps } from "./Items/StringSuggestionItem.types";
import { SuggestionItemProps } from "./Items/SuggestionItem.types";


export function resolveSuggestionItemTemplate<TSuggestion extends ISuggestion | string>(suggestionItemTemplate: ((suggestionItemProps : SuggestionItemProps<TSuggestion>) => JSX.Element) | null | undefined) 
    : (suggestionItemProps : SuggestionItemProps<TSuggestion>) => JSX.Element
{
    const defaultSuggestionItemTemplate = (suggestionItemProps : SuggestionItemProps<TSuggestion>) => 
        <StringSuggestionItemComponent {...convertToStringItemProps(suggestionItemProps)} />;

    return suggestionItemTemplate 
        ?? defaultSuggestionItemTemplate;
}