export interface SuggestionItemProps<TSuggestion> {
    value: TSuggestion,
    searchValue: string,
    itemHeight?: number
    className?: string
}