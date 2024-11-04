
using CommonSense.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace CommonSense.DataAccess;
public class CommonSenseContext : DbContext
{
    public DbSet<Report> Reports { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Comments { get; set; }

    public CommonSenseContext(DbContextOptions<CommonSenseContext> options) : base(options)
    {
        
    }
}