import React from "react";
import Modal from "react-modal";

const MovieModal = ({ movie, isOpen, closeModal }) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: 0,
      margin: 0,
      zIndex: 1000
    },
    content: {
      border: 0,
      padding: 0,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden"
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Example Modal"
      onRequestClose={closeModal}
      style={customStyles}
    >
      {movie && (
        <div>
          <div className="modal-image-wrapper">
            <div
              className="animated zoomIn mine"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path
                })`
              }}
            />
          </div>
          <div className="modal-content">
            <div className="image-wrapper">
              <img
                className="vertical-center"
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt=""
              />
            </div>
            <div className="">
              <h4 className="bold">{movie.title}</h4>
              <h6>{movie.release_date}</h6>
              <hr />
              <p className="">{movie.overview}</p>
            </div>
          </div>
          <div className="modal-footer">
            <span className="waves-effect waves-light btn" onClick={closeModal}>
              Close
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MovieModal;
