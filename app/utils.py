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
    """Return institutions within a given radius (default 50 km) of the user with distances."""
    if not user.latitude or not user.longitude:
        return []  # No location set for user
    
    institutions = Institution.objects.all()
    nearby = []
    
    for institution in institutions:
        if institution.latitude and institution.longitude:
            distance = haversine(user.latitude, user.longitude, institution.latitude, institution.longitude)
            if distance <= radius_km:
                nearby.append({'institution': institution, 'distance': round(distance, 2)})  # Round to 2 decimal places
    
    # Sort by nearest distance
    nearby.sort(key=lambda x: x['distance'])
    
    return nearby