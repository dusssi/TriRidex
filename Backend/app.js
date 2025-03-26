require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

// Connect to MongoDB
connectToDb();

const app = express();

// 🔹 Improved CORS Configuration
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL], // Change frontend URL if deployed
    credentials: true, // Allow cookies if needed
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Test API Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

// ✅ Routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app;
