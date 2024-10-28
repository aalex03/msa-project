namespace CommonSense.DataAccess.Models;
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
    public int Points { get; set; }

}