import React, { useEffect, useState } from 'react';

const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel, selectVehicle, pickup, destination }) => {
    const [fares, setFares] = useState({ car: 0, moto: 0, auto: 0 });
    const [times, setTimes] = useState({ car: 0, moto: 0, auto: 0 });

    // Function to estimate distance (dummy function, replace with real distance API)
    const calculateDistance = () => {
        if (!pickup || !destination) return 0;
        return Math.random() * 10 + 2; // Random distance between 2-12 km
    };

    useEffect(() => {
        const distance = calculateDistance();

        // Fare per km for different vehicles
        const rates = { car: 15, moto: 10, auto: 12 };

        setFares({
            car: (distance * rates.car).toFixed(2),
            moto: (distance * rates.moto).toFixed(2),
            auto: (distance * rates.auto).toFixed(2),
        });

        // Estimated time based on avg speed (Car: 40 km/h, Moto: 50 km/h, Auto: 30 km/h)
        setTimes({
            car: Math.ceil((distance / 40) * 60),
            moto: Math.ceil((distance / 50) * 60),
            auto: Math.ceil((distance / 30) * 60),
        });
    }, [pickup, destination]);

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
            <h5 className="p-1 text-center w-[93%] absolute top-2 cursor-pointer" onClick={() => setVehiclePanel(false)}>
                <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5 text-center">Choose a Vehicle</h3>

            {/* SedanGO Option */}
            <div 
                onClick={() => { setConfirmRidePanel(true); selectVehicle('car'); }} 
                className="flex border-2 border-gray-700 active:border-gray-400 hover:bg-gray-800 cursor-pointer mb-2 rounded-xl w-full p-3 items-center justify-between transition-all"
            >
                <img className="h-10 rounded-lg" src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="SedanGO" />
                <div className="ml-2 w-1/2">
                    <h4 className="font-medium text-base">
                        SedanGO <span className="ml-1 text-gray-400"><i className="ri-user-3-fill"></i> 4</span>
                    </h4>
                    <h5 className="font-medium text-sm text-gray-400">{times.car} mins away</h5>
                    <p className="font-normal text-xs text-gray-500">Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{fares.car}</h2>
            </div>

            {/* Moto Option */}
            <div 
                onClick={() => { setConfirmRidePanel(true); selectVehicle('moto'); }} 
                className="flex border-2 border-gray-700 active:border-gray-400 hover:bg-gray-800 cursor-pointer mb-2 rounded-xl w-full p-3 items-center justify-between transition-all"
            >
                <img className="h-10 rounded-lg" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
                <div className="ml-2 w-1/2">
                    <h4 className="font-medium text-base">
                        Moto <span className="ml-1 text-gray-400"><i className="ri-user-3-fill"></i> 1</span>
                    </h4>
                    <h5 className="font-medium text-sm text-gray-400">{times.moto} mins away</h5>
                    <p className="font-normal text-xs text-gray-500">Affordable motorcycle rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{fares.moto}</h2>
            </div>

            {/* TriAuto Option */}
            <div 
                onClick={() => { setConfirmRidePanel(true); selectVehicle('auto'); }} 
                className="flex border-2 border-gray-700 active:border-gray-400 hover:bg-gray-800 cursor-pointer mb-2 rounded-xl w-full p-3 items-center justify-between transition-all"
            >
                <img className="h-10 rounded-lg" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="TriAuto" />
                <div className="ml-2 w-1/2">
                    <h4 className="font-medium text-base">
                        TriAuto <span className="ml-1 text-gray-400"><i className="ri-user-3-fill"></i> 3</span>
                    </h4>
                    <h5 className="font-medium text-sm text-gray-400">{times.auto} mins away</h5>
                    <p className="font-normal text-xs text-gray-500">Affordable Auto rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{fares.auto}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
