import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: ride?._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setConfirmRidePopupPanel(false);
                setRidePopupPanel(false);
                navigate('/captain-riding', { state: { ride } });
            }
        } catch (err) {
            setError('Failed to confirm ride. Please check OTP or try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => setRidePopupPanel(false)}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="User" />
                    <h2 className='text-lg font-medium capitalize'>{ride?.user?.fullname?.firstname || 'User'}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Pickup</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup || 'N/A'}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Destination</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{ride?.destination || 'N/A'}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="ri-currency-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{ride?.fare || 'N/A'}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                    </div>
                </div>
            </div>

            <div className='mt-6 w-full'>
                <form onSubmit={submitHandler}>
                    <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'
                        placeholder='Enter OTP'
                        required
                    />

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'
                        disabled={loading}
                    >
                        {loading ? 'Confirming...' : 'Confirm'}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setConfirmRidePopupPanel(false);
                            setRidePopupPanel(false);
                        }}
                        className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

// PropTypes for validation
ConfirmRidePopUp.propTypes = {
    ride: PropTypes.object.isRequired,
    setConfirmRidePopupPanel: PropTypes.func.isRequired,
    setRidePopupPanel: PropTypes.func.isRequired
};

export default ConfirmRidePopUp
