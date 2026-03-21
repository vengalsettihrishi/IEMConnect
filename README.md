<div align="center">
  <h1>🎯 IEMConnect - Event Management System</h1>
  <p>A comprehensive, full-stack platform for institutional event creation, tracking, and communication.</p>
  
  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)
  ![Next.js](https://img.shields.io/badge/Next.js-Frontend-black.svg)
</div>
## 🌟 Description
**IEMConnect** is a robust, full-stack Event Management System designed to streamline the process of orchestrating events within an educational or organizational institution. It provides a centralized digital workspace for administrators to create events, manage essential paperwork, track participant attendance, and effortlessly distribute announcements. 
By replacing disjointed manual processes, IEMConnect ensures students and staff stay informed of upcoming opportunities while providing event directors with powerful oversight tools.
## 🚀 Features
- **Role-Based Access Control (RBAC):** Secure JWT authentication differentiating Admins (event creators/managers) from regular Members (participants).
- **Complete Event Lifecycle:** Full CRUD operations for events, including start/end dates, pricing, and targeted participant demographics.
- **File Management:** Built-in upload system for event posters (images) and official paperwork (PDFs, Word docs) with a 10MB limit and automatic old-file cleanup.
- **Search & Filtering:** Dynamic list view allowing users to quickly find events by title, director name, or status (`Upcoming`, `Open`, `Completed`).
- **Notification System:** In-app real-time notification bell with unread counters, coupled with an Email notification fallback using Nodemailer.
- **Admin Announcements:** Ability for event directors to broadcast targeted messages to all registered participants of a specific event.
- **Feedback & Reports:** Collect participant feedback via an integrated rating system and generate analytical reports for review.
## 🛠 Tech Stack
**Frontend:**
- [Next.js (App Router)](https://nextjs.org/) - React framework for UI.
- [TypeScript](https://www.typescriptlang.org/) - Typed strictly for better developer experience.
- [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/) - Modern and accessible styling.
- [Axios](https://axios-http.com/) - For making seamless API requests.
**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - Core backend environment.
- [MySQL](https://www.mysql.com/) - Primary relational database.
- [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for database modeling and migrations.
- [Multer](https://github.com/expressjs/multer) - Middleware for handling `multipart/form-data` uploads.
- [jsonwebtoken](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Security layers.
## 📁 Architecture Overview
This repository uses an **npm workspaces** structure (Monorepo), cleanly separating the client and server while keeping them in one unified repository.
```text
IEMConnect/
├── frontend/          # Next.js web application
│   ├── app/           # App router pages (dashboard, event list, view event, etc.)
│   ├── components/    # Reusable UI components (NotificationBell, Tables, Cards)
│   ├── context/       # React Context providers (Auth context)
│   └── lib/           # Utility functions and strongly-typed API clients
├── backend/           # Node.js/Express server
│   ├── controllers/   # Request handling logic for events, auth, notifications
│   ├── models/        # Sequelize database models
│   ├── routes/        # Express API endpoints routing
│   ├── services/      # Business logic (e.g., NotificationService)
│   └── uploads/       # Local storage directory for event files
├── database_schema.sql # Reference SQL dump for database initialization
└── package.json       # Root workspace configuration
```
## ⚙️ Installation Instructions
### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) running locally or remotely.
### Step-by-Step Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/IEMConnect.git
   cd IEMConnect
   ```
2. **Install all dependencies:**
   Due to the workspace configuration, running npm install at the root installs dependencies for both frontend and backend.
   ```bash
   npm install
   ```
3. **Database Setup:**
   - Ensure your MySQL server is running.
   - Create a new database named `iem_connect`.
   - The backend uses Sequelize which can auto-sync tables, but you can also import `backend/database_schema.sql` to initialize it manually.
4. **Environment Variables:**
   Navigate to the `backend/` directory and create a `.env` file using the provided `.env.example` as a template:
   ```env
   DB_NAME=iem_connect
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_HOST=localhost
   DB_PORT=3306
   JWT_SECRET=your_super_secret_jwt_key
   
   # Email Configuration (for Notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   FRONTEND_URL=http://localhost:3000
   ```
   *(Note: The frontend expects the API to be available at `http://localhost:5000/api/v1` by default. If your port differs, update the frontend environment variables accordingly).*
## 💻 Usage
To run both the frontend and backend concurrently in development mode, simply run from the root directory:
```bash
npm run dev
```
Alternatively, you can run them separately:
- **Run Backend Only:** `npm run backend` (API starts on `http://localhost:5000`)
- **Run Frontend Only:** `npm run frontend` (App starts on `http://localhost:3000`)
Access the web interface at `http://localhost:3000` and sign in. 
## 📡 API Endpoints (Backend Overview)
*Base API Path: `http://localhost:5000/api/v1`*
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/auth/login` | Authenticate and obtain JWT | No |
| GET    | `/events` | Fetch list of events (supports search/filter) | Yes |
| POST   | `/events` | Create a new event alongside poster/paperwork files | Yes (Admin) |
| PUT    | `/events/:id` | Update event information and replace files | Yes (Admin) |
| GET    | `/events/files/:file`| Securely download event files | Yes |
| GET    | `/notifications` | Retrieve paginated notifications for logged-in user | Yes |
| POST   | `/events/:id/announce`| Send blast announcement to event participants | Yes (Admin) |
> For a complete and detailed breakdown of API payloads, parameters, and error responses, please refer to the `backend/API_DOCUMENTATION.md` file.
## 🔮 Future Improvements / Roadmap
- **Payment Gateway Integration:** Allow users to pay for paid events directly through the platform (Stripe or PayPal).
- **Calendar Integration:** Calendar view for users to visualize upcoming events, with ICS file export functionality.
- **Advanced Analytics Dashboard:** Graphical representation of event attendance, feedback scores, and engagement metrics for directors.
- **QR Code Attendance:** Implement QR code generation for events to streamline check-ins at the door.
## 🤝 Contributing
Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
---
*Assumptions Made: It is assumed that the `frontned` API requests are mapped to `http://localhost:5000`. Also assumed that `backend/.env.example` format matches the standard Next/Node setup for this repo. If specific production deployment scripts exist, they should be appended above.*
