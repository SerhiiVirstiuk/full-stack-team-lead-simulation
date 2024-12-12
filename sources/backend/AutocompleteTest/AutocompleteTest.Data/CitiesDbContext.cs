using AutocompleteTest.Data.Schema;
using Microsoft.EntityFrameworkCore;

namespace AutocompleteTest.Data
{
    public class CitiesDbContext : DbContext
    {
        public CitiesDbContext(DbContextOptions<CitiesDbContext> options) : base(options) { }

        public DbSet<City> Cities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // it won't work for In-memory, but not for real databases
            modelBuilder.Entity<City>()
                .HasIndex(l => l.Name);
        }
    }
}
