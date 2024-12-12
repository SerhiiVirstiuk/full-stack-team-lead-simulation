import { useMemo } from "react";
import { ISuggestion } from "../Autocomplete.types";
import { IObservableSuggestionsDataSource } from "./DataSource.types";
import LocalDataSource from "./LocalDataSource";

export function resolveSuggestionsSource<TSuggestion extends ISuggestion | string>(suggestionsSource: TSuggestion[] | IObservableSuggestionsDataSource<TSuggestion>) 
    : IObservableSuggestionsDataSource<TSuggestion>
{
    return Array.isArray(suggestionsSource) ? useMemo(() => new LocalDataSource(suggestionsSource), [suggestionsSource]) : suggestionsSource;
}