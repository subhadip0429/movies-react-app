import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MovieThumb.styles.css';

const MovieThumb = ({ image, movieId, movieName, authenticated, deleteItemHandler }) => (
  <div className="rmdb-moviethumb">
    <Link to={{ pathname: `/${movieId}`,  movieName: `${movieName}`}}>
      <img className="clickable" src={image} alt="moviethumb" />
    </Link>
    <div>
      <div style={{color: "white", textAlign: "center", fontSize: "large", margin: "7px 0"}}>{movieName && movieName.length > 25 ? movieName.substr(0, 20)+"..." : movieName}</div>
      {authenticated &&
      <div style={{color: "white", textAlign: "center", fontSize: "large"}}>
        <Link to={{pathname: "/movie-action/"+movieId, action: "edit", movieId}}>
          <button className="btn btn-outline-warning">Edit</button>
        </Link>
          <button className="btn btn-outline-danger" onClick={e => deleteItemHandler(movieId)}>Delete</button>
        {/*  <Link to={{pathname: "/movie-action/"+movieId, action: "delete", movieId}}>*/}
        {/*  <button className="btn btn-outline-danger" >Delete</button>*/}
        {/*</Link>*/}
      </div>}
    </div>
  </div>
)

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.string,
  movieName: PropTypes.string,
  clickable: PropTypes.bool
}

export default MovieThumb;
