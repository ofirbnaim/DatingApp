using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;

        }

        public async Task InvokeAsync(HttpContext context){
            try
            {
                await this._next(context);
            }
            catch (Exception ex)
            {
                // Log the exception to see muche information as i can get about my exception
                _logger.LogError(ex, ex.Message);
                // Write this exception to my response in json format
                context.Response.ContentType = "application/json";
                // Write the exception status code to my response
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                // Create new response and put the data inside by choosing if I'm in development or production mode
                var response = _env.IsDevelopment() 
                             // If i am in Development mode: 
                             // the "ex.StackTrace?.ToString()" to make sure it is not null
                             ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                             // If i am in Production mode:
                             // I'm reflactiong the error as "Internal Server Error" and not somthing more explicit
                             // because i'm in production mode and the user will see the error
                             : new ApiException(context.Response.StatusCode, "Internal Server Error"); 

                // I want my Json show up in CamelCase so:
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                
                // I want to put the response in Json format with CamelCase
                var json = JsonSerializer.Serialize(response, options);

                // Write the response
                await context.Response.WriteAsync(json);
            }
        }
    }
}