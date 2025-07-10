import { loadAndRenderData } from './data-loader.js';

const styleSelector = document.getElementById('style-selector');
const dataSelector = document.getElementById('data-selector');

export function initControls(map) {
  // Change map style
  styleSelector.addEventListener('change', (e) => {
    const selectedStyle = e.target.value;
    map.setStyle(`mapbox://styles/mapbox/${selectedStyle}`);
  });

  // Load data type
  dataSelector.addEventListener('change', async (e) => {
    const type = e.target.value;
    await loadAndRenderData(type, map);
  });

  // Load initial data
  const initialType = dataSelector.value;
  loadAndRenderData(initialType, map);
}
