namespace CommonSense.API.Controllers;

using CommonSense.DataAccess;
using CommonSense.Domain.DTOs;
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;
    private readonly IUserService _userService;
    private readonly CommonSenseContext _context;
    public CommentController(ICommentService commentService, IUserService userService, CommonSenseContext context)
    {
        _commentService = commentService;
        _userService = userService;
        _context = context;
    }
    [AllowAnonymous]
    [HttpGet]
    public async Task<IEnumerable<Comment>> GetCommentsForReportAsync([FromQuery] int reportId)
    {
        //return await _commentService.GetCommentsByReportIdAsync(reportId);
        var result = await _context.Comments.Include(c => c.User).Where(c => c.ReportId == reportId).ToListAsync();
        var a = result.Select(c => new Comment
        {
            Id = c.Id,
            Text = c.Text,
            CreatedAt = c.CreatedAt,
            ReportId = c.ReportId,
            UserId = c.UserId,
            User = new User
            {
                Id = c.User.Id,
                Name = c.User.Name,
                Email = "",
                ProfilePicture = c.User.ProfilePicture
            }
        });
        return a.ToList();
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
        var email = Helper.GetUserEmailFromClaims(User);
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
    public async Task<ActionResult<Comment>> DeleteCommentAsync(int id)
    {
        var email = Helper.GetUserEmailFromClaims(User);
        if(email == null) return BadRequest("No email found");
        var user = await _userService.GetUserByEmailAsync(email);
        if(user == null) return BadRequest("No user found");
        var comment = await _commentService.GetCommentAsync(id);
        if(comment.UserId != user.Id || user.Role != "Admin") return Unauthorized();
        return await _commentService.DeleteCommentAsync(id);
    }
}