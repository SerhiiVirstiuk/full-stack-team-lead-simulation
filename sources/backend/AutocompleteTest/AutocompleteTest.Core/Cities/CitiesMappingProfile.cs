using AutoMapper;

namespace AutocompleteTest.Core.Cities
{
    public class CitiesMappingProfile : Profile
    {
        public CitiesMappingProfile()
        {
            CreateMap<Data.Schema.City, City>();
        }
    }
}
