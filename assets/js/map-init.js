import mapboxgl from 'mapbox-gl';
import '../scss/main.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { initControls } from './ui-controls.js';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function initMap(centerCoords) {
  window.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: centerCoords,
    zoom: 12
  });

  window.map.on('load', () => {
    initControls(window.map);
  });
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const coords = [pos.coords.longitude, pos.coords.latitude];
      initMap(coords);
    },
    () => {
      initMap([-81.491, 31.187]); // fallback to Brunswick, GA
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
} else {
  initMap([-81.491, 31.187]);
}

