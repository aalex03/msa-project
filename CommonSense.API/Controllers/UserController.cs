
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace CommonSense.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _userService.GetUsersAsync();
        }
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
    }
}