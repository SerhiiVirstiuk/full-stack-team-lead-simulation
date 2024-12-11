import './Autocomplete.scss';
import Content from "../StickyDropdown/Content/Content";
import StickyDropdown from "../StickyDropdown/StickyDropdown";
import Target from "../StickyDropdown/Target/Target";
import { useState } from 'react';
import { AutocompleteProps, ISuggestion } from './Autocomplete.types';
import SuggestionsListComponent from './Suggestions/List/SuggestionsList';
import { getSuggestionValue } from './Autocomplete.utilities';
import { useSuggestionsDataSource } from './DataSources/DataSource.hooks';
import { resolveSuggestionsSource } from './DataSources/DataSource.utilities';
import { resolveSuggestionItemTemplate } from './Suggestions/Suggestion.utilities';

const DEFAULT_DROPDOWN_MAX_HEIGHT = 300;
const DEFAULT_SUGGESTION_ITEM_HEIGHT = 50;

function AutocompleteInputComponent<TSuggestion extends ISuggestion | string = string>(props: AutocompleteProps<TSuggestion>) {
    const [valueToComplete, setValueToComplete] = useState(props.searchValue ?? '');

    const suggestionsSource = resolveSuggestionsSource(props.suggestionsSource);
    const dataSourceState = useSuggestionsDataSource<TSuggestion>(suggestionsSource);

    const suggestionItemTemplate = resolveSuggestionItemTemplate(props.suggestionItemTemplate);

    const suggestionsDropdownMaxHeight = props.suggestionsDropdownMaxHeight ?? DEFAULT_DROPDOWN_MAX_HEIGHT;
    const suggestionItemHeight = props.suggestionItemHeight ?? DEFAULT_SUGGESTION_ITEM_HEIGHT;

    const chooseSuggestion = (suggestion: TSuggestion) => setValueToComplete(getSuggestionValue<TSuggestion>(suggestion));

    return (
        <div className="autocomplete">
            <StickyDropdown
                maxHeight={suggestionsDropdownMaxHeight}>
                <Target>
                    <input 
                        type="text"
                        autoComplete="off"
                        value={valueToComplete}
                        onChange={e => setValueToComplete(e.target.value)} />
                </Target>
                <Content>
                    <SuggestionsListComponent<TSuggestion> 
                        valueToComplete={valueToComplete} 
                        suggestions={dataSourceState.suggestions} 
                        suggestionItemTemplate={suggestionItemTemplate}
                        suggestionItemHeight={suggestionItemHeight} 
                        suggestionContainerMaxHeight={0} 
                        onChooseSuggestion={chooseSuggestion} />
                </Content>
            </StickyDropdown>
        </div>
    );
}

export default AutocompleteInputComponent;