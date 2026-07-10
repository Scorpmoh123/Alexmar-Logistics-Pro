# Alexmar Logistics Pro

A modern logistics management platform with Node.js backend and Vite frontend.

## Structure

- `/backend` - Express.js API server
- `/frontend` - Vite React frontend

## Getting Started

### Backend
```bash
cd backend
npm install
npm run devoperation application 

frontend
cd frontend
npm install
npm run dev


---

**2. Backend folder** (`/backend/`)

Create `package.json`:
```json
{
  "name": "logistics-backend",
  "version": "1.0.0",
  "description": "Logistics API backend",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "engines": {
    "node": ">=18"
  }
}