import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("all");
  const [sortGoodToBad, setSortGoodToBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=aade29541dfd790dd62148b7224f262a&query=${search}&language=fr-FR`
      )
      .then((data) => setMoviesData(data.data.results));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
        </form>

        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodToBad("goodToBad")}
          >
            Top<span>→</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodToBad("badToGood")}
          >
            Top<span>→</span>
          </div>
        </div>
      </div>

      <div className="result">
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodToBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodToBad === "badToGood") {
              return a.vote_average - b.vote_average;
            } else {
              return null;
            }
          })
          .map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
      </div>
    </div>
  );
};

export default Form;
