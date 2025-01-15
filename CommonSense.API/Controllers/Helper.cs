using System.Security.Claims;

namespace CommonSense.API.Controllers;

public static class Helper
{
    public static string GetUserEmailFromClaims(ClaimsPrincipal claimsPrincipal)
    {
        var email = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
        if (email is null)
        {
            email = claimsPrincipal.FindFirst(x => x.Type == "preferred_username")?.Value;
        }
        return email;
    }
}