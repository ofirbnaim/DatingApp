using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        //static function because i want to create only one instance of that function
        public static async Task SeedUsers(DataContext context)
        {

            if(await context.Users.AnyAsync()) // if i dont have any users in my DB
            {
                return;
            }

            // var thread = Thread.CurrentThread.ManagedThreadId;
            // Console.WriteLine($"Thread number 1 is: {thread}");

            //read all json text and put it in the 'userData' variable
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            // var thread1 = Thread.CurrentThread.ManagedThreadId;
            // Console.WriteLine($"Thread number 2 is: {thread1}");

            //Deserialize the text (wich stored in 'userData' variable) to 'AppUser' object
            //'users' variable is containing a list of 'AppUser' object
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));

                //Only tracking
                context.Users.Add(user);
            }
            //Save changes to DB
            await context.SaveChangesAsync();
        }
    }
}