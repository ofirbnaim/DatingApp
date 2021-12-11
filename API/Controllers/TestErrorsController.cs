using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TestErrorsController : BaseAPIController
    {
        /*
            Each one of this methods tests a different Error that can occure.
            Later, when i build an ErrorHandling method, this TestErrors Controller can help me
            to check if my error handling is working for all kind of errors
        */

        private readonly DataContext _context;

        public TestErrorsController(DataContext context)
        {
            _context = context; // My DB connection
        }


        [Authorize]
        [HttpGet("auth")]
        // This function purpose is to test my 401 error - unauthorized responses.
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }


        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1); // There is no user with id -1

            if (thing == null ) return NotFound();

            return Ok(thing);
        }


        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1); // There is no user with id -1

            var thingToReturn = thing.ToString(); // This will return null - null reference exception

            return thingToReturn;
        }


        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Bad request");
        }

    }
}