using AutocompleteTest.Data.Schema;
using Microsoft.Extensions.Logging;
using System;
using System.Reflection;
using System.Text.Json;

namespace AutocompleteTest.Data.Seeds
{
    internal class CitiesSeeder : IDataSeeder
    {
        private readonly CitiesDbContext dbContext;
        private readonly ILogger<CitiesSeeder> logger;

        public CitiesSeeder(CitiesDbContext dbContext, ILogger<CitiesSeeder> logger)
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        public async Task Seed()
        {
            if (dbContext.Cities.Any())
            {
                logger.LogInformation("Database already seeded.");
                return;
            }

            logger.LogInformation("Starting database seeding...");

            string executableLocation = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var jsonData = await File.ReadAllTextAsync(Path.Combine(executableLocation, "Data/cities.json"));
            var jsonCities = JsonSerializer.Deserialize<List<JsonCity>>(jsonData);

            if (jsonCities == null || !jsonCities.Any())
            {
                logger.LogWarning("No data found");
                return;
            }

            var cities = jsonCities.Take(50000).Select(jsonLoc => new City
            {
                Name = jsonLoc.name,
                Latitude = jsonLoc.lat,
                Longtitude = jsonLoc.lng,
                Country = jsonLoc.country
            }).ToList();

            await dbContext.Cities.AddRangeAsync(cities);
            await dbContext.SaveChangesAsync();

            logger.LogInformation($"Database seeding completed with {cities.Count} records.", cities.Count);
        }

        private class JsonCity
        {
            public string name { get; set; } = string.Empty;
            public string lat { get; set; } = string.Empty;
            public string lng { get; set; } = string.Empty;
            public string country { get; set; } = string.Empty;
            public string admin1 { get; set; } = string.Empty;
            public string admin2 { get; set; } = string.Empty;
        }
    }
}
