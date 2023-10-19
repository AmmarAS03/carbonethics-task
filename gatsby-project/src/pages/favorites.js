import React from "react";
import Layout from "../components/layout";
import FavoritesPage from "../components/FavoritesPage"; // Create this component
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { useEffect, useState } from "react"


const Favorites = () => {
    const [selectedArticles, setSelectedArticles] = useState([]);
  
    // Retrieve selected articles from local storage
    useEffect(() => {
      const storedSelectedArticles = JSON.parse(
        localStorage.getItem("selectedArticles")
      );
      if (storedSelectedArticles) {
        setSelectedArticles(storedSelectedArticles);
      }
    }, []);
  
    return (
      <div>
        <ResponsiveAppBar />
        <FavoritesPage selectedArticles={selectedArticles} />
      </div>
    );
  };
  
  export default Favorites;
