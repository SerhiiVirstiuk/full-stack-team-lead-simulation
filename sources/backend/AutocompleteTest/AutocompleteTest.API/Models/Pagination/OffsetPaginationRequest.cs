namespace AutocompleteTest.API.Models.Pagination
{
    public abstract class OffsetPaginationRequest
    {
        public int Offset { get; init; } = 0;

        public int Limit { get; init; } = 10;
    }
}
