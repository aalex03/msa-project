namespace CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
public interface IUserService
{
    Task<User> GetUserAsync(int id);
    Task<User> GetUserByEmailAsync(string email);
    Task<IEnumerable<User>> GetUsersAsync();
    Task<User> AddUserAsync(User user);
    Task<User> UpdateUserAsync(User user);
    Task<User> DeleteUserAsync(int id);
    Task<User> SetupProfile(string username, string email);
}
