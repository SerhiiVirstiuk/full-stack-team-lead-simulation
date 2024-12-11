import { useEffect, useState } from "react";
import { DataSourceState, IObservableSuggestionsDataSource } from "./DataSource.types";
import { ISuggestion } from "../Autocomplete.types";

export function useSuggestionsDataSource<TSuggestion = ISuggestion | string>(dataSource: IObservableSuggestionsDataSource<TSuggestion>) {
    const [state, setState] = useState<DataSourceState<TSuggestion>>({
        isLoading: false,
        error: null,
        suggestions: [],
    });
  
    useEffect(() => {
      const unsubscribe = dataSource.subscribe((newState) => setState(newState));
      return () => unsubscribe();
    }, [dataSource]);
  
    return state;
  }