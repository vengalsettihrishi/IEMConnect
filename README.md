
# 🎯 IEMConnect — Event Management System

> A full-stack platform for creating, managing, and communicating institutional events — all in one place.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black.svg)

---

## 🌟 Overview

**IEMConnect** is a centralized event management system built for institutions and organizations to streamline event workflows.

It replaces fragmented, manual processes with a unified platform where administrators can:

* create and manage events
* handle documentation
* track participation
* communicate seamlessly with attendees

At the same time, users get a clean interface to discover, join, and stay updated on events.

---

## 🚀 Core Features

### 🔐 Authentication & Roles

* JWT-based authentication
* Role-Based Access Control (Admin vs Member)

### 📅 Event Lifecycle Management

* Full CRUD operations for events
* Support for dates, pricing, and audience targeting

### 📂 File Handling

* Upload posters and official documents
* Automatic cleanup of outdated files
* File size limit enforcement (10MB)

### 🔍 Smart Search & Filters

* Search by title, organizer, or status
* Filter events (`Upcoming`, `Open`, `Completed`)

### 🔔 Notifications System

* Real-time in-app notifications
* Email fallback via Nodemailer

### 📢 Announcements

* Event-specific broadcast messaging by admins

### ⭐ Feedback & Reporting

* Rating system for participants
* Analytical insights for event performance

---

## 🛠 Tech Stack

### Frontend

* **Next.js (App Router)** — Scalable React framework
* **TypeScript** — Type safety & maintainability
* **Tailwind CSS + Radix UI** — Modern UI/UX
* **Axios** — API communication

### Backend

* **Node.js + Express.js** — REST API server
* **MySQL** — Relational database
* **Sequelize** — ORM & migrations
* **Multer** — File uploads
* **JWT + bcryptjs** — Authentication & security

---

## 📁 Project Structure

```bash
IEMConnect/
├── frontend/          # Next.js application
│   ├── app/           # Routes & pages
│   ├── components/    # UI components
│   ├── context/       # Global state (Auth, etc.)
│   └── lib/           # Utilities & API clients
│
├── backend/           # Express server
│   ├── controllers/   # Request logic
│   ├── models/        # Sequelize models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── uploads/       # File storage
│
├── database_schema.sql
└── package.json
```

---

## ⚙️ Setup & Installation

### Prerequisites

* Node.js (v18+ recommended)
* MySQL Server

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/IEMConnect.git
cd IEMConnect
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Database

* Create a MySQL database:

```sql
CREATE DATABASE iem_connect;
```

* Option A: Let Sequelize auto-sync
* Option B: Import schema manually:

```bash
backend/database_schema.sql
```

---

### 4. Environment Variables

Create a `.env` file inside `/backend`:

```env
DB_NAME=iem_connect
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

JWT_SECRET=your_secret_key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

FRONTEND_URL=http://localhost:3000
```

---

## 💻 Running the App

### Run everything (recommended)

```bash
npm run dev
```

### Run separately

```bash
npm run backend   # http://localhost:5000
npm run frontend  # http://localhost:3000
```

---

## 📡 API Overview

Base URL:

```
http://localhost:5000/api/v1
```

| Method | Endpoint               | Description        | Auth      |
| ------ | ---------------------- | ------------------ | --------- |
| POST   | `/auth/login`          | Login & get JWT    | ❌         |
| GET    | `/events`              | Fetch events       | ✅         |
| POST   | `/events`              | Create event       | ✅ (Admin) |
| PUT    | `/events/:id`          | Update event       | ✅ (Admin) |
| GET    | `/events/files/:file`  | Download files     | ✅         |
| GET    | `/notifications`       | Get notifications  | ✅         |
| POST   | `/events/:id/announce` | Send announcements | ✅ (Admin) |

👉 Full API details: `backend/API_DOCUMENTATION.md`

---

## 🔮 Roadmap

* 💳 Payment integration (Stripe / PayPal)
* 📅 Calendar view + ICS export
* 📊 Advanced analytics dashboard
* 📱 QR-based attendance system

---

## 🤝 Contributing

Pull requests are welcome — seriously.

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a PR ✨

---

## 📄 License

MIT License — feel free to use, modify, and build on top of it.

---

## 🧠 Notes

* Frontend expects backend at `http://localhost:5000`
* Environment config follows standard Node + Next.js setup 


If you want, I’ll turn this into a *10/10 standout README with visuals and badges that actually slap*.
