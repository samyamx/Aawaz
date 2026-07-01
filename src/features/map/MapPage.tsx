import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const markers = [
  { id: 1, pos: [51.505, -0.09] as [number, number], title: "Pothole on Main St", status: "Submitted" },
  { id: 2, pos: [51.51, -0.1] as [number, number], title: "Broken Streetlight", status: "In Progress" },
  { id: 3, pos: [51.49, -0.08] as [number, number], title: "Water Leak", status: "Resolved" },
]

export function MapPage() {
  return (
    <div className="h-[calc(100vh-8rem)] w-full flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interactive Map</h1>
        <p className="text-muted-foreground mt-1">Explore reported issues across your community.</p>
      </div>
      <div className="flex-1 rounded-lg overflow-hidden border shadow-sm relative z-0">
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((m) => (
            <Marker key={m.id} position={m.pos}>
              <Popup>
                <div className="font-medium text-sm">{m.title}</div>
                <div className="text-xs text-muted-foreground mt-1">Status: {m.status}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
