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
    public ReportController(IReportService reportService)
    {
        _reportService = reportService;
    }
    [HttpGet]
    public async Task<IEnumerable<Report>> GetReportsAsync()
    {
        return await _reportService.GetReportsAsync();
    }
    [HttpGet("{id}")]
    public async Task<Report> GetReportAsync(int id)
    {
        return await _reportService.GetReportAsync(id);
    }
    [HttpPost]
    public async Task<Report> AddReportAsync([FromBody] ReportDTO report)
    {
        return await _reportService.AddReportAsync(report);
    }
    [HttpPut]
    public async Task<Report> UpdateReportAsync([FromRoute] int id, [FromBody] ReportDTO report)
    {
        return await _reportService.UpdateReportAsync(id, report);
    }
    [HttpDelete("{id}")]
    public async Task<Report> DeleteReportAsync(int id)
    {
        return await _reportService.DeleteReportAsync(id);
    }
}