using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    /*
    A DbContext instance represents a session with the database and can be used to query and save instances of entities. 
    */
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }


        public DbSet<AppUser> Users { get; set; }
    }
}