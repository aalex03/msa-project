namespace CommonSense.Domain.DTOs;

public class SetupProfileDTO
{
    public required string Username { get; set; }
    public byte[]? ProfilePicture { get; set; }
}