namespace CommonSense.Domain.Models;
using System.ComponentModel.DataAnnotations;
public class Report
{
    [Key]
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public string? Type { get; set; }
    public List<byte[]>? Photos { get; set; }
    public required DateTime CreatedAt { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public User? User { get; set; }
    public int UserId { get; set; }
    public List<Comment> Comments { get; set; } = new();
    public List<Upvote> Upvotes { get; set; } = new();
}