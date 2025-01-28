import React, { useState } from "react";

const CreateRecipe = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    details: "",
    imageUrl: "",
    category: "",
  });

  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes")) || []
  );

  const handleCreateRecipe = (e) => {
    e.preventDefault();
    if (
      newRecipe.name &&
      newRecipe.details &&
      newRecipe.imageUrl &&
      newRecipe.category
    ) {
      const customRecipe = {
        id: Date.now(),
        title: newRecipe.name,
        description: newRecipe.details,
        image: newRecipe.imageUrl,
        category: newRecipe.category,
      };
      const updatedRecipes = [...savedRecipes, customRecipe];
      setSavedRecipes(updatedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
      setNewRecipe({ name: "", details: "", imageUrl: "", category: "" });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRecipe((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <header>
        <h1>Create Your Own Recipe</h1>
      </header>
      <section>
        <form
          onSubmit={handleCreateRecipe}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Recipe Name"
            value={newRecipe.name}
            onChange={(e) =>
              setNewRecipe((prev) => ({ ...prev, name: e.target.value }))
            }
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
          <textarea
            placeholder="Recipe Details"
            value={newRecipe.details}
            onChange={(e) =>
              setNewRecipe((prev) => ({ ...prev, details: e.target.value }))
            }
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
          <select
            value={newRecipe.category}
            onChange={(e) =>
              setNewRecipe((prev) => ({ ...prev, category: e.target.value }))
            }
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#88b04b",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Recipe
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateRecipe;
