import React from 'react';

const LookingForDriver = (props) => {
    return (
        <div className='bg-gray-900 text-white p-5 rounded-lg shadow-lg relative'>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false);
            }}>
                <i className='text-3xl text-gray-400 ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5 text-yellow-400'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20 rounded-md' src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg' alt='' />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
                        <i className='ri-map-pin-user-fill text-yellow-400'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-400'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
                        <i className='text-lg ri-map-pin-2-fill text-yellow-400'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-400'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='ri-currency-line text-green-400'></i>
                        <div>
                            <h3 className='text-lg font-medium text-green-400'>₹{props.fare[props.vehicleType]} </h3>
                            <p className='text-sm -mt-1 text-gray-400 flex items-center gap-2'>
                                <i className='ri-money-dollar-circle-fill text-green-500'></i> Cash Payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LookingForDriver
