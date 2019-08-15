import Axios from "axios";
import { API_KEY, BASE_URL } from "../constants/index";

/** Reducer constants */
export const ADD_MOVIES = "ADD_MOVIES";
export const CLEAR_MOVIES = "CLEAR_MOVIES";
export const FETCH_ERROR = "FETCH_ERROR";
export const CLEAR_ERROR = "REMOVE_ERROR";

/** Add movies array to global state */
export const addMovies = ({ movies }) => ({
  type: ADD_MOVIES,
  movies
});

export const clearMovies = () => ({
  type: CLEAR_MOVIES
});

/**
 * Add error object to global state
 * @param {object} error
 */
export const error = error => ({
  type: FETCH_ERROR,
  error
});

/** Remove error from global state */
export const clearError = () => ({
  type: CLEAR_ERROR
});

/**
 * Fetch movies from API
 * @param {string} query
 */
export const fetchMovies = (query, page = 1) => {
  return dispatch => {
    const movieAxios = Axios.create({
      baseURL: BASE_URL,
      params: {
        api_key: API_KEY
      }
    });
    const axiosConfig =
      // if query is empty, get popular movies, else fetch moves with search query
      query
        ? {
            url: "/search/movie",
            params: {
              page,
              include_adult: false,
              language: "en-US",
              query
            }
          }
        : {
            url: "/movie/popular",
            params: {
              language: "en-US",
              page
            }
          };
    movieAxios
      .request({
        ...axiosConfig
      })
      .then(res => {
        dispatch({ type: ADD_MOVIES, movies: res.data.results });
        dispatch({ type: CLEAR_ERROR });
      })
      .catch(err => {
        dispatch({ type: FETCH_ERROR, error: err });
      });
  };
};
