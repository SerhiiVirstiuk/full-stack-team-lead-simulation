import { FixedSizeList } from "react-window";
import { SuggestionsListComponentProps } from "./SuggestionsList.types";
import { ISuggestion } from "../../Autocomplete.types";
import InfiniteLoader from "react-window-infinite-loader";
import LoadingItemComponent from "./LoadingItemComponent";

function SuggestionsListComponent<TSuggestion extends ISuggestion | string = string>(props: SuggestionsListComponentProps<TSuggestion>) {
    const getOnChooseSuggestionEvent = (suggestion: TSuggestion) => () => props.onChooseSuggestion(suggestion);

    const estimatedListHeight = props.suggestionItemHeight * props.suggestions.length;
    const estimatedSuggestionsDropdownHeight = props.suggestionContainerMaxHeight < estimatedListHeight
        ? props.suggestionContainerMaxHeight 
        : estimatedListHeight;

    return (
        <ul>
            <InfiniteLoader
                isItemLoaded={(index) => !!props.suggestions[index]}
                itemCount={props.suggestionsTotalNumber}
                minimumBatchSize={props.suggestionsBatchSize}
                threshold={props.suggestionsBatchSize * 0.5}
                loadMoreItems={props.suggestMoreDelegate}>
                {({ onItemsRendered, ref }) => (
                    <FixedSizeList
                        ref={ref}
                        className='scrollable'
                        overscanCount={8}
                        onItemsRendered={onItemsRendered}
                        height={estimatedSuggestionsDropdownHeight}
                        itemCount={props.suggestionsTotalNumber}
                        itemSize={props.suggestionItemHeight}
                        width={'100%'}
                        >
                            {({ index, style }) => (
                                <li style={{ height: props.suggestionItemHeight, ...style }} onClick={getOnChooseSuggestionEvent(props.suggestions[index])} key={index}>
                                    { props.suggestions[index]
                                        ?   (props.suggestionItemTemplate({
                                                value: props.suggestions[index] ?? '', 
                                                searchValue: props.valueToComplete,
                                                itemHeight: props.suggestionItemHeight
                                            }))
                                        : <LoadingItemComponent index={index} /> }
                                </li>
                            )}
                    </FixedSizeList>
                )}
            </InfiniteLoader>
        </ul>
    );
}

export default SuggestionsListComponent;