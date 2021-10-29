import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import MovieThumb from '../MovieThumb/MovieThumb.component';
import './MovieInfo.styles.css';

const MovieInfo = ({ movie, directors = "", genre = [] }) => (
  <div className="rmdb-movieinfo"
    style={{
      background: '#000'
    }}
  >
    <div className="rmdb-movieinfo-content">
      <div className="rmdb-movieinfo-thumb">
        <MovieThumb
          image={'./images/no_image.jpg'}
          clickable={false}
        />
      </div>
      <div className="rmdb-movieinfo-text">
        <h1>{movie.name}</h1>
        <h3>IMDB RATING</h3>
        <div className="rmdb-rating">
          <meter min="0" max="100" optimum="100" low="40" high="70" value={ movie.imdb_score * 10}></meter>
          <p className="rmdb-score">{movie.imdb_score}</p>
        </div>
        <h3>99Popularity</h3>
        <div className="rmdb-rating">
          <meter min="0" max="100" optimum="100" low="40" high="70" value={ movie.popularity}></meter>
          <p className="rmdb-score">{movie.popularity}</p>
        </div>
        {directors.split(",").length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}
        <p key={"directors"} className="rmdb-director">{directors}</p>
        {<h3>Genre</h3>}
        {genre.map( (element, i) => {
          return <p key={i} style={{textTransform: "capitalize"}} className="rmdb-director">{element}</p>
        })}
      </div>
      <FontAwesome className="fa-film" name="film" size="5x" />
    </div>
  </div>
)

MovieInfo.propTypes = {
  movie: PropTypes.object,
  directors: PropTypes.string
}

export default MovieInfo;
