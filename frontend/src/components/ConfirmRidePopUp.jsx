import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    // 🚗 Handle OTP form submit
    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: props.ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)

                // ✅ Navigate to Riding Page with ride data
                navigate('/captain-riding', { state: { ride: props.ride } })
            }
        } catch (error) {
            console.error("Ride confirmation failed:", error)
            alert("Invalid OTP or server error. Please try again.")
        }
    }

    return (
        <div className='bg-[#1a1a1a] text-white rounded-xl p-4'>
            {/* Close Button */}
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => props.setRidePopupPanel(false)}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Header */}
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

            {/* Rider Info */}
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-4'>
                    <img
                        className='h-20 w-20 rounded-full object-cover animate-pulse border-2 border-white shadow-lg'
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                        alt="Rider"
                    />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            {/* Ride Info */}
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b border-gray-600'>
                        <i className="ri-map-pin-user-fill text-white"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-400'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b border-gray-600'>
                        <i className="text-lg ri-map-pin-2-fill text-white"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-400'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line text-white"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-400'>Cash</p>
                        </div>
                    </div>
                </div>

                {/* OTP Form */}
                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            className='bg-[#333] text-white px-6 py-4 font-mono text-lg rounded-lg w-full mt-3 placeholder-gray-400'
                            placeholder='Enter OTP'
                        />

                        <button
                            type="submit"
                            className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'
                        >
                            Confirm
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false)
                                props.setRidePopupPanel(false)
                            }}
                            className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp
