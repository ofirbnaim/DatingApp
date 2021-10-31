using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException
    {
        public int _statusCode { get; set; }
        public string  _message { get; set; }   
        public string _details { get; set; }


        // This is the format of my exception will look like
        public ApiException(int statusCode, string message=null, string details=null)
        {
            _statusCode = statusCode;
            _message = message;
            _details = details;
        }
    }
}