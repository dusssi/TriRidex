import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className='min-h-screen flex flex-col justify-between bg-gray-900 text-white p-5'>
      <div className='max-w-lg mx-auto w-full'>
        <div className='flex justify-center mb-4'>
          <h1 className='text-3xl font-bold text-blue-500 flex items-center'>
            TriRidex <span className='ml-2'>&#8594;</span>
          </h1>
        </div>

        <form onSubmit={submitHandler} className='space-y-4'>
          <h3 className='text-lg font-medium'>What's our Captain's name?</h3>
          <div className='flex flex-col sm:flex-row gap-4'>
            <input required className='bg-gray-800 w-full sm:w-1/2 rounded-lg px-4 py-2 border border-gray-700' type='text' placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input required className='bg-gray-800 w-full sm:w-1/2 rounded-lg px-4 py-2 border border-gray-700' type='text' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <h3 className='text-lg font-medium'>What's our Captain's email?</h3>
          <input required className='bg-gray-800 w-full rounded-lg px-4 py-2 border border-gray-700' type='email' placeholder='email@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />

          <h3 className='text-lg font-medium'>Enter Password</h3>
          <input required className='bg-gray-800 w-full rounded-lg px-4 py-2 border border-gray-700' type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <h3 className='text-lg font-medium'>Vehicle Information</h3>
          <div className='flex flex-col sm:flex-row gap-4'>
            <input required className='bg-gray-800 w-full sm:w-1/2 rounded-lg px-4 py-2 border border-gray-700' type='text' placeholder='Vehicle Color' value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
            <input required className='bg-gray-800 w-full sm:w-1/2 rounded-lg px-4 py-2 border border-gray-700' type='text' placeholder='Vehicle Plate' value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
          </div>
          <div className='flex flex-col sm:flex-row gap-4'>
            <input required className='bg-gray-800 w-full sm:w-1/2 rounded-lg px-4 py-2 border border-gray-700' type='number' placeholder='Vehicle Capacity' value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} />
            <select required className='bg-gray-800 w-full sm:w-1/2 rounded-lg px-4 py-2 border border-gray-700' value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value='' disabled>Select Vehicle Type</option>
              <option value='car'>Car</option>
              <option value='auto'>Auto</option>
              <option value='moto'>Moto</option>
            </select>
          </div>

          <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 w-full text-lg'>Create Captain Account</button>
        </form>

        <p className='text-center mt-4'>Already have an account? <Link to='/captain-login' className='text-blue-400'>Login here</Link></p>
      </div>

      <div className='text-center text-xs text-gray-400 mt-6'>
        <p>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
