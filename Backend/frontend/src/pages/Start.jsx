import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import carImage from '../assets/download.png';  // Adjust the path based on your project structure
// Using uploaded car image
import carSound from '../assets/car.wav';

const Start = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Load Google Font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Auto-play sound on user interaction
    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;  // Adjust volume
        audioRef.current.play().catch(error => console.log("Autoplay blocked:", error));
      }
    };

    document.addEventListener("click", playSound);

    return () => {
      document.removeEventListener("click", playSound);
    };
  }, []);

  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full overflow-hidden'>

        {/* Logo */}
        <h1 
          className='ml-8 text-4xl font-bold text-white'
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          TriRidex
        </h1>

        {/* Moving Car Image */}
        <div className="absolute bottom-16 left-0 w-full flex justify-center">
          <img 
            src={carImage}  
            alt="Car"
            className="w-48 md:w-64 animate-carMove opacity-50" // Adjust transparency
          />
        </div>

        {/* Car Sound */}
        <audio ref={audioRef} src={carSound} loop />

        <div className='bg-white pb-8 py-4 px-4'>
          <h2 className='text-[30px] font-semibold'>Get Started with TriRidex</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>
            Continue
          </Link>
        </div>
      </div>

      {/* Car Movement Animation */}
      <style>
        {`
          @keyframes carMove {
            0% { transform: translateX(-150px) scale(0.9); opacity: 0.8; }
            50% { transform: translateX(50vw) scale(1); opacity: 0.9; }
            100% { transform: translateX(100vw) scale(0.9); opacity: 0.8; }
          }

          .animate-carMove {
            animation: carMove 6s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Start;
