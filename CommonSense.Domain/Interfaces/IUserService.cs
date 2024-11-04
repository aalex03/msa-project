namespace CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
public interface IUserService
{
    Task<User> GetUserAsync(int id);
    Task<IEnumerable<User>> GetUsersAsync();
    Task<User> AddUserAsync(User user);
    Task<User> UpdateUserAsync(User user);
    Task<User> DeleteUserAsync(int id);
}
