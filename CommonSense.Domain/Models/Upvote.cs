namespace CommonSense.Domain.Models;
using System.ComponentModel.DataAnnotations;

public class Upvote
{
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int ReportId { get; set; }
    public Report? Report { get; set; }
}