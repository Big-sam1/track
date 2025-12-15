let map;
let marker;
let watchId = null;

// Initialize Google Map (SATELLITE)
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapTypeId: "satellite" // ✅ Satellite view
  });
}

// ----------------------
// LIVE GPS TRACKING
// ----------------------
function startTracking() {
  const status = document.getElementById("status");

  if (!navigator.geolocation) {
    status.innerText = "Geolocation not supported.";
    return;
  }

  status.innerText = "Tracking your live location...";
  watchId = navigator.geolocation.watchPosition(
    showPosition,
    showError,
    { enableHighAccuracy: true }
  );
}

function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    document.getElementById("status").innerText = "Tracking stopped.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  updateMarker(lat, lng, "Your Live Location");

  document.getElementById("status").innerText =
    `Live Location → Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`;
}

// ----------------------
// MANUAL LAT/LNG TRACKING
// ----------------------
function trackByCoordinates() {
  const lat = parseFloat(document.getElementById("lat").value);
  const lng = parseFloat(document.getElementById("lng").value);

  if (isNaN(lat) || isNaN(lng)) {
    alert("Please enter valid latitude and longitude!");
    return;
  }

  updateMarker(lat, lng, "Tracked Location");

  document.getElementById("status").innerText =
    `Tracking Location → Latitude: ${lat}, Longitude: ${lng}`;
}

// ----------------------
// UPDATE MARKER
// ----------------------
function updateMarker(lat, lng, title) {
  const position = { lat, lng };

  map.setCenter(position);
  map.setZoom(18);

  if (marker) marker.setMap(null);

  marker = new google.maps.Marker({
    position,
    map,
    title
  });
}

// ----------------------
// ERROR HANDLING
// ----------------------
function showError(error) {
  document.getElementById("status").innerText =
    "Unable to fetch location.";
}
