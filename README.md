# 🚦 Smart Traffic Intelligence System

An AI-assisted, congestion-aware route planning system that dynamically selects optimal routing strategies based on traffic conditions.

## 🔥 Why this project?
Traditional navigation apps treat all routes equally. This system:
- Predicts congestion using time-based intelligence
- Dynamically selects routing algorithms (Dijkstra / A*)
- Is designed to plug into real ML traffic models

## 🧠 Core Features
- Time-based traffic congestion prediction
- Dynamic routing algorithm selection
- Modular service-oriented backend
- Frontend + Backend fully decoupled
- Production-ready API with OpenAPI docs

## 🏗️ Architecture
Frontend (Next.js)
        ↓
FastAPI Backend
        ↓
Traffic Engine → Route Engine

## 🚀 API Example
GET /route?source=Anna Nagar&destination=Guindy&hour=9

Response:
{
  "congestion_level": "HIGH",
  "algorithm": "A* with congestion penalty",
  "path": ["Anna Nagar", "Bypass Road", "Guindy"]
}

## 🛠️ Tech Stack
- Backend: FastAPI, Python
- Frontend: Next.js, Tailwind
- Algorithms: Dijkstra, A*
- Architecture: Service-based

## 🔮 Future Enhancements
- ML-based congestion prediction
- Map integration
- Real-time traffic feeds

## 👨‍💻 Author
Akshar Madan  
 B.Tech
