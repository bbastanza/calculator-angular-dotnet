using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.GetType()}\n{ex.Message}\n{ex.StackTrace}");
                context.Response.StatusCode = 418;
                context.Response.Headers.Add("content-type", "application/json");
                await context.Response.WriteAsync(new ExceptionModel(ex.Message).ToString() ?? string.Empty);
            }
        }
    }

    public class ExceptionModel
    {
        public string Message { get; }
        
        public ExceptionModel(string message)
        {
            Message = message;
        }
    }
}