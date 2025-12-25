from fastapi import APIRouter, Query
from app.services.traffic_engine import TrafficEngine
from app.services.route_engine import RouteEngine

router = APIRouter()

traffic = TrafficEngine()
router_engine = RouteEngine()

@router.get("/route")
def get_route(
    source: str = Query(...),
    destination: str = Query(...),
    hour: int = Query(...)
):
    congestion = traffic.predict_congestion(hour)
    algorithm = traffic.suggest_algorithm(congestion)
    path = router_engine.compute_route(source, destination, congestion)

    return {
        "source": source,
        "destination": destination,
        "hour": hour,
        "congestion_level": congestion,
        "algorithm": algorithm,
        "path": path
    }
