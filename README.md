# 🕹️ Gaming Leaderboard - Fullstack App

A fullstack leaderboard system with live updates, user rank lookup, Redis caching for performance, and a clean RESTful API. Built with the MERN stack and designed for scalability and real-time updates.

---

## 📦 Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Backend   | Node.js, Express        |
| Database  | MongoDB (Mongoose)      |
| Caching   | Redis                   |
| Frontend  | React.js + Tailwind CSS |
| Dev Tools | Nodemon, Postman, Vite  |

---

## 🚀 Features

- 🔥 Submit player scores
- 🏆 View top 10 leaderboard rankings
- 🔍 Lookup a player's rank by username
- ⚡️ Redis caching for fast leaderboard reads
- 🔄 Auto-updating frontend (every 5 seconds)
- 🧩 Modular and clean codebase

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Pra-cs/GAMING-LEADERBOARD.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/leaderboard
REDIS_URL=redis://localhost:6379
```

Start the backend server:

```bash
npx nodemon server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173) by default (Vite).

---

## 📬 API Endpoints

| Method | Endpoint                      | Description                          |
| ------ | ----------------------------- | ------------------------------------ |
| POST   | `/api/players/submit`         | Submit a player's score              |
| GET    | `/api/players/leaderboard`    | Get top 10 players leaderboard       |
| GET    | `/api/players/:username/rank` | Get the rank of a player by username |

---

## 📸 Screenshots (UI Screenshots)

> UI screenshots.<img width="468" height="595" alt="output" src="https://github.com/user-attachments/assets/260a38ad-155b-4d6a-82e9-13d15e90c964" />


---

## 🧠 Future Improvements

- Add user authentication (JWT)
- Real-time leaderboard with WebSockets
- Admin dashboard with player controls
- CI/CD deployment on Vercel + Render

---

## 📄 License

This project is licensed under the MIT License.
