using AutocompleteTest.Core.Pagination;
using AutocompleteTest.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AutocompleteTest.Core.Cities
{
    internal class CitiesReadRepository : ICitiesReadRepository
    {
        private readonly CitiesDbContext dbContext;
        private readonly IMapper mapper;

        public CitiesReadRepository(CitiesDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<PaginatedResult<City>> SearchCitiesAsync(string? startsWith, int offset, int limit, CancellationToken? cancellationToken)
        {
            if (offset < 0 || limit <= 0)
            {
                throw new ArgumentException("Offset must be non-negative and limit must be greater than 0.");
            }

            if (cancellationToken is null)
            {
                cancellationToken = CancellationToken.None;
            }

            var totalCount = await dbContext.Cities
                .WhereIf(startsWith is not null, loc => loc.Name.StartsWith(startsWith!, StringComparison.InvariantCultureIgnoreCase))
                .CountAsync();

            var items = await dbContext.Cities
                .WhereIf(startsWith is not null, loc => loc.Name.StartsWith(startsWith!, StringComparison.InvariantCultureIgnoreCase))
                .OrderBy(loc => loc.Name)
                .Skip(offset)
                .Take(limit)
                .ToListAsync();

            var mappedItems = mapper.Map<IReadOnlyCollection<City>>(items);

            return new PaginatedResult<City>(mappedItems, totalCount, offset, limit);
        }
    }
}
