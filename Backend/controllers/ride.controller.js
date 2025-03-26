const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

// Helper function for request validation
const validateRequest = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return null;
};

module.exports.createRide = async (req, res) => {
    const validationError = validateRequest(req, res);
    if (validationError) return validationError;

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        // Get coordinates of the pickup location
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        // Get nearby captains
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.lat, 
            pickupCoordinates.lng, 
            2
        );

        // Populate ride details with user information
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        // Notify captains
        captainsInRadius.forEach(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });

    } catch (err) {
        console.error("Error creating ride:", err);
        return res.status(500).json({ message: "Failed to create ride", error: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    const validationError = validateRequest(req, res);
    if (validationError) return validationError;

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        console.error("Error fetching fare:", err);
        return res.status(500).json({ message: "Failed to fetch fare", error: err.message });
    }
};

module.exports.confirmRide = async (req, res) => {
    const validationError = validateRequest(req, res);
    if (validationError) return validationError;

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        // Notify user
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error confirming ride:", err);
        return res.status(500).json({ message: "Failed to confirm ride", error: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const validationError = validateRequest(req, res);
    if (validationError) return validationError;

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        // Notify user
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error starting ride:", err);
        return res.status(500).json({ message: "Failed to start ride", error: err.message });
    }
};

module.exports.endRide = async (req, res) => {
    const validationError = validateRequest(req, res);
    if (validationError) return validationError;

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        // Notify user
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error ending ride:", err);
        return res.status(500).json({ message: "Failed to end ride", error: err.message });
    }
};
