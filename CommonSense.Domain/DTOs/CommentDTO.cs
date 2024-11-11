namespace CommonSense.Domain.DTOs
{
    public class CommentDTO
    {
        public required string Text { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public int ReportId { get; set; }
    }
}