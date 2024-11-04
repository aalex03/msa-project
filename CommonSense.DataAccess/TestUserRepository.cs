using System.Linq.Expressions;
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;

namespace CommonSense.Services;

public class TestUserRepository<T> : IRepository<User>
{
    private readonly List<User> _users = new List<User>
        {
            new User { Id = 1, Name = "John Doe", Email = "", Role = "Admin", Points = 100 },
            new User { Id = 2, Name = "Jane Doe", Email = "", Role = "User", Points = 50 },
            new User { Id = 3, Name = "Alice", Email = "", Role = "User", Points = 10 },
        };

    public Task<User> GetAsync(int id)
    {
        return Task.FromResult(_users.FirstOrDefault(u => u.Id == id));
    }

    public Task<IEnumerable<User>> GetAsync(Expression<Func<User, bool>> predicate)
    {
        return Task.FromResult(_users.Where(predicate.Compile()));
    }

    public Task<IEnumerable<User>> GetAllAsync()
    {
        return Task.FromResult(_users.AsEnumerable());
    }

    public Task<User> AddAsync(User entity)
    {
        _users.Add(entity);
        return Task.FromResult(entity);
    }

    public Task<User> UpdateAsync(User entity)
    {
        var user = _users.FirstOrDefault(u => u.Id == entity.Id);
        if (user != null)
        {
            user.Name = entity.Name;
            user.Email = entity.Email;
            user.Role = entity.Role;
            user.Points = entity.Points;
        }
        return Task.FromResult(user);
    }

    public Task<User> DeleteAsync(int id)
    {
        var user = _users.FirstOrDefault(u => u.Id == id);
        if (user != null)
        {
            _users.Remove(user);
        }
        return Task.FromResult(user);
    }

}
