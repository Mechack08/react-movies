import axios from "axios";
import React, { useEffect, useState } from "react";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=aade29541dfd790dd62148b7224f262a&query=star&language=fr-FR`
      )
      .then((data) => setMoviesData(data.data.results));
  }, []);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
          />
          <input type="submit" value="Rechercher" />
        </form>

        <div className="btn-sort-container">
          <div className="btn-sort" id="goodToBad">
            Top<span>→</span>
          </div>
          <div className="btn-sort" id="badToGood">
            Top<span>→</span>
          </div>
        </div>
      </div>

      <div className="result"></div>
    </div>
  );
};

export default Form;
