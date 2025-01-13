using Microsoft.AspNetCore.Mvc;
using CommonSense.Domain.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CommonSense.DataAccess;

namespace CommonSense.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaderboardController : ControllerBase
    {
        private readonly CommonSenseContext _context;

        public LeaderboardController(CommonSenseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserPointsDTO>>> GetLeaderboardAsync()
        {
            var users = await _context.Users.ToListAsync();
            var reports = await _context.Reports.Include(r => r.Upvotes).ToListAsync();

            var userPoints = users.Select(user => new UserPointsDTO
            {
                UserId = user.Id,
                UserName = user.Name,
                Points = reports.Where(r => r.UserId == user.Id).Sum(r => r.Upvotes.Count)
            }).OrderByDescending(up => up.Points).ToList();

            return Ok(userPoints);
        }
    }

    public class UserPointsDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int Points { get; set; }
    }
}