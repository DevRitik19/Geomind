// Haversine formula to calculate distance between two lat/lng coordinates in km
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d);
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Calculate direction (bearing) from coordinate 1 to coordinate 2
export const calculateDirection = (lat1, lon1, lat2, lon2) => {
  const dLon = deg2rad(lon2 - lon1);
  const phi1 = deg2rad(lat1);
  const phi2 = deg2rad(lat2);

  const y = Math.sin(dLon) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) -
            Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLon);
  let brng = Math.atan2(y, x);
  brng = brng * (180 / Math.PI);
  brng = (brng + 360) % 360;

  const compassAngles = [
    { label: "N", min: 337.5, max: 360 },
    { label: "N", min: 0, max: 22.5 },
    { label: "NE", min: 22.5, max: 67.5 },
    { label: "E", min: 67.5, max: 112.5 },
    { label: "SE", min: 112.5, max: 157.5 },
    { label: "S", min: 157.5, max: 202.5 },
    { label: "SW", min: 202.5, max: 247.5 },
    { label: "W", min: 247.5, max: 292.5 },
    { label: "NW", min: 292.5, max: 337.5 }
  ];

  const direction = compassAngles.find(a => brng >= a.min && brng < a.max);
  return direction ? direction.label : "N";
};
