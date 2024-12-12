using AutocompleteTest.API.Models;
using AutocompleteTest.API.Models.Cities;
using AutocompleteTest.Core.Cities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AutocompleteTest.API.Controllers
{
    [ApiController]
    [Route("/api/v1.0/cities")]
    public class CitiesController : ControllerBase
    {
        private readonly ICitiesReadRepository citiesReadRepository;
        private readonly ILogger<CitiesController> logger;
        private readonly IMapper mapper;

        public CitiesController(
            ICitiesReadRepository citiesReadRepository,
            ILogger<CitiesController> logger,
            IMapper mapper)
        {
            this.citiesReadRepository = citiesReadRepository;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(GetCitiesResponse), (int)HttpStatusCode.OK)]
        [ProducesErrorResponseType(typeof(ErrorResponse))]
        public async Task<IActionResult> GetCities([FromQuery] GetCitiesRequest request, CancellationToken cancellationToken)
        {
            var cities = await citiesReadRepository.SearchCitiesAsync(request.StartsWith, request.Offset, request.Limit, cancellationToken);

            var response = mapper.Map<GetCitiesResponse>(cities);

            return Ok(response);
        }
    }
}
