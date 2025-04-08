import React from 'react'
import { Link } from 'react-router-dom'
import bgImage from '../assets/bg_img.jpg' // Make sure this path is correct!

const Start = () => {
  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@700&display=swap" rel="stylesheet" />

      <div
        className='bg-cover bg-center bg-no-repeat h-screen pt-8 flex justify-between flex-col w-full'
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* TriRidex Logo */}
        <div className="ml-8 mt-4">
          <div className="w-20 h-20 bg-white border border-gray-300 rounded-xl flex items-center justify-center shadow">
            <span className="text-black font-[Urbanist] text-[16px] tracking-wide">TriRidex</span>
          </div>
        </div>

        {/* Content Section */}
        <div className='bg-white pb-8 py-4 px-4 rounded-t-3xl shadow-md'>
          <h2 className='text-[30px] font-semibold font-[Urbanist]'>Get Started with TriRidex</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5 font-[Urbanist]'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
