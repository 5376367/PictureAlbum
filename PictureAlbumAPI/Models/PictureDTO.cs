namespace PictureAlbumAPI.Models
{
    public class PictureDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; } 
        public DateTime? Date { get; set; }
        public string? Description { get; set; }
        public string? Content { get; set; }
    }
}
