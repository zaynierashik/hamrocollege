from math import radians, cos, sin, asin, sqrt
from app.models import Institution

def haversine(lat1, lon1, lat2, lon2):
    """Calculate the great-circle distance between two points on the Earth."""
    R = 6371  # Radius of the Earth in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    return R * c  # Distance in km

def get_nearby_institutions(user, radius_km=50):
    """Return institutions within radius_km of user, sorted nearest-first."""
    if user.latitude is None or user.longitude is None:
        return []

    user_lat = float(user.latitude)
    user_lon = float(user.longitude)

    # Coarse DB prefilter to reduce rows before exact haversine computation.
    lat_delta = radius_km / 111.32
    lon_divisor = 111.32 * max(cos(radians(user_lat)), 0.01)
    lon_delta = radius_km / lon_divisor

    institutions = Institution.objects.filter(
        latitude__isnull=False,
        longitude__isnull=False,
        latitude__gte=user_lat - lat_delta,
        latitude__lte=user_lat + lat_delta,
        longitude__gte=user_lon - lon_delta,
        longitude__lte=user_lon + lon_delta,
    )

    nearby = []
    
    for institution in institutions:
        distance = haversine(user_lat, user_lon, float(institution.latitude), float(institution.longitude))
        if distance <= radius_km:
            nearby.append({'institution': institution, 'distance': round(distance, 2)})
    
    nearby.sort(key=lambda x: x['distance'])
    
    return nearby