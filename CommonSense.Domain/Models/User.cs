namespace CommonSense.Domain.Models;
using System.ComponentModel.DataAnnotations;
public class User
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    [MaxLength(128)]
    public required string Email { get; set; }
    [MaxLength(128)]
    public string? Role { get; set; }
    public byte[]? ProfilePicture { get; set; }
    public int Points { get; set; }

    public List<Report> Reports { get; set; } = new();
    public List<Comment> Comments { get; set; } = new();
}