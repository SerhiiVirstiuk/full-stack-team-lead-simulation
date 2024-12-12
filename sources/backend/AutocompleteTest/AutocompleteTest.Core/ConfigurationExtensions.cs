using AutocompleteTest.Core.Cities;
using AutocompleteTest.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AutocompleteTest.Core
{
    public static class ConfigurationExtensions
    {
        public static IServiceCollection ConfigureCore(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ICitiesReadRepository, CitiesReadRepository>();

            services.AddDatabaseServices(configuration);

            return services;
        }
    }
}
