using Microsoft.AspNetCore.Mvc;
using PictureAlbumAPI.Models;
using PictureAlbumAPI.Services;

namespace PictureAlbumAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PicturesController : ControllerBase
    {
        private readonly IPictureService _pictureService;

        public PicturesController(IPictureService pictureService)
        {
            _pictureService = pictureService;
        }

        [HttpGet(Name = "GetPictures")]
        public async Task<ActionResult<IEnumerable<PictureDTO>>> Get()
        {
            // Retrieve all pictures using the service
            var pictures = await _pictureService.GetPicturesAsync();
            return Ok(pictures);
        }

        //Eventhough I think that POST verb would be more appropriate for adding an item, I will use PUT as per the requirement.
        [HttpPut(Name = "AddPicture")]
        public async Task<ActionResult<Picture>> CreatePicture([FromForm] PictureUploadModel model)
        {
            if (model.File == null || model.File.Length == 0)
                return BadRequest("No file uploaded");

            try
            {
                // Read file content
                using var memoryStream = new MemoryStream();
                await model.File.CopyToAsync(memoryStream);
                // Convert to Base64 string
                var fileContent = Convert.ToBase64String(memoryStream.ToArray());

                var picture = new Picture
                {
                    Name = model.Name,
                    Date = model.Date,
                    Description = model.Description,
                    Content = fileContent
                };

                // Create the picture using the service
                var createdPictureId = await _pictureService.CreatePictureAsync(picture);
                return Ok(createdPictureId);
            }
            // Catch specific exceptions for better error handling
            catch (Microsoft.EntityFrameworkCore.DbUpdateException ex)
            {
                if (ex.InnerException != null &&
                    (ex.InnerException.Message.Contains("IX_Pictures_Name") ||
                     ex.InnerException.Message.Contains("duplicate key")))
                {
                    return BadRequest("A picture with this file name already exists.");
                }
                return BadRequest("Error creating picture");
            }
            // Catch any other exceptions
            catch (Exception)
            {
                return BadRequest("Error creating picture");
            }
        }
    }
}