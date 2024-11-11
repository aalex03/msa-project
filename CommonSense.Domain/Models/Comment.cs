namespace CommonSense.Domain.Models;
using System.ComponentModel.DataAnnotations;

public class Comment
{
    [Key]
    public int Id { get; set; }
    public required string Text { get; set; }
    public DateTime CreatedAt { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int ReportId { get; set; }
    public Report? Report { get; set; }
}