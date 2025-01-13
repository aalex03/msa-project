namespace CommonSense.API.Controllers;

using CommonSense.Domain.DTOs;
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;
    private readonly IUserService _userService;
    public CommentController(ICommentService commentService, IUserService userService)
    {
        _commentService = commentService;
        _userService = userService;
    }
    [AllowAnonymous]
    [HttpGet]
    public async Task<IEnumerable<Comment>> GetCommentsForReportAsync([FromQuery] int reportId)
    {
        return await _commentService.GetCommentsByReportIdAsync(reportId);
    }
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<Comment> GetCommentAsync(int id)
    {
        return await _commentService.GetCommentAsync(id);
    }
    [HttpPost]
    public async Task<ActionResult<Comment>> AddCommentAsync([FromBody] CommentDTO comment)
    {
        var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
        if(email == null) return BadRequest("No email found");
        var user = await _userService.GetUserByEmailAsync(email);
        if(user == null) return BadRequest("No user found");
        comment.UserId = user.Id;
        return await _commentService.AddCommentAsync(comment);
    }
    [HttpPut]
    public async Task<Comment> UpdateCommentAsync([FromRoute] int id, [FromBody] CommentDTO comment)
    {
        return await _commentService.UpdateCommentAsync(id, comment);
    }
    [HttpDelete("{id}")]
    public async Task<Comment> DeleteCommentAsync(int id)
    {
        return await _commentService.DeleteCommentAsync(id);
    }
}