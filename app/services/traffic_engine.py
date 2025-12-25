from datetime import datetime

class TrafficEngine:
    def predict_congestion(self, hour: int):
        if 8 <= hour <= 10 or 17 <= hour <= 20:
            return "HIGH"
        elif 6 <= hour <= 7 or 21 <= hour <= 22:
            return "MEDIUM"
        return "LOW"

    def suggest_algorithm(self, congestion: str):
        return {
            "LOW": "Dijkstra",
            "MEDIUM": "A*",
            "HIGH": "A* with congestion penalty"
        }[congestion]
