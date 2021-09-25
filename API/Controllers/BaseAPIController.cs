using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    /*
        All Controllers inherit from this Controller to avoid to write same properties over and over again.
        This Controller inherit from "ControllerBase"
    */

    [ApiController]
    [Route("api/[controller]")]

    public class BaseAPIController : ControllerBase
    {
        
    }
}