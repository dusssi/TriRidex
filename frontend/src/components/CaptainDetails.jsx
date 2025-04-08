import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)

    return (
        <div className="bg-[#121212] text-white p-4 rounded-xl shadow-lg">
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                    <img
                        className='h-14 w-14 rounded-full object-cover border-2 border-gray-600'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
                        alt="Captain"
                    />
                    <h4 className='text-xl font-semibold capitalize'>
                        {captain.fullname.firstname + " " + captain.fullname.lastname}
                    </h4>
                </div>
                <div className='text-right'>
                    <h4 className='text-2xl font-bold text-green-400'>₹295.20</h4>
                    <p className='text-sm text-gray-400'>Earned</p>
                </div>
            </div>

            <div className='flex p-4 bg-[#1f1f1f] rounded-xl justify-around items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 ri-timer-2-line text-blue-400"></i>
                    <h5 className='text-lg font-semibold'>10.2</h5>
                    <p className='text-sm text-gray-400'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 ri-speed-up-line text-yellow-400"></i>
                    <h5 className='text-lg font-semibold'>42</h5>
                    <p className='text-sm text-gray-400'>Rides Completed</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 ri-booklet-line text-pink-400"></i>
                    <h5 className='text-lg font-semibold'>4.8</h5>
                    <p className='text-sm text-gray-400'>Rating</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
