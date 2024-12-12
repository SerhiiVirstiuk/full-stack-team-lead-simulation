using AutocompleteTest.Core.Pagination;

namespace AutocompleteTest.Core.Cities
{
    public interface ICitiesReadRepository
    {
        Task<PaginatedResult<City>> SearchCitiesAsync(string? startsWith, int offset, int limit, CancellationToken? cancellationToken);
    }
}
