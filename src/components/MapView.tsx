import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Prediction, Engineer } from '@/data/sampleData';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  predictions: Prediction[];
  engineers?: Engineer[];
  onPredictionClick?: (prediction: Prediction) => void;
  center?: [number, number];
  zoom?: number;
}

const MapView = ({ 
  predictions, 
  engineers = [], 
  onPredictionClick, 
  center = [-1.286389, 36.817223], // Nairobi, Kenya
  zoom = 6 
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView(center, zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    map.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.current?.removeLayer(layer);
      }
    });

    // Add prediction markers
    predictions.forEach((pred) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="w-8 h-8 rounded-full bg-primary shadow-lg flex items-center justify-center text-white font-bold border-2 border-white animate-pulse-glow">
              ${pred.energyType === 'solar' ? '☀️' : pred.energyType === 'wind' ? '🌬️' : pred.energyType === 'hydro' ? '💧' : '🌋'}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([pred.lat, pred.lng], { icon }).addTo(map.current!);
      
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-sm">${pred.location}</h3>
          <p class="text-xs text-gray-600">${pred.description}</p>
          <p class="text-xs font-semibold mt-1">Potential: ${pred.predictedKW} kW</p>
          <p class="text-xs">Confidence: <span class="font-semibold">${pred.confidence}</span></p>
        </div>
      `);

      if (onPredictionClick) {
        marker.on('click', () => onPredictionClick(pred));
      }
    });

    // Add engineer markers
    engineers.forEach((eng) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="w-6 h-6 rounded-full bg-secondary shadow-md flex items-center justify-center text-white text-xs border-2 border-white">
              🔧
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([eng.lat, eng.lng], { icon }).addTo(map.current!);
      
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-sm">${eng.name}</h3>
          <p class="text-xs text-gray-600">${eng.location}</p>
          <p class="text-xs mt-1">${eng.skills.slice(0, 2).join(', ')}</p>
        </div>
      `);
    });

    // Fit bounds if we have predictions
    if (predictions.length > 0) {
      const bounds = L.latLngBounds(predictions.map(p => [p.lat, p.lng]));
      map.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
    }
  }, [predictions, engineers, onPredictionClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {predictions.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-card/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="text-muted-foreground">
              No predictions yet — create an opportunity to generate a prediction.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
