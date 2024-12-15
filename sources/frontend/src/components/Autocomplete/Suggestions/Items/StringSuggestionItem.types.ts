import { ISuggestion } from "../../Autocomplete.types";
import { SuggestionItemProps } from "./SuggestionItem.types";

export interface StringSuggestionItemProps extends SuggestionItemProps<string> {
}

export function convertToStringItemProps<TSuggestion>(props: SuggestionItemProps<TSuggestion>) 
{
    return ({
        ...props,
        value: (props.value as ISuggestion).value ?? ''
    }) as StringSuggestionItemProps
}