using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dateofBirthe) //Only a property of 'DateTime' kind, can use this method
        {
            var today = DateTime.Today;
            var age = today.Year - dateofBirthe.Year;
            
            if(dateofBirthe.Date > today.AddYears(-age))
            {
                age--; // Because the user haven't had it birthday yet!
            }
            return age;
        }
    }
}