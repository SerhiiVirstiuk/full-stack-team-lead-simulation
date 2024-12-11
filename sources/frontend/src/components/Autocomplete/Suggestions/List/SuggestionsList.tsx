import { FixedSizeList } from "react-window";
import { SuggestionsListComponentProps } from "./SuggestionsList.types";
import { ISuggestion } from "../../Autocomplete.types";

function SuggestionsListComponent<TSuggestion extends ISuggestion | string = string>(props: SuggestionsListComponentProps<TSuggestion>) {
    const getOnChooseSuggestionEvent = (suggestion: TSuggestion) => () => props.onChooseSuggestion(suggestion);

    const estimatedListHeight = props.suggestionItemHeight * props.suggestions.length;
    const estimatedSuggestionsDropdownHeight = props.suggestionContainerMaxHeight < estimatedListHeight
        ? props.suggestionContainerMaxHeight 
        : estimatedListHeight;

    return (
        <ul>
            <FixedSizeList
                className='scrollable'
                height={estimatedSuggestionsDropdownHeight} // height of the list container
                itemCount={props.suggestions.length} // total number of items
                itemSize={props.suggestionItemHeight} // height of each item
                width={'100%'} // width of the list container
                >
                    {({ index, style }) => (
                        <li style={{ height: props.suggestionItemHeight, ...style }} onClick={getOnChooseSuggestionEvent(props.suggestions[index])}>
                            {(props.suggestionItemTemplate({
                                value: props.suggestions[index], 
                                searchValue: props.valueToComplete,
                                itemHeight: props.suggestionItemHeight
                            }))}
                        </li>
                    )}
            </FixedSizeList>
        </ul>
    );
}

export default SuggestionsListComponent;