# Event Hub – Real-Time Event Management Platform

A full-stack event management app with real-time chat, live notifications, analytics dashboard, and smooth animations.

---

## 🚀 Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account

### Installation

**1. Clone & Install**
```bash
git clone https://github.com/Jishadaly/Event_planner.git
cd Event_planner
```

**2. Backend Setup**
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

**3. Frontend Setup**
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

## 📡 API Endpoints

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

### Notifications
```
GET    /api/notifications           - Get my notifications
PATCH  /api/notifications/:id/read  - Mark one as read
PATCH  /api/notifications/readAll   - Mark all as read
DELETE /api/notifications/:id       - Delete one
DELETE /api/notifications           - Delete all
```

---

## ⚡ Real-Time Features (Socket.IO)

### Room Management
- `join-event-room` - Join event room
- `leave-event-room` - Leave event room
- `room-users` - Get live participant list

### Chat
- `send-message` - Send chat message
- `receive-message` - Receive messages instantly

### Live Notifications
- `event:created` - New event notification
- `event:updated` - Event update alert
- `event:participant-joined` - User joined event
- `event:participant-left` - User left event

---

## ⏱️ Background Jobs (Cron)

Automated daily reminders at **12:00 AM**:

```javascript
cron.schedule("0 0 * * *", async () => {
  console.log("Checking events for upcoming reminders..."); 
  // Send reminder notifications
});
```

**What it does:**
- Checks for events starting tomorrow
- Sends reminder notifications to participants
- Runs automatically every day

---

## 🎨 Frontend Features

### UI/UX
- **Tailwind CSS** + Custom components
- **Fully Responsive** - Mobile, tablet, desktop
- **Framer Motion** - Smooth page & modal animations

### Theme Toggler
- Light / Dark / System mode
- One-click switch in navbar
- Auto-detect system preference
- Persistent via localStorage

### Notification Panel
- Real-time notification dropdown
- Live count badge
- Mark as read / Delete / Clear all
- Color-coded by notification type

### Custom Components
- Reusable buttons, cards, modals
- Form validation with error messages
- Loading skeletons and spinners

---

## 🔐 Role-Based Authentication

| Role        | Access Level |
|-------------|-------------|
| **Admin** | Manage users, events, full analytics |
| **Organizer** | Create/update/delete own events, dashboard |
| **Participant** | Join events, chat, view notifications |


```

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite) - Fast development
- **Redux Toolkit** - GLobal State
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **Socket.IO Client** - Real-time updates
- **Recharts** - Dashboard analytics
- **Lucide React** - Icons


### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Socket.IO** - WebSocket server
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File uploads
- **Node-Cron** - Scheduled tasks
- **Bcrypt** - Password hashing

---

## ✨ Key Features

### Core Functionality
- ✅ Create, edit, and delete events
- ✅ Join and leave events
- ✅ Real-time chat rooms
- ✅ Live participant tracking
- ✅ Event search and filters

### User Experience
- ✅ Dark/Light theme toggle
- ✅ Smooth page transitions
- ✅ Animated modals
- ✅ Real-time notifications panel
- ✅ Responsive across all devices
- ✅ Loading states and error handling

### Advanced Features
- ✅ Dashboard analytics with charts
- ✅ Cloud image uploads
- ✅ Role-based access control
- ✅ Automated daily reminders
- ✅ System theme detection

---

## 📱 Responsive Design

The app is fully responsive and works seamlessly on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

---

## 📦 Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy Backend** (Render)
   - Connect GitHub repo
   - Set environment variables
   - Deploy

3. **Deploy Frontend** (Vercel)
   - Connect GitHub repo
   - Set environment variables
   - Deploy

4. **Update URLs**
   - Update `VITE_API_URL` and `VITE_SOCKET_URL` in frontend `.env`

---

## 📝 License

MIT

---

## 👤 Author

**Jishad Aly**
- GitHub: [@Jishadaly](https://github.com/Jishadaly)

---

⭐ **Star this repo if you find it helpful!**