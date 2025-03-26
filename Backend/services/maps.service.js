const axios = require('axios');
const captainModel = require('../models/captain.model');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;

/**
 * Get user's current location based on IP address.
 */
module.exports.getUserLocation = async () => {
    try {
        console.log("[INFO] Fetching user's current location based on IP.");
        const response = await axios.get("https://ipinfo.io/json");
        const { loc } = response.data; // loc format: "latitude,longitude"
        if (!loc) throw new Error("Could not retrieve location from IP.");

        const [lat, lng] = loc.split(",").map(Number);
        return { lat, lng };
    } catch (error) {
        console.error("[ERROR] Failed to fetch user location:", error.message);
        throw new Error("Unable to detect location.");
    }
};

/**
 * Get coordinates from an address using Google Geocoding API.
 */
module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error("Address is required");

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        console.log(`[INFO] Fetching coordinates for address: ${address}`);
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== 'OK' || !data.results.length) {
            console.warn(`[WARNING] No coordinates found for ${address}`);
            throw new Error("Unable to fetch coordinates");
        }

        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
    } catch (error) {
        console.error(`[ERROR] Failed to fetch coordinates: ${error.message}`);
        throw new Error("Unable to fetch coordinates. Please try again.");
    }
};

/**
 * Convert latitude & longitude to an address using Google Geocoding API.
 */
module.exports.getAddressFromCoordinates = async (lat, lng) => {
    if (!lat || !lng) throw new Error("Latitude and longitude are required");

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        console.log(`[INFO] Fetching address for coordinates: (${lat}, ${lng})`);
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== "OK" || !data.results.length) {
            console.warn(`[WARNING] No address found for (${lat}, ${lng})`);
            throw new Error("Unable to fetch address.");
        }

        return data.results[0].formatted_address;
    } catch (error) {
        console.error(`[ERROR] Failed to fetch address: ${error.message}`);
        throw new Error("Unable to fetch address. Please try again.");
    }
};

/**
 * Get distance and time between two locations using Google Distance Matrix API.
 */
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) throw new Error("Origin and destination are required");

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        console.log(`[INFO] Requesting distance & time from ${origin} to ${destination}`);
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== "OK") {
            console.warn(`[WARNING] Google API Error: ${data.status}`, data);
            throw new Error(`Google Maps API error: ${data.status}`);
        }

        const element = data.rows[0].elements[0];

        if (element.status === "ZERO_RESULTS") {
            console.warn(`[WARNING] No routes found from ${origin} to ${destination}`);
            return { message: "No routes available between these locations." };
        }

        return {
            distance: element.distance.text,
            duration: element.duration.text,
            distanceValue: element.distance.value, // in meters
            durationValue: element.duration.value  // in seconds
        };

    } catch (err) {
        console.error(`[ERROR] Failed to fetch distance & time: ${err.message}`);
        throw new Error("Unable to fetch distance and time. Please try again.");
    }
};

/**
 * Get autocomplete location suggestions from Google Places API.
 */
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) throw new Error("Search input is required");

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        console.log(`[INFO] Fetching autocomplete suggestions for: ${input}`);
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== "OK") {
            console.warn(`[WARNING] No suggestions found for input: ${input}`);
            throw new Error("Unable to fetch suggestions");
        }

        return data.predictions.map(prediction => prediction.description);
    } catch (err) {
        console.error(`[ERROR] Failed to fetch suggestions: ${err.message}`);
        throw new Error("Unable to fetch suggestions. Please try again.");
    }
};

/**
 * Get captains (drivers) within a given radius.
 */
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    if (!lat || !lng || !radius) throw new Error("Latitude, longitude, and radius are required");

    try {
        console.log(`[INFO] Finding captains within ${radius} km of (${lat}, ${lng})`);

        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lat, lng], radius / 6371] // Earth's radius in km
                }
            }
        });

        return captains;
    } catch (error) {
        console.error(`[ERROR] Failed to fetch captains: ${error.message}`);
        throw new Error("Unable to fetch nearby captains. Please try again.");
    }
};
