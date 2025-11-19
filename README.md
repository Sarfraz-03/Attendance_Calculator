# Attendance Calculator

A full‑stack web app to track and predict student attendance. Enter semester dates, timetable and absences to get per‑subject attendance percentages. Use the future absence checker to simulate planned absences.

## Features
- Create semester timetable (Mon–Fri, multiple slots)
- Mark absent dates (multi‑date picker)
- Calculate attendance % per subject
- Predict attendance impact for future absences
- Data persisted locally (localStorage) and saved to backend (MongoDB)

## Tech Stack
- Frontend: React, Tailwind CSS, react-router, react-multi-date-picker, Axios, Vite (or Create React App)
- Backend: Node.js, Express, Mongoose, MongoDB
- Dev: npm

## Prerequisites
- Node.js (16+)
- npm
- MongoDB (local) running (or MongoDB Atlas with proper MONGO_URI)

## Repo layout
- backend/ — Express API (server.js, routes, models, utils)
- frontend/ — React app (src/, vite.config.js or react-scripts setup)
- .gitignore

## Environment
If using MongoDB Atlas, create a `.env` in `backend/`:
```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/attendance?retryWrites=true&w=majority
PORT=5000
```
For local MongoDB no env variable is required if server.js connects to `mongodb://127.0.0.1:27017/attendance_calculator`.

## Install & Run

1. Backend
```
cd e:\Attendance\backend
npm install
# ensure MongoDB is running (e.g. run `mongod` or start the MongoDB service)
# start server:
node server.js
# or if package.json has script:
# npm start
```

2. Frontend
```
cd e:\Attendance\frontend
npm install


# If the project uses Create React App:
npm start
```

Open the app in your browser:
- Vite default: http://localhost:5173
- CRA default: http://localhost:3000
- Backend API: http://localhost:5000/api/semester

## API (important endpoints)
- POST /api/semester — save semester (startDate, endDate, timetable, absences)
- GET /api/semester/report — get current attendance report (includes percentage)
- POST /api/semester/future — send futureAbsences, returns predicted report

## Troubleshooting
- "Could not connect to servers": ensure MongoDB is running or MONGO_URI is correct and Atlas IP is whitelisted.
- Missing packages: run `npm install` in backend/frontend.
- If port conflicts, set PORT in backend `.env` or change frontend dev port.

## Notes
- Use browser devtools Network tab to inspect API responses if percentages are not displayed.
- Timetable and form fields are persisted to localStorage while navigating; refreshing clears local state unless saved to backend.
