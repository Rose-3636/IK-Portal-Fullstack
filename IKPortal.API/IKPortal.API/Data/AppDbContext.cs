using Microsoft.EntityFrameworkCore;
using IKPortal.API.Models;

namespace IKPortal.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } // Veritabanındaki tabloyu temsil eder
    }
}