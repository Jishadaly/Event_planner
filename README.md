# Event Hub – Real-Time Event Management Platform

A full-stack event management app with real-time chat, notifications, and analytics.

---

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account

### Installation

**1. Clone & Install**
```bash
git clone https://github.com/Jishadaly/Event_planner
cd event-hub
```

**2. Backend**
```bash
cd server
npm install
```

Create `.env` in `/server`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_HOST=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Run server:
```bash
npm run dev
```

**3. Frontend**
```bash
cd client
npm install
```

Create `.env` in `/client`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Run frontend:
```bash
npm run dev
```

---

## 🔑 Demo Accounts

| Role        | Email                | Password |
|-------------|----------------------|----------|
| Admin       | admin@gmail.com      | admin@123|
| Organizer   | jishadlm10@gmail.com | 12345678 |
| Participant | jishaddev@gmail.com  | 12345678 |

---

## API Endpoints

### Auth
```
POST /api/auth/register  - Sign up
POST /api/auth/login     - Login
POST /api/auth/logout    - Logout
```

### Events
```
GET    /api/events           - All events
POST   /api/events           - Create event
GET    /api/events/:id       - Event details
PATCH  /api/events/:id       - Update event
DELETE /api/events/:id       - Delete event
POST   /api/events/:id/join  - Join event
POST   /api/events/:id/leave - Leave event
```

### Dashboard
```
GET /api/dashboard/admin       - Admin stats
GET /api/dashboard/organizer   - Organizer stats
GET /api/dashboard/participant - Participant stats
```
### Notification
```
GET    /api/notifications           - Get my notifications
PATCH  /api/notifications/:id/read  - Mark one as read
PATCH  /api/notifications/readAll   - Mark all as read
DELETE /api/notifications/:id       - Delete one
DELETE /api/notifications           - Delete all
```

---

## ⚡ Real-Time (Socket.IO)

**Room Events**
- `join-event-room` - Join room
- `leave-event-room` - Leave room
- `room-users` - Live participants

**Chat Events**
- `send-message` - Send message
- `receive-message` - Get message

**Notifications**
- `event:created` - New event
- `event:updated` - Event changed
- `event:participant-joined` - User joined
- `event:participant-left` - User left

---

## ⏱️ Background Jobs (Cron)

Runs daily at midnight to send event reminders:
Checking events for upcoming reminders...

**What it does:**
- Checks for events starting tomorrow
- Sends reminder notifications to all participants
- Runs automatically every day at 12:00 AM

---

## Theme Toggler (Dark / Light Mode)

The UI includes:

✔ Global theme provider
✔ One-click switch
✔ Auto-detect system preference
✔ Fully persistent via localStorage

Used in Navbar or Settings:

dark

light

system

---

## 🔐 Role-Based Authentication

Each login assigns a role:

Role	Access
Admin	Manage users, events, analytics
Organizer	Create/update events, dashboard
Participant	Join events, chat, notifications

Frontend protects pages using:

ProtectedRoute

RoleBasedRoute

Backend protects APIs using:

protect

restrictTo("admin" | "organizer" | "participant")

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Query, Socket.IO  
**Backend:** Node.js, Express, MongoDB, Socket.IO, JWT, Cloudinary  
**Tools:** Multer, Bcrypt, Recharts, Cron

---

## ✨ Features

- Create and manage events
- Real-time chat
- Live notifications
- Dashboard with analytics
- Cloud image uploads
- Role-based access (Admin/Organizer/Participant)
- Automated daily reminders

---

## 📦 Deployment

1. Push to GitHub
2. Deploy backend (Render/Railway)
3. Deploy frontend (Vercel/Netlify)
4. Set environment variables

---

## 📝 License

MIT

---

⭐ Star this repo if you find it helpful!
