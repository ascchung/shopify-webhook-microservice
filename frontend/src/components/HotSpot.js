import React from "react";

const HotSpot = ({ top, left, product }) => {
  const handleClick = () => {
    window.location.href = `/products/${product.handle}`;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
        cursor: "pointer",
      }}
      onClick={handleClick}
    />
  );
};

export default HotSpot;
