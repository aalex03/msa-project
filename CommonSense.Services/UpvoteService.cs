namespace CommonSense.Services
{
    using System.Threading.Tasks;
    using CommonSense.Domain.Models;
    using CommonSense.Domain.Interfaces;
    using System.Collections.Generic;
    using CommonSense.DataAccess;
    using Microsoft.EntityFrameworkCore;

    public class UpvoteService : IUpvoteService
    {
        private readonly IRepository<Upvote> _upvoteRepository;
        private readonly CommonSenseContext _context;

        public UpvoteService(IRepository<Upvote> upvoteRepository, CommonSenseContext context)
        {
            _upvoteRepository = upvoteRepository;
            _context = context;
        }

        public async Task<int> GetUpvotesCountAsync(int reportId)
        {
            //include upvotes in report
            var reports = _context.Reports.Include(r => r.Upvotes);
            return (await reports.FirstOrDefaultAsync(r => r.Id == reportId)).Upvotes.Count;
        }

        public async Task<Upvote> UpvoteReportAsync(int reportId, int userId)
        {
            var upvote = (await _upvoteRepository.GetAllAsync()).FirstOrDefault(u => u.UserId == userId && u.ReportId == reportId);
            if (upvote is null)
            {
                var newUpvote = new Upvote
                {
                    UserId = userId,
                    ReportId = reportId
                };
                return await _upvoteRepository.AddAsync(newUpvote);
            }
            else
            {
                return await _upvoteRepository.DeleteAsync(upvote.Id);
            }
        }
    }
}