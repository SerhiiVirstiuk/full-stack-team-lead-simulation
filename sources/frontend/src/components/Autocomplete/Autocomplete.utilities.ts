import { ISuggestion } from "./Autocomplete.types";

export function getSuggestionValue<TSuggestion extends ISuggestion | string = string>(suggestion: TSuggestion): string
{
    return typeof suggestion === 'string' ? suggestion : suggestion.value;
}

export function isLoadedSuggestion<TSuggestion extends ISuggestion | string = string>(suggestion: TSuggestion): boolean
{
    return typeof suggestion === 'string' ? !!suggestion : !!suggestion.value;
}