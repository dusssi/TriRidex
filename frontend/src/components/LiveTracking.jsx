import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const defaultCenter = {
    lat: 28.6139,
    lng: 77.2090,
};

const LiveTracking = ({ pickup, destination }) => {
    const [captainPosition, setCaptainPosition] = useState(defaultCenter);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        const updatePosition = (position) => {
            const { latitude, longitude } = position.coords;
            setCaptainPosition({
                lat: latitude,
                lng: longitude
            });
        };

        const errorHandler = (error) => {
            console.error('Geolocation error:', error);
        };

        const watchId = navigator.geolocation.watchPosition(updatePosition, errorHandler);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onLoad={() => setMapLoaded(true)}
        >
            {mapLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={captainPosition}
                    zoom={15}
                    options={{ disableDefaultUI: true }}
                >
                    {/* Captain's live position */}
                    <Marker position={captainPosition} label="C" />

                    {/* Pickup marker */}
                    {pickup && (
                        <Marker
                            position={pickup}
                            icon={{
                                url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                            }}
                            label="P"
                        />
                    )}

                    {/* Destination marker */}
                    {destination && (
                        <Marker
                            position={destination}
                            icon={{
                                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                            }}
                            label="D"
                        />
                    )}

                    {/* Route Polyline */}
                    {pickup && destination && (
                        <Polyline
                            path={[pickup, destination]}
                            options={{
                                strokeColor: '#FFA500',
                                strokeOpacity: 0.8,
                                strokeWeight: 4,
                            }}
                        />
                    )}
                </GoogleMap>
            )}
        </LoadScript>
    );
};

export default LiveTracking;
