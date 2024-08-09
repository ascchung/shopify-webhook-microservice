import React, { useState } from "react";
import { Page } from "@shopify/polaris";
import "./styles/HomePage.css";

function HomePage() {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
  };

  const closePopup = () => {
    setSelectedHotspot(null);
  };

  const HotspotIcon = () => (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M7.5 4V11M4 7.5H11M7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5Z"
          stroke="#FFFFFF"
        ></path>
      </g>
    </svg>
  );

  return (
    <div className="homepage-container">
      <div className="background-image">
        <div
          className="hotspot"
          style={{ top: "30%", left: "40%" }}
          onClick={() => handleHotspotClick("Product 1")}
        >
          <HotspotIcon />
        </div>
        <div
          className="hotspot"
          style={{ top: "50%", left: "60%" }}
          onClick={() => handleHotspotClick("Product 2")}
        >
          <HotspotIcon />
        </div>
        {selectedHotspot && (
          <div className="popup-card">
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
            <h3>{selectedHotspot}</h3>
            <p>This is the product description for {selectedHotspot}.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
