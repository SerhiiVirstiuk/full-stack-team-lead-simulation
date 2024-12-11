import { SugggestionItemProps } from "./SuggestionItem.types";

export interface StringSuggestionItemProps extends SugggestionItemProps<string> {
}

export function convertToStringItemProps<TSuggestion>(props: SugggestionItemProps<TSuggestion>) 
{
    return ({
        ...props,
        value: (props.value as object).toString()
    }) as StringSuggestionItemProps
}