namespace AutocompleteTest.API.Models.Pagination
{
    public abstract class OffsetPaginationResponse
    {
        public int Offset { get; init; } = 0;

        public int Limit { get; init; } = 10;

        public int TotalCount { get; init; }
    }
}
