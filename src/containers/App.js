import React from "react";
import "../css/App.css";
import "../css/animate.css";
import NavBar from "../components/NavBar";
import SearchForm from "../components/SearchForm";
import { connect } from "react-redux";
import MovieCards from "../components/MovieCards";
import InfiniteScroll from "react-infinite-scroller";

import Error from "../components/Error";
import MovieModal from "../components/MovieModal";
import { fetchMovies, clearMovies } from "../actions/index";

export class App extends React.Component {
  state = {
    movies: [],
    modalIsOpen: false,
    movieSelected: null,
    searchField: ""
  };

  /**
   * Opens Modal when user selects a movie card
   */
  _handleCardClick = movieSelected => {
    this.setState({ modalIsOpen: true, movieSelected });
  };

  /**
   * Close movie modal
   */
  _closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  /**
   * fetch movies on searchForm submit
   */
  _handleSubmit = e => {
    const { dispatch } = this.props;
    dispatch(clearMovies());
    dispatch(fetchMovies(this.state.searchField));
    e.preventDefault();
  };

  /**
   * Update state as user types in search field
   */
  _handleChange = e => {
    this.setState({ searchField: e.target.value });
  };
  /**
   * Fetch more movies when user scrolls to bottom of screen
   */
  fetchMoreMovies = page => {
    this.props.dispatch(fetchMovies(this.state.searchField, page));
  };

  render() {
    const movies = this.props.movies || [];
    const { movieSelected, modalIsOpen, searchField } = this.state;
    const { error } = this.props;
    return (
      <div className={`App`}>
        <NavBar />
        <MovieModal
          movie={movieSelected}
          isOpen={modalIsOpen}
          closeModal={this._closeModal}
        />
        <SearchForm
          onSubmit={this._handleSubmit}
          onChange={this._handleChange}
          value={searchField}
        />
        <div className="main">
          {error ? (
            <Error title="Something went wrong" body="Please try again later" />
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.fetchMoreMovies}
              hasMore={true}
            >
              <MovieCards movies={movies} onClick={this._handleCardClick} />
            </InfiniteScroll>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    error: state.fetchError
  };
};

export default connect(mapStateToProps)(App);
