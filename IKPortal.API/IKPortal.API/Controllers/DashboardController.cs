using IKPortal.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IKPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DashboardController(AppDbContext context) { _context = context; }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            // SQL'deki toplam satırı sayıyoruz
            var count = await _context.Users.CountAsync();

            return Ok(new
            {
                totalPersonnel = count,
                openPositions = 3,
                trainings = 8
            });
        }
    }
}