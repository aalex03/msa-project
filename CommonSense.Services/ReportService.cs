namespace CommonSense.Services;
using CommonSense.Domain.DTOs;
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ReportService : IReportService
{
    private readonly IRepository<Report> _reportRepository;
    public ReportService(IRepository<Report> reportRepository)
    {
        _reportRepository = reportRepository;
    }
    public async Task<Report> GetReportAsync(int id)
    {
        return await _reportRepository.GetAsync(id);
    }
    public async Task<IEnumerable<Report>> GetReportsAsync()
    {
        return await _reportRepository.GetAllAsync();
    }
    public async Task<IEnumerable<Report>> GetReportsByUserIdAsync(int userId)
    {
        return (await _reportRepository.GetAllAsync()).Where(r => r.UserId == userId);
    }
    public async Task<Report> DeleteReportAsync(int id)
    {
        return await _reportRepository.DeleteAsync(id);
    }

    public Task<Report> AddReportAsync(ReportDTO report)
    {
        var newReport = new Report
        {
            Title = report.Title,
            Description = report.Description,
            Status = report.Status,
            Type = report.Type,
            Photos = report.Photos,
            Latitude = report.Latitude,
            Longitude = report.Longitude,
            CreatedAt = DateTime.Now,
            UserId = report.UserId,
        };
        return _reportRepository.AddAsync(newReport);
    }

    public Task<Report> UpdateReportAsync(int id, ReportDTO report)
    {
        var updatedReport = new Report
        {
            Id = id,
            Title = report.Title,
            Description = report.Description,
            Status = report.Status,
            Type = report.Type,
            Photos = report.Photos,
            Latitude = report.Latitude,
            Longitude = report.Longitude,
            CreatedAt = report.CreatedAt,
            UserId = report.UserId
        };
        return _reportRepository.UpdateAsync(updatedReport);
    }
    
}