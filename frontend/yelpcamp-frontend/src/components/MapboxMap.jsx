import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapboxMap.css'; // Optional: create a CSS file for styling

mapboxgl.accessToken = MAPBOX_TOKEN; // Replace with your access token

const MapboxMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Reference to the map container
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-74.5, 40], // Starting position [lng, lat]
      zoom: 9, // Starting zoom level
    });

    // Optional: Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Optional: Clean up on unmount
    return () => map.current.remove();
  }, []);

  return <div ref={mapContainer} className="map-container" />;
};

export default MapboxMap;
