using System.Linq.Expressions;

namespace CommonSense.Services;

public interface IRepository<T> where T : class
{
    Task<T> GetAsync(int id);
    Task<IEnumerable<T>> GetAsync(Expression<Func<T,bool>> predicate);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task<T> DeleteAsync(int id);
}