namespace CommonSense.Domain.DTOs;

public class ReportDTO
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public string? Type { get; set; }
    public List<byte[]>? Photos { get; set; }
    public required DateTime CreatedAt { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int UserId { get; set; }
}