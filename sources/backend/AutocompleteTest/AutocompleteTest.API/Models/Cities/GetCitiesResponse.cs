using AutocompleteTest.API.Models.Pagination;

namespace AutocompleteTest.API.Models.Cities
{
    public class GetCitiesResponse : OffsetPaginationResponse
    {
        public IReadOnlyCollection<CityModel> Cities { get; init; }
    }
}
