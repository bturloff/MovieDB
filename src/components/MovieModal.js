import React from "react";
import Modal from "react-modal";

class MovieModal extends React.Component {
  state = {};

  customStyles = {
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

  componentWillMount() {
    /** prefetch back image, then render when it loads */
    const backdrop_path =
      "https://image.tmdb.org/t/p/original/" + this.props.movie.backdrop_path; // get image primary src
    const primaryImage = new Image(); // create an image object programmatically
    primaryImage.onload = () => {
      this.setState({
        backgroundImage: primaryImage
      });
    };
    primaryImage.src = backdrop_path; // do it after you set onload handler
  }

  render() {
    const { movie, isOpen, closeModal } = this.props;
    const { backgroundImage } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={closeModal}
        style={this.customStyles}
      >
        {movie && (
          <div>
            {backgroundImage ? (
              <div className="modal-image-wrapper">
                <div
                  className="animated zoomIn mine"
                  style={{
                    backgroundImage: `url(${backgroundImage.src})`,
                    backgroundSize: "cover"
                  }}
                />
              </div>
            ) : (
              <div className="background-img-placeholder" />
            )}
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
              <span
                className="waves-effect waves-light btn"
                onClick={closeModal}
              >
                Close
              </span>
            </div>
          </div>
        )}
      </Modal>
    );
  }
}

export default MovieModal;
