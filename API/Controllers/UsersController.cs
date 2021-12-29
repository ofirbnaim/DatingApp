using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Authorize]
    public class UsersController : BaseAPIController
    {
        public IUserRepository _userRepository { get; set; }

        // Constructor - now i have access to my database by using "DataContext"
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        // Using [HttpGet] because we are getting data 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return Ok(await _userRepository.GetUsersAsync());
        }


        //Using [HttpGet("{id}")] because i want to get an individual user by ID
        // Example: api/users/3
        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUserById(int id)
        // {
        //     return await _userRepository.GetUserByIdAsync(id);
        // }

         [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUserByName(string userName)
        {
            return await _userRepository.GetUserByUsernameAsync(userName);
        }
    }
}