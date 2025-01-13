namespace CommonSense.Services;

using CommonSense.Domain.DTOs;
using CommonSense.Domain.Interfaces;
using CommonSense.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public class CommentService : ICommentService
{
    private readonly IRepository<Comment> _commentRepository;
    public CommentService(IRepository<Comment> commentRepository)
    {
        _commentRepository = commentRepository;
    }
    public async Task<Comment> GetCommentAsync(int id)
    {
        return await _commentRepository.GetAsync(id);
    }
    public async Task<IEnumerable<Comment>> GetCommentsAsync()
    {
        return await _commentRepository.GetAllAsync();
    }
    public async Task<IEnumerable<Comment>> GetCommentsByReportIdAsync(int reportId)
    {
        return (await _commentRepository.GetAllAsync()).Where(c => c.ReportId == reportId);
    }
    public async Task<Comment> DeleteCommentAsync(int id)
    {
        return await _commentRepository.DeleteAsync(id);
    }

    public Task<Comment> AddCommentAsync(CommentDTO comment)
    {
        var newComment = new Comment
        {
            Text = comment.Text,
            CreatedAt = DateTime.Now,
            ReportId = comment.ReportId,
            UserId = comment.UserId
        };
        return _commentRepository.AddAsync(newComment);
    }

    public Task<Comment> UpdateCommentAsync(int id, CommentDTO comment)
    {
        var updatedComment = new Comment
        {
            Id = id,
            Text = comment.Text,
            ReportId = comment.ReportId,
            UserId = comment.UserId
        };
        return _commentRepository.UpdateAsync(updatedComment);
    }
}