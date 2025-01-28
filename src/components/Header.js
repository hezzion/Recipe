import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Header = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // State for toggle menu

  const fetchRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=7fb19f241fdd4030903dc4ebc5a9899a`
      );
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();
      setRecipes(data.results || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=7fb19f241fdd4030903dc4ebc5a9899a`
      );
      if (!response.ok) throw new Error("Failed to fetch recipe details");
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (err) {
      console.error("Error fetching recipe details:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") fetchRecipes();
  };

  const saveRecipe = (recipe) => {
    setSavedRecipes((prevRecipes) => {
      // Check if recipe is already saved to avoid duplicates
      if (!prevRecipes.some((saved) => saved.id === recipe.id)) {
        const updatedRecipes = [...prevRecipes, recipe];

        // Save to state and localStorage
        localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
        return updatedRecipes;
      }
      return prevRecipes;
    });
  };

  const unsaveRecipe = (id) => {
    setSavedRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  const closeModal = () => setSelectedRecipe(null);

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);

  return (
    <div>
       <header
        style={{
          backgroundColor: "#88b04b",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
          RecipeVault
        </h1>

        {/* Toggle Button for Mobile */}
        <button
          onClick={toggleMenu}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            display: "none",
          }}
          className="menu-toggle"
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <nav
          className={`nav-menu ${menuOpen ? "open" : ""}`}
          style={{
            display: "flex",
            flexDirection: menuOpen ? "column" : "row",
            position: menuOpen ? "absolute" : "static",
            top: menuOpen ? "60px" : "unset",
            left: menuOpen ? "0" : "unset",
            backgroundColor: menuOpen ? "#88b04b" : "transparent",
            width: menuOpen ? "100%" : "unset",
            zIndex: 1000,
            padding: menuOpen ? "15px 0" : "0",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: menuOpen ? "column" : "row",
              gap: "20px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              textAlign: menuOpen ? "center" : "unset",
            }}
          >
            <li>
              <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/create-recipe"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Create Recipe
              </Link>
            </li>
            <li>
              <Link
                to="/saved-recipes"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Saved Recipes
              </Link>
            </li>
          </ul>
        </nav>

        <form
          onSubmit={handleSearch}
          style={{
            display: menuOpen ? "block" : "flex",
            gap: "10px",
            marginTop: menuOpen ? "15px" : "0",
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes..."
            style={{
              padding: "10px 15px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              width: "300px",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#fff",
              border: "2px solid #88b04b",
              borderRadius: "20px",
              cursor: "pointer",
              color: "#88b04b",
              fontWeight: "bold",
            }}
          >
            Search
          </button>
        </form>
      </header>

      {/* CSS for Responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            .menu-toggle {
              display: block;
            }
            .nav-menu {
              display: none;
            }
            .nav-menu.open {
              display: flex;
            }
          }
        `}
      </style>

      <section style={{ padding: "20px" }}>
        <h2>Search Results</h2>
        {loading && <p>Loading recipes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {recipes.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
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
                    {recipe.description || "details available."}
                  </p>
                  <p style={{ margin: "0 0 10px", fontStyle: "italic" }}>
                    {recipe.category}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px", // space between the buttons
                    }}
                  >
                    <button
                      onClick={() => fetchRecipeDetails(recipe.id)}
                      style={{
                        padding: "10px",
                        backgroundColor: "#88b04b",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1, // makes button fill available space
                      }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => saveRecipe(recipe)}
                      style={{
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1, // makes button fill available space
                      }}
                    >
                      Save Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No recipes found. Try another search.</p>
        )}
      </section>

      {selectedRecipe && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "100%",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedRecipe.title}</h3>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <p>{selectedRecipe.instructions || "No instructions available."}</p>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
