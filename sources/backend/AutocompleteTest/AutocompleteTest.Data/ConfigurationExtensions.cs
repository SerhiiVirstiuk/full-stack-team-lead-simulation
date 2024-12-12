using AutocompleteTest.Data.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AutocompleteTest.Data
{
    public static class ConfigurationExtensions
    {
        public static IServiceCollection AddDatabaseServices(this IServiceCollection services, IConfiguration configuration)
        {
            var useInMemory = configuration.GetValue<bool>("UseInMemoryDatabase");

            if (useInMemory)
            {
                services.AddDbContext<CitiesDbContext>(options =>
                    options.UseInMemoryDatabase("InMemoryDb"));
            }
            else
            {
                /*
                 *  That's how we can use real PostgreSQL database instead
                 * 
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                services.AddDbContext<CitiesDbContext>(options =>
                    options.UseNpgsql(connectionString));
                */
            }

            services.AddTransient<IDataSeeder, CitiesSeeder>();

            return services;
        }
    }
}
