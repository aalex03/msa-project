using System.Linq.Expressions;
using CommonSense.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CommonSense.DataAccess;

public class EfCoreRepository<T> : IRepository<T> where T : class
{
    private readonly CommonSenseContext _context;
    public EfCoreRepository(CommonSenseContext context)
    {
        _context = context;
    }

    public async Task<T> AddAsync(T entity)
    {
        _context.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T> DeleteAsync(int id)
    {
        var entity = await _context.FindAsync<T>(id);
        if(entity is not null)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }
        return entity;
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return (await _context.Set<T>().ToListAsync()).AsEnumerable();
    }

    public async Task<T> GetAsync(int id)
    {
        return await _context.FindAsync<T>(id);
    }

    public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predicate)
    {
        return await _context.Set<T>().Where(predicate).ToListAsync(); 
    }

    public async Task<T> UpdateAsync(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return entity;
    }
}