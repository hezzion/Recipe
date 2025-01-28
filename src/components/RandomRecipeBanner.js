import React from "react";

const RandomRecipeBanner = () => {
  return (
    <div
      style={{
        margin: "20px auto",
        width: "100%",
        height: "250px",
        backgroundImage: "url('/banner.jpg')", // Add your banner image
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

export default RandomRecipeBanner;