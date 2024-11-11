namespace CommonSense.Domain.DTOs;

public class UserDTO
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public string? Role { get; set; }
    public int Points { get; set; }
}