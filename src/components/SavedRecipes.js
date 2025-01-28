import React, { useEffect, useState } from "react";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    // Retrieve saved recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(storedRecipes);
  }, []);

  const unsaveRecipe = (recipeId) => {
    // Remove recipe from state
    const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId);
    setSavedRecipes(updatedRecipes);

    // Update localStorage
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div>
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {savedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "15px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    margin: "0 0 10px",
                  }}
                >
                  {recipe.title}
                </h3>
                <p style={{ margin: "0 0 10px", color: "#555" }}>
                  {recipe.description || "No details available."}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button
                    onClick={() => console.log("View details of", recipe.title)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#88b04b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => unsaveRecipe(recipe.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Unsave
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
