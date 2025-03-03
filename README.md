# 🏢 Job Portal API

A **Job Portal API** built using **Node.js, Express, and MongoDB**, allowing users to **create, update, delete, and fetch job listings** after authentication. The API supports **job filtering, sorting, and statistics**, making it useful for job seekers and recruiters.

---

## 🚀 Features
- ✅ **User Authentication** (Register, Login, JWT Authentication)
- ✅ **Job Management** (Create, Update, Delete, View Jobs)
- ✅ **Job Filtering & Sorting** (By status, work type, search)
- ✅ **Job Statistics** (Monthly applications, status count)
- ✅ **Pagination Support**
- ✅ **Secure API with Middleware**

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Middleware:** Express Middleware for Authentication & Error Handling
- **API Documentation:** Swagger UI

---

## 📦 Installation

1️⃣ **Clone the Repository**  
```bash
git clone https://github.com/your-username/job-portal-api.git
cd job-portal-api
```
2️⃣ **Install Dependencies**
```bash
npm install
```
3️⃣ Set Up Environment Variables | Create a .env file in the root directory and add the following variables:
```bash
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
4️⃣ Start the Server
```bash
npm start
```
Server runs at: http://localhost:8080

---

## 🔑 Authentication

JWT-based authentication is required for job-related APIs.
- Register/Login to get a token
- Pass the token in the Authorization header (Bearer `<token>`)

---

## 📌 API Endpoints

**Auth Routes**

| **Endpoint**             | **Method** | **Description**              | **Authentication** | **Request Body** |
|--------------------------|-----------|------------------------------|--------------------|------------------|
| `/api/v1/auth/register`  | `POST`    | Register a new user          | ❌ No             | ✅ Yes          |
| `/api/v1/auth/login`     | `POST`    | Login and get JWT token      | ❌ No             | ✅ Yes          |
| `/api/v1/user/update-user` | `PUT`   | Update user profile          | ✅ Yes            | ✅ Yes          |


**Job Routes**

| **Endpoint**                 | **Method** | **Description**                    | **Authentication** | **Request Body** |
|------------------------------|-----------|------------------------------------|--------------------|------------------|
| `/api/v1/job/create-job`      | `POST`    | Create a new job                  | ✅ Yes            | ✅ Yes          |
| `/api/v1/job/get-job`         | `GET`     | Get all jobs with filters         | ✅ Yes            | ❌ No           |
| `/api/v1/job/update-job/:id`  | `PUT`     | Update a job by ID                | ✅ Yes            | ✅ Yes          |
| `/api/v1/job/delete-job/:id`  | `DELETE`  | Delete a job by ID                | ✅ Yes            | ❌ No           |
| `/api/v1/job/job-stats`       | `GET`     | Get job statistics                | ✅ Yes            | ❌ No           |

---

## 📝 API Documentation

Swagger UI is available at : 
🔗 http://localhost:8080/api-docs
