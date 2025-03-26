import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between p-7">
      <div>
        <h1 className="text-3xl font-bold mb-10 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>TriRidex</h1>
        <form onSubmit={submitHandler}>
          <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-gray-800 w-1/2 rounded-lg px-4 py-2 border border-gray-600 text-lg placeholder-gray-400'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className='bg-gray-800 w-1/2 rounded-lg px-4 py-2 border border-gray-600 text-lg placeholder-gray-400'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-800 mb-7 rounded-lg px-4 py-2 border border-gray-600 w-full text-lg placeholder-gray-400'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-gray-800 mb-7 rounded-lg px-4 py-2 border border-gray-600 w-full text-lg placeholder-gray-400'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'>
            Create account
          </button>
        </form>
        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-400'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight text-gray-400'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSignup
