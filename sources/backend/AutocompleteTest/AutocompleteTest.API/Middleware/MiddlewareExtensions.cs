namespace AutocompleteTest.API.Middleware
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseSimulateErrorMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SimulateDelayMiddleware>();
        }

        public static IApplicationBuilder UseSimulateDelayMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SimulateDelayMiddleware>();
        }
    }
}
