
using AutocompleteTest.API.Models;
using System.Net;
using System.Text.Json;

namespace AutocompleteTest.API.Middleware
{
    public class SimulateErrorMiddleware
    {
        private readonly RequestDelegate _next;

        public SimulateErrorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Headers.TryGetValue("SimulateError", out var headerValue) &&
                bool.TryParse(headerValue, out var simulateError) && simulateError)
            {
                var errorResponse = new ErrorResponse
                {
                    ErrorMessage = "Don't worry, it's a test error ;)"
                };

                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
                return;
            }

            await _next(context);
        }
    }
}
