namespace AutocompleteTest.API.Middleware
{
    public class SimulateDelayMiddleware
    {
        private readonly RequestDelegate _next;

        public SimulateDelayMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Headers.TryGetValue("SimulateDelay", out var headerValue) &&
                int.TryParse(headerValue, out var delayInMilliseconds))
            {
                await Task.Delay(delayInMilliseconds);
            }

            await _next(context);
        }
    }
}
