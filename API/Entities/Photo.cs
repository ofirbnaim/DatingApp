using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    //When Entity Framework creates this table - its going to call "Photos"
    //I can see it in the 'ExtendedUserEntity' Migration that i created
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        //Define the relationship between AppUser and Photo
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}