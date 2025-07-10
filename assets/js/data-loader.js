import mapboxgl from 'mapbox-gl';

let activeMarkers = [];
let allData = [];
//let currentType = 'traffic'; // default
let updateInterval;

function clearMarkers() {
  activeMarkers.forEach(marker => marker.remove());
  activeMarkers = [];
}

function getRandomPositionInView(map) {
  const bounds = map.getBounds();
  const lat = bounds.getSouth() + Math.random() * (bounds.getNorth() - bounds.getSouth());
  const lon = bounds.getWest() + Math.random() * (bounds.getEast() - bounds.getWest());
  return [lon, lat];
}

function createMarker(item, map) {
  const [lon, lat] = getRandomPositionInView(map);

  const el = document.createElement('div');
  el.className = 'marker';
  el.textContent = item.icon || '📍';

  const marker = new mapboxgl.Marker(el)
    .setLngLat([lon, lat])
    .setPopup(new mapboxgl.Popup().setHTML(
      `<strong>${item.name}</strong><br>${item.description}`
    ))
    .addTo(map);

  return marker;
}

function refreshMarkers(map) {
  const toReplace = Math.floor(activeMarkers.length * 0.33);

  for (let i = 0; i < toReplace; i++) {
    const idx = Math.floor(Math.random() * activeMarkers.length);
    const oldMarker = activeMarkers.splice(idx, 1)[0];
    oldMarker.remove();

    const item = allData[Math.floor(Math.random() * allData.length)];
    const newMarker = createMarker(item, map);
    activeMarkers.push(newMarker);
  }
}

export async function loadAndRenderData(type, map) {
  clearInterval(updateInterval); // stop any previous loop
  clearMarkers();

  //currentType = type;
  const response = await fetch(`./data/${type}.json`);
  allData = await response.json();

  // Add initial markers
  allData.forEach(item => {
    const marker = createMarker(item, map);
    activeMarkers.push(marker);
  });

  // Start 20-second update cycle
  updateInterval = setInterval(() => {
    refreshMarkers(map);
  }, 20000);
}
