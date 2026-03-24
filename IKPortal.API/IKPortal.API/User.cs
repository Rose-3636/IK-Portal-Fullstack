namespace IKPortal.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; } // Soru işareti ekledik
        public string? Password { get; set; } // Soru işareti ekledik
        public string? FullName { get; set; } // Soru işareti ekledik
        public string? Role { get; set; }     // Soru işareti ekledik
        public string? ImageUrl { get; set; } // Soru işareti ekledik
    }
}