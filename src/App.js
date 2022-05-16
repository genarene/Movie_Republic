import React from "react";
import { useEffect, useState } from "react";
import "../src/App.css";
import { BiSearchAlt } from "react-icons/bi";
import MovieCard from "./MovieCard";

//  6829806b
// my API url
const API_URL = "http://www.omdbapi.com?apikey=6829806b";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // async meaning it will take some time to search for the movies
  const searchMovies = async (title) => {
    // calling the API
    const response = await fetch(`${API_URL}&s=${title}`);

    // get data from the response
    const data = await response.json();

    // the data is going to be an object with the data about the movies
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);
  return (
    <div className="app">
      <h1>MovieRepublic</h1>
      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {/* render movie images dynamically */}
        <BiSearchAlt
          color="#BF9596"
          size={"2.5rem"}
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found </h2>
        </div>
      )}
      ;
    </div>
  );
};

export default App;
