import React from "react";
import LazyLoad from "react-lazyload";
const posterURL = "https://image.tmdb.org/t/p/w200/";

const MovieCards = ({ movies, onClick }) => {
  return (
    <div className="row movie-grid">
      {movies.map(m => (
        <div className="movie-card col s12 m6 l3" key={m.id}>
          {!m.poster_path ? (
            <div className="placeholder card" />
          ) : (
            <LazyLoad height={"100%"} offset={-200}>
              <div className="img-wrapper" onClick={() => onClick(m)}>
                <img
                  className="card-image animated zoomIn card"
                  src={`${posterURL + m.poster_path}`}
                  alt=""
                />
              </div>
            </LazyLoad>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieCards;
