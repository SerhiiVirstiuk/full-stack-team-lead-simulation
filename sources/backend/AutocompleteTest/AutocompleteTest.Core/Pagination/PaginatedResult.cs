using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutocompleteTest.Core.Pagination
{
    public class PaginatedResult<T>
    {
        public IReadOnlyCollection<T> Items { get; set; } = Array.Empty<T>();
        public int TotalCount { get; set; }
        public int Offset { get; set; }
        public int Limit { get; set; }

        public PaginatedResult(IReadOnlyCollection<T> items, int totalCount, int offset, int limit)
        {
            Items = items;
            TotalCount = totalCount;
            Offset = offset;
            Limit = limit;
        }
    }
}
