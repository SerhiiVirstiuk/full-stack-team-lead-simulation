import './Autocomplete.scss';
import Content from "../StickyDropdown/Content/Content";
import StickyDropdown from "../StickyDropdown/StickyDropdown";
import Target from "../StickyDropdown/Target/Target";
import { useEffect, useState } from 'react';
import { AutocompleteProps, ISuggestion } from './Autocomplete.types';
import SuggestionsListComponent from './Suggestions/List/SuggestionsList';
import { getSuggestionValue } from './Autocomplete.utilities';
import { useSuggestionsDataSource } from './DataSources/DataSource.hooks';
import { resolveSuggestionsSource } from './DataSources/DataSource.utilities';
import { resolveSuggestionItemTemplate } from './Suggestions/Suggestion.utilities';
import MinimumLengthFallback from './Fallbacks/MinimumLengthFallback';
import ErrorFallback from './Fallbacks/ErrorFallback';
import { useDebouncedState } from '../../hooks/useDebouncedState';
import NoSuggestionsFallback from './Fallbacks/NoSuggestionsFallback';
import Spinner from '../Spinner/Spinner';

const DEFAULT_DROPDOWN_MAX_HEIGHT = 300;
const DEFAULT_SUGGESTION_ITEM_HEIGHT = 50;
const DEFAULT_SUGGESTIONS_BATCH = 10;
const DEFAULT_DEBOUNCE_DELAY= 200;

function AutocompleteInputComponent<TSuggestion extends ISuggestion | string = string>(props: AutocompleteProps<TSuggestion>) {
    const [valueToComplete, debouncedValueToComplete, setValueToComplete] = 
        useDebouncedState(props.initialValue ?? '', DEFAULT_DEBOUNCE_DELAY);

    const suggestionsSource = resolveSuggestionsSource(props.suggestionsSource);
    const dataSourceState = useSuggestionsDataSource<TSuggestion>(suggestionsSource);
    const suggestionsBatchSize = DEFAULT_SUGGESTIONS_BATCH;

    const isValidValue = (value: string) => !props.isStrictMode 
                                         || suggestionsSource.isValidValue(value);
    const isLongEnoughValue = (value: string) => value.length >= (props.loadSuggestionsAfterLength ?? 0);

    const suggestionItemTemplate = resolveSuggestionItemTemplate(props.suggestionItemTemplate);

    const suggestionsDropdownMaxHeight = props.suggestionsDropdownMaxHeight ?? DEFAULT_DROPDOWN_MAX_HEIGHT;
    const suggestionItemHeight = props.suggestionItemHeight ?? DEFAULT_SUGGESTION_ITEM_HEIGHT;

    // Suggestion click handler
    const chooseSuggestion = (suggestion: TSuggestion) => {
        setValueToComplete(getSuggestionValue<TSuggestion>(suggestion));
    };

    // Strict Mode denies values out of the suggestion list
    const handleBlur = () => {
        if (!isValidValue(debouncedValueToComplete))
        {
            setValueToComplete('');
        }
    }
    
    useEffect(() => {
        // Suggestions list initial loading
        if (isLongEnoughValue(debouncedValueToComplete))
        {
            suggestionsSource.suggestFor(debouncedValueToComplete, suggestionsBatchSize);
        }

        // Notify client component  that value has changed
        props.onValueChanged?.(isValidValue(debouncedValueToComplete) ? debouncedValueToComplete : '');
    }, [debouncedValueToComplete, props.loadSuggestionsAfterLength]);

    // Callback for loading next batches
    const suggestMore = async (startIndex: number, stopIndex: number) => {
        if (isLongEnoughValue(debouncedValueToComplete))
        {
            await suggestionsSource.suggestMore(startIndex, stopIndex - startIndex + 1);
        }
    };

    const suggestionsList = (<>
        <SuggestionsListComponent<TSuggestion> 
            valueToComplete={valueToComplete}
            suggestions={dataSourceState.suggestions}
            suggestionsTotalNumber={dataSourceState.suggestionsTotalNumber}
            suggestionsBatchSize={suggestionsBatchSize}
            suggestMoreDelegate={suggestMore}
            suggestionItemTemplate={suggestionItemTemplate}
            suggestionItemHeight={suggestionItemHeight}
            suggestionContainerMaxHeight={suggestionsDropdownMaxHeight}
            onChooseSuggestion={chooseSuggestion} />
        <div className="suggestions-number">{dataSourceState.suggestionsTotalNumber}</div>
    </>);

    const minimumLengthFallbackFallback = <MinimumLengthFallback 
        actualLength={valueToComplete.length} 
        expectedLength={props.loadSuggestionsAfterLength ?? 0} />;
    const errorFallbackFallback = <ErrorFallback 
        errorMessage={dataSourceState.error ?? 'no details'} />;
    const noSuggesstionsFallback = <NoSuggestionsFallback />;

    return (
        <div className="autocomplete">
            <StickyDropdown
                onBlur={handleBlur}
                maxHeight={suggestionsDropdownMaxHeight}>
                <Target>
                    <input 
                        placeholder={props.placeholder ?? ''}
                        type="text"
                        autoComplete="off"
                        value={valueToComplete}
                        onChange={(e) => setValueToComplete(e.target.value)} />
                </Target>
                <Content>
                    {dataSourceState.error 
                        ? errorFallbackFallback
                        : isLongEnoughValue(valueToComplete) 
                            ? dataSourceState.suggestionsTotalNumber > 0 
                                ? suggestionsList
                                : noSuggesstionsFallback
                            : minimumLengthFallbackFallback}
                </Content>
            </StickyDropdown>
            <Spinner isVisible={dataSourceState.isLoading} />
        </div>
    );
}

export default AutocompleteInputComponent;