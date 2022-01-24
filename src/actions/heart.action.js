export const GET_COUP_DE_COEUR = "GET_COUP_DE_COEUR";
export const ADD_COUP_DE_COEUR = "ADD_COUP_DE_COEUR";
export const REMOVE_COUP_DE_COEUR = "REMOVE_COUP_DE_COEUR";

export const getCoupDeCoeur = () => {
  return (dispatch) => {
    const locals = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    dispatch({ type: GET_COUP_DE_COEUR, payload: locals });
  };
};

export const addCoupDeCoeur = (data) => {
  return (dispatch) => {
    const locals = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    if (!locals.includes(data)) {
      locals.push(data);
      window.localStorage.movies = locals;
    }

    dispatch({ type: ADD_COUP_DE_COEUR, payload: locals });
  };
};
