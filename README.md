Here is a **single complete README file** — just copy-paste everything into your `README.md`:

````markdown
# School Management API

A RESTful API built with Node.js, Express, and MySQL to manage school data and retrieve schools sorted by proximity to a given location.

---

## 🚀 Live API
https://school-management-api-8idl.onrender.com

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MySQL
- Railway (Cloud Database)
- Render (Hosting)
- Postman (Testing)

---

## 📂 Features
- Add new school
- Get schools sorted by distance
- Input validation
- MySQL cloud database
- RESTful API structure
- Postman collection included

---

## 📡 API Endpoints

### 1️⃣ Add School
**POST** `/addSchool`

#### Request
```json
{
  "name": "Springdale Public School",
  "address": "Sector 21, Dwarka, New Delhi",
  "latitude": 28.5921,
  "longitude": 77.0460
}
```

#### Response
```json
{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "Springdale Public School",
    "address": "Sector 21, Dwarka, New Delhi",
    "latitude": 28.5921,
    "longitude": 77.046
  }
}
```

---

### 2️⃣ List Schools
**GET** `/listSchools?latitude=XX&longitude=YY`

#### Example
GET /listSchools?latitude=28.6139&longitude=77.2090

#### Response
```json
{
  "success": true,
  "count": 1,
  "user_location": {
    "latitude": 28.6139,
    "longitude": 77.209
  },
  "data": [
    {
      "id": 1,
      "name": "Springdale Public School",
      "address": "Sector 21, Dwarka, New Delhi",
      "latitude": 28.5921,
      "longitude": 77.046,
      "distance_km": 2.13
    }
  ]
}
```

---

## 🧪 Testing with Postman
1. Import Postman collection from `/postman` folder  
2. Set `base_url` to:  
```
https://school-management-api-8idl.onrender.com
```
3. Test:
- POST `/addSchool`
- GET `/listSchools`

---

## 🗄 Database Schema
```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL
);
```

---

## ⚙️ Environment Variables
```
DATABASE_URL=your_railway_mysql_url
PORT=5000
```

---

## 🧑‍💻 Local Setup (Optional)

### Clone repository
```bash
git clone https://github.com/Ravindra-15/school-management-api.git
cd school-management-api
```

### Install dependencies
```bash
npm install
```

### Create `.env`
```
DATABASE_URL=your_mysql_url
PORT=5000
```

### Run server
```bash
npm start
```

---

## 🌍 Deployment
- Backend hosted on Render
- MySQL hosted on Railway
- Environment variables configured in Render dashboard

---

## 📎 Postman Collection
Available in repository:
```
/postman/School_Management_API.postman_collection.json
```

---

## 👨‍💻 Author
Ravindra Kumar
````
