const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'ride-service.log' })
    ]
});

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = { auto: 30, car: 50, moto: 20 };
    const perKmRate = { auto: 10, car: 15, moto: 8 };
    const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}

module.exports.getFare = getFare;

function generateOtp(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

async function createRide({ user, pickup, destination, vehicleType }) {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
    
    const fare = await getFare(pickup, destination);
    const otp = generateOtp(6);
    
    try {
        const ride = await rideModel.create({ user, pickup, destination, otp, fare: fare[vehicleType], status: 'pending' });
        logger.info('Ride created successfully', { rideId: ride._id });
        return ride;
    } catch (error) {
        logger.error('Error creating ride', { error });
        throw new Error('Failed to create ride');
    }
}

async function confirmRide({ rideId, captain }) {
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    
    const ride = await rideModel.findByIdAndUpdate(rideId, { status: 'accepted', captain: captain._id }, { new: true }).populate('user').populate('captain').select('+otp');
    
    if (!ride) {
        throw new Error('Ride not found');
    }
    
    return ride;
}

async function startRide({ rideId, otp, captain }) {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }
    
    ride.status = 'ongoing';
    await ride.save();
    
    return ride;
}

async function endRide({ rideId, captain }) {
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    
    const ride = await rideModel.findOneAndUpdate({ _id: rideId, captain: captain._id }, { status: 'completed' }, { new: true }).populate('user').populate('captain').select('+otp');
    
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }
    
    return ride;
}

module.exports = { createRide, confirmRide, startRide, endRide };
