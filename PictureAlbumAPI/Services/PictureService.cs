using Microsoft.EntityFrameworkCore;
using PictureAlbumAPI.Data;
using PictureAlbumAPI.Models;

namespace PictureAlbumAPI.Services
{
    public class PictureService : IPictureService
    {
        private readonly PictureAlbumContext _context;

        public PictureService(PictureAlbumContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PictureDTO>> GetPicturesAsync()
        {
            // Since the requirement was to return only the name and id of the pictures, we will select only those properties and map them to PictureDTO.
            return await _context.Pictures
                .OrderBy(x => x.Id)
                .Select(p => new PictureDTO
                {
                    Id = p.Id,
                    Name = p.Name
                })
                .ToListAsync();
        }

        public async Task<PictureDTO?> GetPictureByIdAsync(int id)
        {
            var picture = await _context.Pictures
                .Where(p => p.Id == id)
                .Select(p => new PictureDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Date = p.Date,
                    Description = p.Description,
                    Content = p.Content // content is the image data in Base64 format
                })
                .FirstOrDefaultAsync();

            return picture;
        }

        public async Task<int> CreatePictureAsync(Picture picture)
        {
            _context.Pictures.Add(picture);
            await _context.SaveChangesAsync();
            return picture.Id;
        }
    }
}
