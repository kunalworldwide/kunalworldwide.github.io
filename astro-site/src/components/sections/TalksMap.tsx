import { useEffect, useState } from 'react';

interface Talk {
  id: string;
  title: string;
  date: string;
  location: string;
}

interface TalksMapProps {
  talks: Talk[];
  onLocationClick: (location: string) => void;
  selectedLocation: string;
}

// Location coordinates
const locationCoords: Record<string, { lat: number; lng: number; name: string }> = {
  // India
  'bengaluru': { lat: 12.9716, lng: 77.5946, name: 'Bengaluru' },
  'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bengaluru' },
  'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
  'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
  'delhi': { lat: 28.6139, lng: 77.2090, name: 'Delhi' },
  'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad' },
  'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
  'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune' },
  'kochi': { lat: 9.9312, lng: 76.2673, name: 'Kochi' },
  'thiruvananthapuram': { lat: 8.5241, lng: 76.9366, name: 'Thiruvananthapuram' },
  'kerala': { lat: 10.8505, lng: 76.2711, name: 'Kerala' },
  // International
  'singapore': { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  'london': { lat: 51.5074, lng: -0.1278, name: 'London' },
  'uk': { lat: 51.5074, lng: -0.1278, name: 'UK' },
  'united kingdom': { lat: 51.5074, lng: -0.1278, name: 'UK' },
  'dubai': { lat: 25.2048, lng: 55.2708, name: 'Dubai' },
  'new york': { lat: 40.7128, lng: -74.0060, name: 'New York' },
  'san francisco': { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
  'tokyo': { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
  'sydney': { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
  'berlin': { lat: 52.5200, lng: 13.4050, name: 'Berlin' },
  'amsterdam': { lat: 52.3676, lng: 4.9041, name: 'Amsterdam' },
  'paris': { lat: 48.8566, lng: 2.3522, name: 'Paris' },
};

function getCoords(location: string): { lat: number; lng: number; name: string } | null {
  const normalized = location.toLowerCase();

  if (normalized.includes('virtual') || normalized.includes('online')) {
    return null;
  }

  for (const [key, coords] of Object.entries(locationCoords)) {
    if (normalized.includes(key)) {
      return coords;
    }
  }

  if (normalized.includes('india')) {
    return { lat: 20.5937, lng: 78.9629, name: 'India' };
  }

  return null;
}

export default function TalksMap({ talks, onLocationClick, selectedLocation }: TalksMapProps) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Group talks by location
  const locationGroups = talks.reduce((acc, talk) => {
    const coords = getCoords(talk.location);
    if (coords) {
      const key = coords.name;
      if (!acc[key]) {
        acc[key] = { coords, count: 0, talks: [], displayName: coords.name };
      }
      acc[key].count++;
      acc[key].talks.push(talk);
    }
    return acc;
  }, {} as Record<string, { coords: { lat: number; lng: number }; count: number; talks: Talk[]; displayName: string }>);

  useEffect(() => {
    setIsClient(true);

    // Dynamically import Leaflet components
    const loadMap = async () => {
      try {
        const L = await import('leaflet');
        const RL = await import('react-leaflet');

        // Fix default marker icon
        delete (L.default.Icon.Default.prototype as any)._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        // Create the map component
        const MapWrapper = () => {
          const createCustomIcon = (count: number, isHighlighted: boolean) => {
            const size = Math.min(44, 28 + count * 4);
            return L.default.divIcon({
              className: 'custom-marker',
              html: `
                <div style="
                  width: ${size}px;
                  height: ${size}px;
                  background: linear-gradient(135deg, ${isHighlighted ? '#f59e0b' : '#14b8a6'}, ${isHighlighted ? '#d97706' : '#0d9488'});
                  border: 3px solid white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: ${Math.max(12, size / 2.5)}px;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                  cursor: pointer;
                ">
                  ${count}
                </div>
              `,
              iconSize: [size, size],
              iconAnchor: [size / 2, size / 2],
            });
          };

          return (
            <RL.MapContainer
              center={[20, 78]}
              zoom={4}
              style={{ height: '100%', width: '100%', background: '#1e293b', minHeight: '400px' }}
              scrollWheelZoom={true}
            >
              <RL.TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {Object.entries(locationGroups).map(([cityName, data]) => (
                <RL.Marker
                  key={cityName}
                  position={[data.coords.lat, data.coords.lng]}
                  icon={createCustomIcon(data.count, selectedLocation.toLowerCase().includes(cityName.toLowerCase()))}
                  eventHandlers={{
                    click: () => onLocationClick(data.talks[0]?.location || cityName),
                  }}
                >
                  <RL.Popup>
                    <div style={{ minWidth: '200px', padding: '4px' }}>
                      <h4 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>{data.displayName}</h4>
                      <p style={{ color: '#0d9488', fontWeight: '600', marginBottom: '8px' }}>{data.count} talk{data.count > 1 ? 's' : ''}</p>
                      <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
                        {data.talks.slice(0, 3).map(talk => (
                          <div key={talk.id} style={{ fontSize: '12px', borderLeft: '2px solid #0d9488', paddingLeft: '8px', marginBottom: '8px' }}>
                            <p style={{ fontWeight: '500' }}>{talk.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </RL.Popup>
                </RL.Marker>
              ))}
            </RL.MapContainer>
          );
        };

        setMapComponent(() => MapWrapper);
      } catch (error) {
        console.error('Failed to load map:', error);
      }
    };

    loadMap();
  }, [talks, selectedLocation, onLocationClick]);

  // Loading state
  if (!isClient || !MapComponent) {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 overflow-hidden mb-8">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-slate-400">Loading map...</div>
            </div>
          </div>
          <div className="lg:w-64 p-6 border-t lg:border-t-0 lg:border-l border-slate-700 bg-slate-800/50">
            <h4 className="text-white font-bold mb-4">Statistics</h4>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
                <div className="text-3xl font-bold text-teal-400">{talks.length}</div>
                <div className="text-slate-400 text-sm">Total Talks</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
                <div className="text-3xl font-bold text-purple-400">{Object.keys(locationGroups).length}</div>
                <div className="text-slate-400 text-sm">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 overflow-hidden mb-8">
      <div className="flex flex-col lg:flex-row">
        {/* Map */}
        <div className="flex-1 h-[400px] lg:h-[500px]">
          <MapComponent />
        </div>

        {/* Sidebar */}
        <div className="lg:w-64 p-6 border-t lg:border-t-0 lg:border-l border-slate-700 bg-slate-800/50">
          <h4 className="text-white font-bold mb-4">Statistics</h4>
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
              <div className="text-3xl font-bold text-teal-400">{talks.length}</div>
              <div className="text-slate-400 text-sm">Total Talks</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400">{Object.keys(locationGroups).length}</div>
              <div className="text-slate-400 text-sm">Cities</div>
            </div>
          </div>

          <h4 className="text-white font-bold mb-3">Cities</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {Object.entries(locationGroups)
              .sort((a, b) => b[1].count - a[1].count)
              .map(([cityName, data]) => (
                <button
                  key={cityName}
                  onClick={() => onLocationClick(data.talks[0]?.location || cityName)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-left"
                >
                  <span className="text-slate-300 text-sm">{data.displayName}</span>
                  <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded text-xs font-bold">
                    {data.count}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
