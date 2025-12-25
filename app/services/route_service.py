import networkx as nx

# Simple city graph (can be replaced with real data later)
GRAPH = nx.Graph()

EDGES = [
    ("Anna Nagar", "Vadapalani", 5),
    ("Vadapalani", "Guindy", 7),
    ("Anna Nagar", "T Nagar", 6),
    ("T Nagar", "Guindy", 4),
    ("Anna Nagar", "Koyambedu", 3),
    ("Koyambedu", "Guindy", 8),
]

for u, v, w in EDGES:
    GRAPH.add_edge(u, v, weight=w)

def traffic_multiplier(hour: int):
    if 8 <= hour <= 10 or 17 <= hour <= 20:
        return 1.8  # peak traffic
    return 1.0

def compute_route(source: str, destination: str, hour: int):
    source = source.title().strip()
    destination = destination.title().strip()

    if source not in GRAPH or destination not in GRAPH:
        return {
            "error": "Invalid locations",
            "available_locations": list(GRAPH.nodes)
        }

    multiplier = traffic_multiplier(hour)

    weighted_graph = nx.Graph()
    for u, v, data in GRAPH.edges(data=True):
        weighted_graph.add_edge(u, v, weight=data["weight"] * multiplier)

    path = nx.shortest_path(weighted_graph, source, destination, weight="weight")
    cost = nx.shortest_path_length(weighted_graph, source, destination, weight="weight")

    return {
        "algorithm": "Dijkstra (traffic-aware)",
        "hour": hour,
        "traffic_multiplier": multiplier,
        "path": path,
        "estimated_cost": round(cost, 2)
    }
