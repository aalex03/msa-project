namespace CommonSense.Domain.Models;
using System.ComponentModel.DataAnnotations;

public class Comment
{
    [Key]
    public int Id { get; set; }
    public required string Text { get; set; }
    public DateTime CreatedAt { get; set; }
    public User? User { get; set; }
}