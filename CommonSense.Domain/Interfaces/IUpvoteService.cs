using CommonSense.Domain.Models;

namespace CommonSense.Domain.Interfaces;

public interface IUpvoteService 
{
    Task<Upvote> UpvoteReportAsync(int reportId, int userId);
    Task<int> GetUpvotesCountAsync(int reportId);
}