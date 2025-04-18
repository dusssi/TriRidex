import React from "react";

const RidePopUp = (props) => {
  const { ride, setRidePopupPanel, setConfirmRidePopupPanel } = props;
  console.log(ride);
  // Check if ride is null or undefined

  return (
    <div className="bg-white rounded-xl p-4 text-black">
      {/* Close Button */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-800 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Title */}
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

      {/* User Info */}
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt="user"
          />
          <h2 className="text-lg font-medium">
            {ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      {/* Ride Details */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 w-full">
          <button
            onClick={() => {
              setConfirmRidePopupPanel(true); // Open OTP popup
              props.confirmRide(); // Optional: inform backend
            }}
            className="bg-green-600 w-full text-white font-semibold p-2 rounded-lg"
          >
            Accept
          </button>

          <button
            onClick={() => setRidePopupPanel(false)}
            className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
