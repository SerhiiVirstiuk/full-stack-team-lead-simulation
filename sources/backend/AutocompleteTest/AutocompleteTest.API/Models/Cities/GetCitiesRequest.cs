using AutocompleteTest.API.Models.Pagination;

namespace AutocompleteTest.API.Models.Cities
{
    public class GetCitiesRequest : OffsetPaginationRequest
    {
        public string? StartsWith { get; init; }
    }
}
