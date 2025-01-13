
using CommonSense.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace CommonSense.DataAccess;
public class CommonSenseContext : DbContext
{
    public DbSet<Report> Reports { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Upvote> Upvotes { get; set; }

    public CommonSenseContext(DbContextOptions<CommonSenseContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Configure the relationship between User and Report
        modelBuilder.Entity<Report>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reports)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete here

        // Configure the relationship between User and Comment
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.User)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete here

        // Configure the relationship between Report and Comment
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Report)
            .WithMany(r => r.Comments)
            .HasForeignKey(c => c.ReportId)
            .OnDelete(DeleteBehavior.Cascade); // Optional, you can keep cascade delete here

        modelBuilder.Entity<Upvote>()
                .HasOne(u => u.User)
                .WithMany(u => u.Upvotes)
                .HasForeignKey(u => u.UserId);

        modelBuilder.Entity<Upvote>()
            .HasOne(u => u.Report)
            .WithMany(r => r.Upvotes)
            .HasForeignKey(u => u.ReportId);
    }
}