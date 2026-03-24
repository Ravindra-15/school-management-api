# School Management API

Node.js + Express + MySQL REST API for managing schools with proximity-based sorting.

## Quick Start

### 1. Database Setup (phpMyAdmin)
Open phpMyAdmin → select your database → click **SQL** tab → paste & run `database_setup.sql`.

### 2. Clone & Install
```bash
git clone <your-repo-url>
cd school-management
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MySQL credentials
```

### 4. Run
```bash
npm start        # production
npm run dev      # development with auto-reload
```

---

## API Reference

### POST /addSchool
Adds a new school to the database.

**Request body (JSON):**
```json
{
  "name": "Springdale Public School",
  "address": "Sector 21, Dwarka, New Delhi",
  "latitude": 28.5921,
  "longitude": 77.0460
}
```

**Success (201):**
```json
{
  "success": true,
  "message": "School added successfully.",
  "data": { "id": 5, "name": "...", "address": "...", "latitude": 28.5921, "longitude": 77.046 }
}
```

---

### GET /listSchools?latitude=XX&longitude=YY
Returns all schools sorted by distance from the given coordinates.

**Example:** `GET /listSchools?latitude=28.6139&longitude=77.2090`

**Success (200):**
```json
{
  "success": true,
  "count": 4,
  "user_location": { "latitude": 28.6139, "longitude": 77.209 },
  "data": [
    { "id": 4, "name": "Modern School", ..., "distance_km": 1.58 },
    ...
  ]
}
```

---

## Postman
Import `postman/School_Management_API.postman_collection.json` into Postman.  
Set `base_url` variable to your server URL (default: `http://localhost:3000`).

## Deployment (Render — Free Tier)
1. Push to GitHub.
2. Go to [render.com](https://render.com) → New Web Service → connect repo.
3. Set build command: `npm install`, start command: `npm start`.
4. Add environment variables from `.env.example` in the Render dashboard.
