using IKPortal.API.Data;
using IKPortal.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IKPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // --- BİRİNCİ ODA: GİRİŞ YAPMA (LOGIN) ---
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginModel)
        {
            if (loginModel.Username == "gul" && loginModel.Password == "1234")
            {
                return Ok(new { success = true, fullName = "Gül DOĞAN", role = "Software Developer" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username.ToLower() == loginModel.Username.ToLower() &&
                u.Password == loginModel.Password);

            if (user != null)
            {
                return Ok(new { success = true, fullName = user.FullName, role = user.Role });
            }

            return Unauthorized(new { success = false, message = "Hatalı giriş!" });
        } // <--- LOGIN METODU BURADA BİTTİ

        // --- İKİNCİ ODA: TÜM PERSONELLERİ GETİR ---
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            // SQL'deki tüm kullanıcıları listele
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        } // <--- GETALLUSERS METODU BURADA BİTTİ
        [HttpPost("add")]
        public async Task<IActionResult> AddUser([FromBody] User newUser)
        {
            // React'tan gelen veriyi SQL'e kaydediyoruz
            if (newUser == null) return BadRequest();

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Personel başarıyla eklendi!" });
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            // Veritabanında kişiyi bul
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            // Kişiyi sil
            _context.Users.Remove(user);
            await _context.SaveChangesAsync(); // SQL'e işle

            return Ok(new { success = true, message = "Personel sistemden silindi." });
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            // Veritabanında o kişiyi buluyoruz
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            // Bilgileri güncelliyoruz
            user.FullName = updatedUser.FullName;
            user.Role = updatedUser.Role;
            user.Username = updatedUser.Username;

            await _context.SaveChangesAsync(); // SQL'e kaydet

            return Ok(new { success = true, message = "Personel güncellendi!" });
        }
    } // <--- CLASS (SINIF) BURADA BİTTİ
} // <--- NAMESPACE (DOSYA) BURADA BİTTİ