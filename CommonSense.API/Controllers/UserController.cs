
using System.Security.Claims;
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CommonSense.API.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [AllowAnonymous]
    [HttpGet]
    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await _userService.GetUsersAsync();
    }
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<User> GetUserAsync(int id)
    {
        return await _userService.GetUserAsync(id);
    }
    
    [HttpPost]
    public async Task<User> AddUserAsync(User user)
    {
        return await _userService.AddUserAsync(user);
    }
    [HttpPost("setup-profile")]
    public async Task<ActionResult<User>> SetupProfile([FromBody] string username)
    {
        var email = GetUserEmailFromClaims();
        if (email is null)
        {
            return BadRequest("Email not found in claims");
        }
        var user = await _userService.SetupProfile(username, email);
        return Ok(user);
    }
    [HttpPut]
    public async Task<User> UpdateUserAsync(User user)
    {
        return await _userService.UpdateUserAsync(user);
    }
    [HttpDelete("{id}")]
    public async Task<User> DeleteUserAsync(int id)
    {
        return await _userService.DeleteUserAsync(id);
    }

    private string? GetUserEmailFromClaims()
    {
        var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
        return email;
    }
}