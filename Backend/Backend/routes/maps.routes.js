const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

/**
 * Get user's current location (based on IP address).
 */
router.get('/get-user-location',
    authMiddleware.authUser,
    mapController.getUserLocation
);

/**
 * Get coordinates (latitude, longitude) from an address.
 */
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);

/**
 * Get address from latitude & longitude (Set destination on the map).
 */
router.get('/get-address-from-coordinates',
    query('lat').isFloat(),
    query('lng').isFloat(),
    authMiddleware.authUser,
    mapController.getAddressFromCoordinates
);

/**
 * Get distance & time between two locations.
 */
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
);

/**
 * Get autocomplete suggestions for locations.
 */
router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
);

/**
 * Get captains (drivers) within a given radius.
 */
router.get('/get-captains-in-radius',
    query('lat').isFloat(),
    query('lng').isFloat(),
    query('radius').isFloat({ min: 1 }), // Minimum 1 km radius
    authMiddleware.authUser,
    mapController.getCaptainsInTheRadius
);

module.exports = router;
