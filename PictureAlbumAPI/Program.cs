using Microsoft.EntityFrameworkCore;
using PictureAlbumAPI.Data;
using PictureAlbumAPI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PictureAlbumContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<IPictureService, PictureService>();

//allow cors removed since it is not needed for this demo as i set proxy in the react app to point to the api server
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", policy =>
//    {
//        policy.AllowAnyOrigin()
//              .AllowAnyMethod()
//              .AllowAnyHeader();
//    });
//});


var app = builder.Build();

// swagger for development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// this project is built to use EF Core migrations with code first approach. the database updates are stored in the "DatabaseUpdates" folder.
// nevertheless, for the demo purpose, we will ensure the database is created at runtime if it does not exist.
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PictureAlbumContext>();
    context.Database.EnsureCreated();
}

app.Run();
