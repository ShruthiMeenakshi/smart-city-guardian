import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { mockHotspots, type Hotspot } from '@/lib/intelligenceData';
import { Flame, TrendingUp, TrendingDown, Minus, MapPin, Calendar } from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import { AlertTriangle, Zap } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const trendIcon = { rising: TrendingUp, falling: TrendingDown, stable: Minus };
const trendColor = { rising: 'text-destructive', falling: 'text-success', stable: 'text-muted-foreground' };

/* ---- pulse ring colour based on risk ---- */
function riskColor(score: number) {
  if (score >= 80) return { fill: '#ef4444', stroke: '#fca5a5' };
  if (score >= 60) return { fill: '#f59e0b', stroke: '#fcd34d' };
  return { fill: '#22c55e', stroke: '#86efac' };
}

/* ---- animated pulsing circle overlay per hotspot ---- */
function PulseMarker({ spot }: { spot: Hotspot }) {
  const map = useMap();
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { fill, stroke } = riskColor(spot.riskScore);
    const size = 30 + spot.riskScore * 0.4; // px logical diameter

    const icon = L.divIcon({
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      html: `
        <div style="position:relative;width:${size}px;height:${size}px;">
          <span style="
            position:absolute;inset:0;border-radius:50%;
            background:${fill}33;border:2px solid ${stroke};
            animation:hotspot-pulse 2s ease-in-out infinite;
          "></span>
          <span style="
            position:absolute;
            top:50%;left:50%;
            width:10px;height:10px;
            transform:translate(-50%,-50%);
            border-radius:50%;background:${fill};
            box-shadow:0 0 8px ${fill};
          "></span>
        </div>
      `,
    });

    const marker = L.marker([spot.lat, spot.lng], { icon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family:Inter,system-ui,sans-serif;min-width:180px">
        <strong style="font-size:13px">${spot.location}</strong><br/>
        <span style="font-size:11px;color:#888">Ward ${spot.wardId} · ${spot.wasteType}</span><br/>
        <span style="font-size:18px;font-weight:700;color:${fill}">${spot.riskScore}</span>
        <span style="font-size:10px;color:#888"> risk score</span><br/>
        <span style="font-size:10px;color:#888">Predicted: ${spot.predictedDate}</span>
      </div>
    `);

    return () => {
      marker.remove();
    };
  }, [map, spot]);

  return null;
}

/* ---- Fit map bounds to hotspot markers ---- */
function FitBounds({ spots }: { spots: Hotspot[] }) {
  const map = useMap();
  useEffect(() => {
    if (spots.length === 0) return;
    const bounds = L.latLngBounds(spots.map(s => [s.lat, s.lng]));
    map.fitBounds(bounds.pad(0.25));
  }, [map, spots]);
  return null;
}

export function PredictiveHotspots() {
  const critical = mockHotspots.filter(h => h.riskScore >= 80).length;
  const avgRisk = Math.round(mockHotspots.reduce((s, h) => s + h.riskScore, 0) / mockHotspots.length);
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);

  // Madurai centre
  const center: [number, number] = [9.9252, 78.1198];

  return (
    <div className="space-y-4">
      {/* ---- KPI row ---- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Hotspots" value={mockHotspots.length} icon={Flame} variant="warning" />
        <KPICard title="Critical (80+)" value={critical} icon={AlertTriangle} variant="destructive" />
        <KPICard title="Avg Risk Score" value={avgRisk} icon={Zap} variant="primary" />
        <KPICard title="Rising Trends" value={mockHotspots.filter(h => h.trend === 'rising').length} icon={TrendingUp} variant="info" />
      </div>

      {/* ---- Satellite Map ---- */}
      <div className="rounded-lg bg-card border border-border overflow-hidden card-glow">
        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
          <Flame className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            AI-Predicted Hotspots — Madurai Satellite View
          </h3>
        </div>

        {/* inject keyframes for pulse animation */}
        <style>{`
          @keyframes hotspot-pulse {
            0%, 100% { transform: scale(1); opacity: .85; }
            50%      { transform: scale(1.45); opacity: .35; }
          }
        `}</style>

        <div className="h-[420px] w-full relative z-0">
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
            style={{ background: '#1a1a2e' }}
          >
            {/* Esri Satellite — no API key needed */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri'
              maxZoom={19}
            />
            {/* Labels overlay so street names remain readable */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
            <FitBounds spots={mockHotspots} />
            {mockHotspots.map(spot => (
              <PulseMarker key={spot.id} spot={spot} />
            ))}
          </MapContainer>
        </div>
      </div>

      {/* ---- Hotspot detail cards (existing animations preserved) ---- */}
      <div className="rounded-lg bg-card border border-border p-5 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Hotspot Details</h3>
        </div>
        <div className="space-y-3">
          {mockHotspots.map((spot, i) => {
            const TIcon = trendIcon[spot.trend];
            return (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-md bg-muted/50 border border-border hover:border-warning/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">{spot.location}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono ml-5.5">Ward {spot.wardId} · {spot.wasteType}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold font-mono ${spot.riskScore >= 80 ? 'text-destructive' : spot.riskScore >= 60 ? 'text-warning' : 'text-success'}`}>
                      {spot.riskScore}
                    </span>
                    <div className={`flex items-center gap-1 text-[10px] ${trendColor[spot.trend]}`}>
                      <TIcon className="h-3 w-3" />
                      <span className="capitalize">{spot.trend}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${spot.riskScore}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${spot.riskScore >= 80 ? 'bg-destructive' : spot.riskScore >= 60 ? 'bg-warning' : 'bg-success'}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="font-mono">{spot.predictedDate}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
