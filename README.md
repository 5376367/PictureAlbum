# Picture Album API

A full-stack application with .NET Web API backend and React frontend for managing picture albums.

## Prerequisites
- .NET 6.0 or later
- Node.js 16+ and npm
- Visual Studio 2022 (recommended)

## Setup Instructions

### 1. Database Setup
- Database is automatically created on first run using `EnsureCreated()`
- No manual migrations required
- Optional SQL scripts available at: `./PictureAlbumAPI/DataBaseUpdates/InitialSetup.sql`

### 2. Backend Setup (.NET Web API)
1. Open `PictureAlbumAPI.sln` in Visual Studio
2. Set `PictureAlbumAPI` as startup project
3. Run with F5
4. Backend runs at: `https://localhost:7087`

### 3. Frontend Setup (React)
```bash
cd PictureAlbum.Web
npm install
npm start