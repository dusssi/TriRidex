import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {

    const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

    return (
        <div className='bg-[#111827] text-white p-5 rounded-xl shadow-md'>
            <h5
                className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
                onClick={() => props.setFinishRidePanel(false)}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-bold mb-5'>Finish this Ride</h3>

            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg'>
                <div className='flex items-center gap-4'>
                    <img
                        className='h-20 w-20 rounded-full object-cover border-4 border-white animate-pulse shadow-md'
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                        alt=""
                    />
                    <h2 className='text-xl font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='mt-5 w-full'>
                <div className='flex items-center gap-5 p-3 border-b border-gray-600'>
                    <i className="ri-map-pin-user-fill text-yellow-300 text-xl"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm text-gray-400 -mt-1'>{props.ride?.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b border-gray-600'>
                    <i className="ri-map-pin-2-fill text-yellow-300 text-xl"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm text-gray-400 -mt-1'>{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="ri-currency-line text-yellow-300 text-xl"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>₹{props.ride?.fare}</h3>
                        <p className='text-sm text-gray-400 -mt-1'>Cash Cash</p>
                    </div>
                </div>
            </div>

            <div className='mt-8 w-full'>
                <button
                    onClick={endRide}
                    className='w-full bg-green-600 hover:bg-green-700 transition-all text-white font-semibold text-lg py-3 rounded-lg'
                >
                    Finish Ride
                </button>
            </div>
        </div>
    )
}

export default FinishRide
