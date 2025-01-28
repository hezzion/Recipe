import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateRecipe from "./components/CreateRecipe";
import SavedRecipes from "./components/SavedRecipes"; // import the new CreateRecipe component

const App = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
      {/* Header component */}
      <Header />

      {/* Define the app routes */}
      <div style={{ paddingBottom: "40px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<h2>Recipes Page</h2>} />
          <Route path="/feedbacks" element={<h2>Feedbacks Page</h2>} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} /> {/* Updated route to match plural "saved-recipes" */}
        </Routes>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default App;
