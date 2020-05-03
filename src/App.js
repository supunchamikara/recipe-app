import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./recipes";

const App = () => {
  const API_ID = "e540c5d8";
  const API_KEY = "47fd5403404f955f876a5d33d7259975";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [quary, setQuary] = useState("chicken");

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getRecipies();
  }, [quary]);

  const getRecipies = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${quary}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuary(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <div className='header'>
          <input
            trpe="text"
            className="search-bar"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </div>
        <div className="recipes">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default App;
