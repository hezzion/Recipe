import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const HomePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false); // State to toggle slideshow

  const slides = [
    {
      title: "Savor the Flavor",
      description: "Explore delicious recipes crafted with love.",
      image: "/img8.jpeg",
    },
    {
      title: "A Taste of Heaven",
      description: "Indulge in the art of fine dining.",
      image: "/img9.jpeg",
    },
    {
      title: "Fresh Ingredients, Fresh Recipes",
      description: "Experience the magic of fresh cooking.",
      image: "/img7.jpeg",
    },
  ];

  const toggleFavorite = (title) => {
    setFavorites((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleViewDetails = () => {
    setShowSlideshow(true); // Show the slideshow when clicking "View Details"
  };

  useEffect(() => {
    if (showSlideshow) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [showSlideshow, slides.length]);

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        backgroundColor: "#f5f5f5",
        color: "#333",
        textAlign: "center",
        padding: "0",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          backgroundColor: "#dce2d9",
          padding: "10px 0",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h1 style={{ fontSize: "36px", margin: 0, color: "#333" }}>
          RecipeVault
        </h1>
        <p style={{ fontSize: "14px", margin: 0, color: "#666" }}>
          From Our Kitchen to Yours: Discover, Cook, Enjoy!
        </p>
      </header>

      {/* Slideshow (only shown when showSlideshow is true) */}
      {showSlideshow && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              backgroundImage: `url('${slides[currentSlide].image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "10%",
                transform: "translateY(-50%)",
                color: "#fff",
                textAlign: "left",
              }}
            >
              <h2 style={{ fontSize: "48px", margin: 0 }}>
                {slides[currentSlide].title}
              </h2>
              <p style={{ fontSize: "18px", margin: "10px 0" }}>
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            title: "Enjoy such fried rice daily",
            description: "A divine dessert treat.",
            image: "/image1.jpeg",
          },
          {
            title: "Cool Pounded yam",
            description: "Start your day right.",
            image: "img2.jpeg",
          },
          {
            title: " Breakfast Meals",
            description: "A refreshing snack.",
            image: "/img3.jpeg",
          },
          {
            title: "Spaghetti Recipe",
            description: "Refreshing.",
            image: "/img9.jpeg",
          },
          {
            title: "Healthy Meals",
            description: "A refreshing snack.",
            image: "/img8.jpeg",
          },
          {
            title: "Healthy Meals",
            description: "A refreshing snack.",
            image: "/img6.jpeg",
          },
        ].map((recipe) => (
          <RecipeCard
            key={recipe.title}
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            isFavorite={favorites.includes(recipe.title)}
            onFavoriteToggle={() => toggleFavorite(recipe.title)}
            onViewDetails={handleViewDetails} // Pass the function to RecipeCard
          />
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2c3e50",
          color: "#ecf0f1",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "14px", color: "#95a5a6" }}>
          &copy; {new Date().getFullYear()} RecipeVault. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
