using System.Linq.Expressions;
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace CommonSense.DataAccess;

public class EfCoreUserRepository<T> : IRepository<User>
{
    private readonly CommonSenseContext _context;
    public EfCoreUserRepository(CommonSenseContext Context)
    {
        _context = Context;
    }

    public async Task<User> AddAsync(User entity)
    {
        _context.Users.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<User> DeleteAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        return user;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        // consider changing the user model to use IEnumerable
        return (await _context.Users.ToListAsync()).AsEnumerable();
    }

    public async Task<User> GetAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<IEnumerable<User>> GetAsync(Expression<Func<User, bool>> predicate)
    {
        return await _context.Users.Where(predicate).ToListAsync();
    }

    public async Task<User> UpdateAsync(User entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return entity;
    }
}