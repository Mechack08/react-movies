import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCoupDeCoeur } from "../actions/heart.action";

const Card = ({ movie, locals }) => {
  const dateFormater = (date) => {
    let [yyyy, mm, dd] = date.split("-");
    return [dd, mm, yyyy].join("/");
  };

  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <li key={genre}>{genre}</li>);
  };

  const [btnStatus, setBtnStatus] = useState(false);
  const [btnName, setbtnName] = useState("");
  const dispatch = useDispatch();

  const addStorage = async () => {
    await dispatch(addCoupDeCoeur(movie.id.toString()));
  };

  useEffect(() => {
    if (locals.includes(movie.id.toString())) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
    btnStatus
      ? setbtnName("Retirer au coup de coeur")
      : setbtnName("Ajouter au coup de coeur");
  }, [btnStatus, locals, movie.id]);

  const removeStorage = () => {
    let storedData = window.localStorage.movies;
    if (window.localStorage.movies) {
      const newArray = storedData.split(",");
      if (newArray.includes(movie.id.toString())) {
        const filteredArray = newArray.filter((id) => {
          return id !== movie.id.toString();
        });
        window.localStorage.movies = filteredArray;
        console.log(filteredArray);
      }
    }
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt="Titre du film"
      />
      <h1>{movie.title}</h1>

      {movie.release_date && (
        <h5>Sorti le : {dateFormater(movie.release_date)} </h5>
      )}

      {movie.vote_average && (
        <h4>
          Note : {movie.vote_average + " / 10"} <span>⭐</span>
        </h4>
      )}

      <ul>
        {movie.genre_ids
          ? genreFinder()
          : movie.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
      </ul>

      {movie.overview && <h3>Synopsis</h3>}
      {movie.overview && <p>{movie.overview}</p>}

      {locals.includes(movie.id.toString()) ? (
        <div
          className="btn"
          onClick={() => {
            removeStorage();
            setBtnStatus(true);
          }}
        >
          {btnName}
        </div>
      ) : (
        <div
          className="btn"
          onClick={() => {
            addStorage();
            setBtnStatus(false);
          }}
        >
          {btnName}
        </div>
      )}
    </div>
  );
};

export default Card;
