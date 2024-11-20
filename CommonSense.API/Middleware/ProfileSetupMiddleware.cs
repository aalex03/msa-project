using System.Security.Claims;
using CommonSense.Domain.Interfaces;

namespace CommonSense.API.Middleware;

public class ProfileSetupMiddleware
{
    private readonly RequestDelegate _next;

    public ProfileSetupMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IUserService userService)
    {
        var path = context.Request.Path.Value;
        System.Console.WriteLine(path);
        if(path != "/api/User/setup-profile" && (context.User.Identity?.IsAuthenticated ?? false))
        {
            // check if profile exists
            var email = context.User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
            var user = await userService.GetUserByEmailAsync(email);
            if (user is not null)
            {
                // we have a profile
                await _next(context);
            }
            else
            {
                // we don't have a profile
                context.Response.Redirect("/api/User/setup-profile");
                return;
            }
        }
        await _next(context);
    }
}