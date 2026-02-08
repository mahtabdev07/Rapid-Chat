
# 🚀 Rapid Chat — Real-Time Chat Application

Rapid Chat is a modern, full-stack real-time chat application built with **React, Node.js, Socket.IO, and MongoDB**.  
It supports **secure authentication, real-time messaging, online presence, image sharing, notifications, and a responsive UI**.

🔗 **Live Demo:** https://rapid-chat-app.vercel.app

---

## ✨ Features

### 🔐 Authentication
- JWT-based authentication using HTTP-only cookies
- Signup, login, logout
- Persistent authentication with `/auth/check`
- Protected routes (frontend & backend)

### 💬 Real-Time Chat
- One-to-one real-time messaging with **Socket.IO**
- Instant message delivery
- Online/offline presence
- Optimistic UI updates

### 🖼 Image Messaging
- Send image messages
- Images uploaded & optimized using **Cloudinary**
- Image previews before sending

### 🔔 Notifications
- Sound notifications for incoming messages
- Toast notifications with click-to-open chat

### 📂 Smart Sidebar
- Auto reordering based on last message
- Online-only filter
- Real-time updates via sockets

### 👤 Profile Management
- Upload and update profile picture
- Cloudinary image optimization
- Secure profile updates

### 📱 Responsive Design
- Mobile-first layout
- Sidebar ↔ chat toggle on small screens
- Modern UI with TailwindCSS + DaisyUI

---

## 🧠 Tech Stack

### Frontend
- React 18
- Vite
- Zustand
- Axios
- Socket.IO Client
- TailwindCSS + DaisyUI
- React Router DOM
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- bcryptjs
- Cloudinary
- Cookie Parser
- CORS

---

## 🏗 Architecture Overview

Frontend → REST APIs + Socket.IO  
Backend → Auth, Messages, Real-time Events  
Database → MongoDB Atlas  
Media → Cloudinary

---

## 📂 Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend `.env`
```
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://rapid-chat-app.vercel.app

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

---

## 🚀 Getting Started

### Clone Repo
```
git clone https://github.com/your-username/rapid-chat.git
cd rapid-chat
```

### Backend Setup
```
cd backend
npm install
npm run dev
```

### Frontend Setup
```
cd frontend
npm install
npm run dev
```

Frontend → http://localhost:5173  
Backend → http://localhost:5001

---

## 🔒 Security
- HTTP-only JWT cookies
- Protected API routes
- Secure CORS & Socket configuration

---

## 🌐 Deployment
- Frontend: Vercel
- Backend: Render / Railway / VPS
- Database: MongoDB Atlas
- Media Storage: Cloudinary

---

## 📌 Future Improvements
- Typing indicators
- Read receipts
- Group chats
- Message delete/edit
- End-to-end encryption

---

## 👨‍💻 Author
**Mahtab** — Full Stack Developer

---

## 📄 License
ISC License
