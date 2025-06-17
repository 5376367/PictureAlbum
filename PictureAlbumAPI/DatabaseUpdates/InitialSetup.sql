---- This script creates the PictureAlbum database and initializes it with the necessary tables and indexes.
create database PictureAlbum
go

-- Use the newly created database
use PictureAlbum

-- Create the __EFMigrationsHistory table to track migrations
CREATE TABLE [__EFMigrationsHistory] (
    [MigrationId] nvarchar(150) NOT NULL,
    [ProductVersion] nvarchar(32) NOT NULL,
    CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
);
	
-- Create the Pictures table with necessary columns and constraints
CREATE TABLE [Pictures] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(50) NOT NULL,
    [Date] datetime2 NULL,
    [Description] nvarchar(250) NULL,
    [Content] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Pictures] PRIMARY KEY ([Id])
);

-- Create an index on the Name column to ensure uniqueness
CREATE UNIQUE INDEX [IX_Pictures_Name] ON [Pictures] ([Name]);

-- Insert the initial migration record into the __EFMigrationsHistory table
INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250616064046_InitialCreate', N'9.0.6');
