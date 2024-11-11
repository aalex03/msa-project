namespace CommonSense.Domain.Interfaces
{
    using CommonSense.Domain.DTOs;
    using CommonSense.Domain.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface IReportService
    {
        Task<Report> GetReportAsync(int id);
        Task<IEnumerable<Report>> GetReportsAsync();
        Task<IEnumerable<Report>> GetReportsByUserIdAsync(int userId);
        Task<Report> AddReportAsync(ReportDTO report);
        Task<Report> UpdateReportAsync(int id, ReportDTO report);
        Task<Report> DeleteReportAsync(int id);
    }
}