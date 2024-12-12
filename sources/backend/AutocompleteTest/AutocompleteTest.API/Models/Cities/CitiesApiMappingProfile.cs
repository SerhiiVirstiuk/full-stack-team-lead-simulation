using AutocompleteTest.Core.Cities;
using AutocompleteTest.Core.Pagination;
using AutoMapper;

namespace AutocompleteTest.API.Models.Cities
{
    public class CitiesApiMappingProfile : Profile
    {
        public CitiesApiMappingProfile()
        {
            CreateMap<City, CityModel>();
            CreateMap<PaginatedResult<City>, GetCitiesResponse>()
                .ForMember(dest => dest.Cities, opt => opt.MapFrom(src => src.Items));
        }
    }
}
