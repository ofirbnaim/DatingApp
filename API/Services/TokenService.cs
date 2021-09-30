using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        // SymmetricSecurityKey is a type of encryption where only one key is used to both encrypt and decrypt electronic information
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            // Encrypt the "TokenKey" property from our config
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        // Function i am implements from ITokenService
        public string CreateToken(AppUser user)
        {
            // Add some details on the user, I can add here what ever i want
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            // Creating the credentials by using the "_key" that i already encrypt in the constructor and algorithm to encrypt
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // Describe how the Token going to look
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = System.DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            // This 2 lines are the creation of the Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}