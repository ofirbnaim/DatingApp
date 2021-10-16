using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    // Same object like "Appuser" just without the passwords propertyes - for safty
    public class RegisterDto
    {
        [Required]
        public string  UserName { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}