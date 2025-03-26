const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

/**
 * Get user's current location based on IP address.
 */
module.exports.getUserLocation = async (req, res) => {
    try {
        const userIp = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const location = await mapService.getUserLocation(userIp);
        res.status(200).json(location);
    } catch (error) {
        console.error(`[ERROR] Unable to get user location: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch user location' });
    }
};

/**
 * Get coordinates (latitude, longitude) from an address.
 */
module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

/**
 * Get address from latitude & longitude.
 */
module.exports.getAddressFromCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { lat, lng } = req.query;

    try {
        const address = await mapService.getAddressFromCoordinates(lat, lng);
        res.status(200).json({ address });
    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
        res.status(404).json({ message: 'Address not found' });
    }
};

/**
 * Get distance & time between two locations.
 */
module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error(`[ERROR] ${err.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get autocomplete suggestions for locations.
 */
module.exports.getAutoCompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (err) {
        console.error(`[ERROR] ${err.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get captains (drivers) within a given radius.
 */
module.exports.getCaptainsInTheRadius = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { lat, lng, radius } = req.query;

    try {
        const captains = await mapService.getCaptainsInTheRadius(lat, lng, radius);
        res.status(200).json(captains);
    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};
