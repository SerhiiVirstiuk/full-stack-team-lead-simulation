using AutocompleteTest.API.Middleware;
using AutocompleteTest.Core;
using AutocompleteTest.Data.Seeds;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureCore(builder.Configuration);

builder.Services.AddAutoMapper(typeof(Program), typeof(AutocompleteTest.Core.ConfigurationExtensions));

const string corsFreePolicy = nameof(corsFreePolicy);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        corsFreePolicy,
        builder =>
        {
            builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseSimulateDelayMiddleware();
app.UseSimulateErrorMiddleware();
app.UseCors(corsFreePolicy);

app.UseAuthorization();

app.MapControllers();

// In the ideal case we shouldn't have this dependency here
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<IDataSeeder>();
    await seeder.Seed();
}

app.Run();
