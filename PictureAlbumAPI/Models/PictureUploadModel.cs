namespace PictureAlbumAPI.Models
{
    public class PictureUploadModel
    {
        public required IFormFile File { get; set; }

        public required string Name { get; set; }
        public DateTime? Date { get; set; }
        public string? Description { get; set; }
    }
}