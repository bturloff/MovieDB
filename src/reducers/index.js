import {
  ADD_MOVIES,
  FETCH_ERROR,
  CLEAR_ERROR,
  CLEAR_MOVIES
} from "../actions/index";

const movies = (state = {}, action) => {
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...action.movies]
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: []
      };
    case FETCH_ERROR:
      console.log("fetching error", action.error);
      return {
        ...state,
        fetchError: action.error
      };
    case CLEAR_ERROR:
      return {
        ...state,
        fetchError: null
      };
    default:
      return state;
  }
};

export default movies;
