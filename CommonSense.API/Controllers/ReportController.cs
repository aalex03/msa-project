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

public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;
    private readonly IUserService _userService;
    private readonly IUpvoteService _upvoteService;
    public ReportController(IReportService reportService, IUserService userService, IUpvoteService upvoteService)
    {
        _reportService = reportService;
        _userService = userService;
        _upvoteService = upvoteService;
    }
    [AllowAnonymous]
    [HttpGet]
    public async Task<IEnumerable<Report>> GetReportsAsync()
    {
        return await _reportService.GetReportsAsync();
    }
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<Report> GetReportAsync(int id)
    {
        return await _reportService.GetReportAsync(id);
    }
    [HttpPost]
    public async Task<ActionResult<Report>> AddReportAsync([FromBody] ReportDTO report)
    {
        var email = Helper.GetUserEmailFromClaims(User);
        if(email == null) return BadRequest("No email found");
        var user = await _userService.GetUserByEmailAsync(email);
        if(user == null) return BadRequest("No user found");
        report.UserId = user.Id;
        return await _reportService.AddReportAsync(report);
    }
    [HttpPut]
    public async Task<Report> UpdateReportAsync([FromRoute] int id, [FromBody] ReportDTO report)
    {
        return await _reportService.UpdateReportAsync(id, report);
    }
    [AllowAnonymous]
    [HttpGet("{reportId}/upvotes")]
    public async Task<int> GetUpvotesForReportAsync(int reportId)
    {
        return await _upvoteService.GetUpvotesCountAsync(reportId);
    }
    [HttpPost("{reportId}/upvote")]
    public async Task<ActionResult<Upvote>> UpvoteReportAsync(int reportId)
    {
        var email = Helper.GetUserEmailFromClaims(User);
        if(email == null) return BadRequest("No email found");
        var user = await _userService.GetUserByEmailAsync(email);
        if(user == null) return BadRequest("No user found");
        return await _upvoteService.UpvoteReportAsync(reportId, user.Id);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Report>> DeleteReportAsync(int id)
    {
        var email = Helper.GetUserEmailFromClaims(User);
        if(email == null) return BadRequest("No email found");
        var user = await _userService.GetUserByEmailAsync(email);
        if(user == null) return BadRequest("No user found");
        var report = await _reportService.GetReportAsync(id);
        if(report.UserId != user.Id || user.Role != "Admin") return Unauthorized();
        return await _reportService.DeleteReportAsync(id);
    }
}