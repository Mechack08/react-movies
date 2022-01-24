import { ADD_COUP_DE_COEUR, GET_COUP_DE_COEUR } from "../actions/heart.action";

const initialState = {};

export default function coupDeCoeurReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUP_DE_COEUR:
      return action.payload;
    case ADD_COUP_DE_COEUR:
      return [action.payload, ...state];
    default:
      return state;
  }
}
