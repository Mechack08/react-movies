import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import Card from "../components/Card";
import Header from "../components/Header";

const UserList = () => {
  const [listData, setListData] = useState([]);
  const localsData = useSelector((state) => state.coupDeCoeurReducer);

  useEffect(() => {
    const moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=aade29541dfd790dd62148b7224f262a&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        Coup de coeur <span>❤️</span>
      </h2>

      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => (
            <Card key={movie.id} movie={movie} locals={localsData} />
          ))
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
