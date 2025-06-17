
using PictureAlbumAPI.Models;

namespace PictureAlbumAPI.Services
{
    public interface IPictureService
    {
        Task<IEnumerable<PictureDTO>> GetPicturesAsync();
        Task<int> CreatePictureAsync(Picture picture);
    }
}
