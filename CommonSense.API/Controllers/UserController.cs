
using System.Security.Claims;
using CommonSense.DataAccess;
using CommonSense.Domain.DTOs;
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
    private readonly CommonSenseContext _context;
    public UserController(IUserService userService, CommonSenseContext context)
    {
        _userService = userService;
        _context = context;
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
    [HttpGet("profile")]
    public async Task<ActionResult<User>> GetCurrentUserAsync()
    {
        var email = GetUserEmailFromClaims();
        if (email is null)
        {
            return BadRequest("Email not found in claims");
        }
        return Ok(await _userService.GetUserByEmailAsync(email));
    }
    [HttpPost("profile")]
    public async Task<ActionResult<User>> SetupProfile([FromBody] SetupProfileDTO profile)
    {
        var email = GetUserEmailFromClaims();
        if (email is null)
        {
            return BadRequest("Email not found in claims");
        }

        var user = await _userService.GetUserByEmailAsync(email);


        user.Name = profile.Username ?? user.Name;
        user.ProfilePicture = profile.ProfilePicture ?? user.ProfilePicture;
        await _userService.UpdateUserAsync(user);


        return Ok(user);
    }

    [HttpPost]
    public async Task<User> AddUserAsync(User user)
    {
        return await _userService.AddUserAsync(user);
    }
    [HttpPost("setup-profile")]
    public async Task<ActionResult<User>> SetupProfile([FromBody] UserDTO profile)
    {
        var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
        if (email is null)
        {
            return BadRequest("Email not found in claims");
        }

        var user = await _userService.GetUserByEmailAsync(email);
        if (user == null)
        {
            user = new User
            {
                Email = email,
                Name = email, // Use email as username if user does not exist
                Role = "User",
                ProfilePicture = profile.ProfilePicture
            };
            await _userService.AddUserAsync(user);
        }
        else
        {
            return Ok("User already exists");
        }
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

    public class SetupProfileDTO
    {
        public string Username { get; set; }
        public byte[] ProfilePicture { get; set; }
    }
}