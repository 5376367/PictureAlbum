using System.ComponentModel.DataAnnotations;

namespace PictureAlbumAPI.Models
{

    public class Picture
    {
        public int Id { get; set; }
        public required string Name { get; set; } 
        public DateTime? Date { get; set; }
        public string? Description { get; set; }
        public required string Content { get; set; }
    }
}
