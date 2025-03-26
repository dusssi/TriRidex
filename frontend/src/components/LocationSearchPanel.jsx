import React, { memo } from "react";

const LocationSearchPanel = ({
    suggestions = [],
    setVehiclePanel,
    setPanelOpen,
    setPickup,
    setDestination,
    activeField
}) => {

    const handleSuggestionClick = (suggestion) => {
        if (!suggestion) return; // Prevent setting empty values

        if (activeField === "pickup") {
            setPickup(suggestion);
        } else if (activeField === "destination") {
            setDestination(suggestion);
        }

        setPanelOpen(false);
        setVehiclePanel(true);
    };

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
            {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex gap-4 border-2 p-3 border-gray-700 active:border-gray-400 rounded-xl items-center my-2 cursor-pointer hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
                        role="option"
                        aria-label={`Select location: ${suggestion}`}
                    >
                        <span className="bg-gray-700 h-8 flex items-center justify-center w-12 rounded-full text-white">
                            <i className="ri-map-pin-fill"></i>
                        </span>
                        <span className="font-medium">{suggestion}</span>
                    </button>
                ))
            ) : (
                <p className="text-gray-400 text-center">No suggestions found</p>
            )}
        </div>
    );
};

export default memo(LocationSearchPanel);
