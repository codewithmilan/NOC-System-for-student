# 🚀 NOC Management System

A full-stack **NOC (No Objection Certificate) Management System** developed to digitalize and automate the internship approval workflow between students and administration.

This system allows students to apply for NOC online and enables administrators to review, approve, or reject applications efficiently through a secure dashboard.

---

## 📌 Project Overview

The **NOC Management System** eliminates manual paperwork by providing an online platform where:

* Students can submit internship NOC requests
* Upload required documents
* Track application status
* Admin can verify and manage requests in real-time

The project demonstrates full-stack development skills including authentication, REST APIs, database integration, and role-based access control.

---

## ✨ Features

### 👨‍🎓 Student Module

* Student Registration & Login
* Secure Authentication (JWT)
* Apply for NOC
* Upload Offer Letter & Fee Receipt
* View Application Status
* One Pending Application Restriction

### 🧑‍💼 Admin Module

* Admin Login
* View All Applications
* Approve / Reject Requests
* Real-time Status Update

### 🔐 Security Features

* Password Hashing using bcrypt
* JWT Authentication
* Role-Based Access Control
* Protected API Routes

---

## 🛠️ Tech Stack

### Frontend
* javaScript
* React.js
* TypeScript
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* REST API Architecture

### Database

* MongoDB Atlas (Cloud Database)
* Mongoose ODM

### Tools & Platforms

* Thunder Client (API Testing)
* Git & GitHub
* VS Code

---

## 🏗️ System Architecture

```
React Frontend
        ↓
Express Backend (REST API)
        ↓
MongoDB Atlas (Cloud Database)
```

---

## 📂 Project Structure

```
NOC-System
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── models
│   ├── uploads
│   └── server.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/noc-system.git
cd noc-system
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=mongodb+srv://milanverj7o:Milan2007@milan.nz3383q.mongodb.net/nocDB?retryWrites=true&w=majority
JWT_SECRET64a4db2aaf52523125b807553893d57542e084e1356b4bb5ba5e5c826accf04ee574d92767addb2e7dc816696c0cb4366dfa4b96deb481994a015c55b758ab63
PORT=5000
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

| Variable   | Description                     |
| ---------- | ------------------------------- |
| MONGO_URI  | MongoDB Atlas connection string |
| JWT_SECRET | Token encryption secret         |
| PORT       | Backend server port             |

---

## 📸 Screenshots (Add Later)

* Login Page
* Student Dashboard
* Apply NOC Form
* Admin Panel

---

## 🚀 Future Improvements

* Email Notifications
* Admin Analytics Dashboard
* Role-based middleware enhancement
* File preview system
* Deployment automation (CI/CD)

---

## 👨‍💻 Author

**Milan Kumar Verma**
B.Tech Computer Science Student

---

## ⭐ Learning Outcomes

This project helped in understanding:

* Full Stack Web Development
* Authentication & Authorization
* REST API Design
* MongoDB Atlas Integration
* Real-world project deployment workflow

---

## 📄 License

This project is created for educational and portfolio purposes.
