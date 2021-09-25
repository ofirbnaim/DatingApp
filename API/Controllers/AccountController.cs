using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        // This method Updated the DB - gets the parameters from the client
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserName))
            {
                return BadRequest("User name is already in use");
            }

            #region explanations 
            // "HMACSHA512" - provide hash algorithm we are going to use to create password: 
            // for more information - https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
            // "using" ensure that in the end of the operation, it releases the unmanaged resources - like garbege collector
            // Every method that inhertis from IDisposable needs to use "using" 
            #endregion
            using var hmac = new HMACSHA512(); // This class randomly generated key 

            var newUser = new AppUser
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)), // Convert from string to byte[] and then Get the Hash of 'password'
                PasswordSalt = hmac.Key // Generated randomly key
            };

            _context.Users.Add(newUser); // Saying to Entity framework that i want to add this user to my users table - just tracking, not adding!
            await _context.SaveChangesAsync(); // Call our database and save our user into "Users" table
            
            // We prefere to return a DTO because of security issues.
            return new UserDto
            {
                UserName = newUser.UserName,
                Token = _tokenService.CreateToken(newUser)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                 .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user == null)
            {
                return Unauthorized("User is invalid");
            }

            // This next lines are the reverse og "Registered" function
            using var hmac = new HMACSHA512(user.PasswordSalt); // Because there is a user with that name in the DB, he have a 'PasswordSalt'. I take it and put it in 'hmac'.

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)); // If 'loginDto.Password' is the same password the user registered with, then 'computedHash' and 'user.PasswordHash' should be identical

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid Password");
            }

            // We prefere to return a DTO because of security issues.
            return new UserDto
            {
                UserName = loginDto.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName.ToLower());
        }


    }
}