class RouteEngine:
    def compute_route(self, source: str, destination: str, hour: int):
        # Placeholder logic (production-safe)
        algorithm = "A*" if hour in range(8, 11) or hour in range(17, 20) else "Dijkstra"

        return {
            "algorithm": algorithm,
            "path": [source, "Intermediate Node", destination],
            "estimated_time_min": 42,
            "traffic_level": "HIGH" if algorithm == "A*" else "NORMAL"
        }
