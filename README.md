# Real-Time WebSocket Event App

This is a full-stack TypeScript project featuring:

- A **Node.js** backend with **WebSocket** support.
- Message broadcasting and persistence (in-memory + file).
- **Login/logout** logic with CORS support.
- A **Vite + React** frontend for WebSocket interaction and authentication.

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

#backend

cd server
npm install
npm run dev

#frontend

cd ../client
npm install
npm run dev

#Environment Setup

Backend: http://localhost:4000

Frontend: http://localhost:5173 (Vite default)

✅ Features
✅ WebSocket broadcast with delay

✅ Login + Logout system

✅ Messages stored in memory and written to file

✅ Clear file when no WebSocket clients remain

✅ CORS-enabled
