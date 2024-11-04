using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;

namespace CommonSense.Services;
public class UserService : IUserService
{
    private readonly IRepository<User> _userRepository;
    public UserService(IRepository<User> userRepository)
    {
        _userRepository = userRepository;
    }
    public async Task<User> GetUserAsync(int id)
    {
        return await _userRepository.GetAsync(id);
    }
    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await _userRepository.GetAllAsync();
    }
    public async Task<User> AddUserAsync(User user)
    {
        return await _userRepository.AddAsync(user);
    }
    public async Task<User> UpdateUserAsync(User user)
    {
        return await _userRepository.UpdateAsync(user);
    }
    public async Task<User> DeleteUserAsync(int id)
    {
        return await _userRepository.DeleteAsync(id);
    }
}