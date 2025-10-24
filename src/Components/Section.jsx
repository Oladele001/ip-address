import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Section = () => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_2VwRfEuEjfvV2aEz03jv3EomzddwX&ipAddress=8.8.8.8"
      )
      .then((response) => {
        console.log("API response:", response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const center = posts?.location?.lat
    ? [posts.location.lat, posts.location.lng]
    : [51.505, -0.09];

  return (
    <div className="w-full h-screen bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p>Loading map...</p>
        </div>
      ) : (
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100vh", width: "100vw" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {posts.location && (
            <Marker position={[posts.location.lat, posts.location.lng]}>
              <Popup>
                <strong>IP Address:</strong> {posts.ip} <br />
                <strong>City:</strong> {posts.location.city} <br />
                <strong>Country:</strong> {posts.location.country}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default Section;
