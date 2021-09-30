using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class UsersController : BaseAPIController
    {
        private readonly DataContext _context;

        // Constructor - now i have access to my database by using "DataContext"
        public UsersController(DataContext context)
        {
            _context = context;
        }


        // Using [HttpGet] because we are getting data 
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }


        //Using [HttpGet("{id}")] because i want to get an individual user by ID
        // Example: api/users/3
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}