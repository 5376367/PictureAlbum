using Microsoft.EntityFrameworkCore;
using PictureAlbumAPI.Models;

namespace PictureAlbumAPI.Data
{
    public class PictureAlbumContext : DbContext
    {
        public PictureAlbumContext(DbContextOptions<PictureAlbumContext> options) : base(options)
        {
        }

        public DbSet<Picture> Pictures { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Picture
            modelBuilder.Entity<Picture>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd(); // Auto-generated primary key
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
                entity.HasIndex(e => e.Name).IsUnique(); // Unique constraint on Name
                entity.Property(e => e.Date).IsRequired(false); // Optional datetime
                entity.Property(e => e.Description).HasMaxLength(250);
                entity.Property(e => e.Content).IsRequired();
            });
        }
    }
}