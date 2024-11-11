namespace CommonSense.Domain.Interfaces
{
    using CommonSense.Domain.DTOs;
    using CommonSense.Domain.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface ICommentService
    {
        Task<Comment> GetCommentAsync(int id);
        Task<IEnumerable<Comment>> GetCommentsAsync();
        Task<IEnumerable<Comment>> GetCommentsByReportIdAsync(int reportId);
        Task<Comment> AddCommentAsync(CommentDTO comment);
        Task<Comment> UpdateCommentAsync(int id, CommentDTO comment);
        Task<Comment> DeleteCommentAsync(int id);
    }
}