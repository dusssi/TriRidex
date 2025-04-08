import React from 'react';

const LookingForDriver = (props) => {
    return (
        <div className="bg-[#121212] text-white p-4 rounded-lg relative">
            <h5
                className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
                onClick={() => {
                    props.setVehicleFound(false)
                }}
            >
                <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className="relative">
                    <img
                        className='h-32 w-32 object-cover rounded-full animate-pulse brightness-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                        src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                        alt="Vehicle"
                    />
                    {/* Lightning shimmer effect */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-glow z-10"></div>
                </div>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b border-gray-700'>
                        <i className="ri-map-pin-user-fill text-green-400 text-xl"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-400'>{props.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b border-gray-700'>
                        <i className="text-lg ri-map-pin-2-fill text-red-400"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-400'>{props.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line text-yellow-300 text-xl"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-400'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom shimmer animation */}
            <style>
                {`
                @keyframes glow {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }

                .animate-glow {
                    animation: glow 2s linear infinite;
                }
                `}
            </style>
        </div>
    );
};

export default LookingForDriver;
