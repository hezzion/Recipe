import React from "react";

const RecipeCard = ({ title, description, image }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        width: "300px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundColor: "white",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div style={{ padding: "15px" }}>
        <h3 style={{ margin: "10px 0", color: "#333" }}>{title}</h3>
        <p style={{ color: "#666", fontSize: "14px" }}>{description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;