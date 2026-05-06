'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useMemo } from 'react';

type Props = {
  lat: number;
  lng: number;
  label?: string;
  zoom?: number;
  height?: number | string;
};

const DARK_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1a1815' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1815' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#a8a4a0' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0b0a09' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#312e2b' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#787470' }] },
];

export default function MapView({ lat, lng, label, zoom = 14, height = 420 }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const { isLoaded } = useJsApiLoader({ id: 'gmaps', googleMapsApiKey: apiKey });
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  // Without a key the SDK will fail to load. Render a simple link fallback
  // so detail pages still convey the location.
  if (!apiKey) {
    return (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center border border-ink-200 bg-ink-50 text-sm text-ink-500 hover:text-gold-600 transition-colors"
        style={{ height }}
      >
        View on Google Maps →
      </a>
    );
  }
  if (!isLoaded) {
    return <div className="bg-ink-100 animate-pulse" style={{ height }} aria-hidden />;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height }}
      center={center}
      zoom={zoom}
      options={{
        styles: DARK_STYLE,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'cooperative',
      }}
    >
      <Marker position={center} label={label} />
    </GoogleMap>
  );
}
