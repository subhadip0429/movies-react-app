import React, { Component } from 'react';
import { API_URL } from '../../config';
import Navigation from '../elements/Navigation/Navigation.component';
import MovieInfo from '../elements/MovieInfo/MovieInfo.component';
import Spinner from '../elements/Spinner/Spinner.component';
import './Movie.styles.css';

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;

    if (localStorage.getItem(`${movieId}`)) {
      let state = JSON.parse(localStorage.getItem(`${movieId}`))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      // First fetch the movie ...
      let endpoint = `${API_URL}movies/${movieId}`;
      this.fetchItems(endpoint);
    }
  }

  fetchItems = (endpoint) => {
    // const { movieId } = this.props.match.params;

    fetch(endpoint)
    .then(result => result.json())
    .then(result => {

      if (result.statusCode === 404) {
        console.log("here")
        // If we don't find any movie
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result.data, loading : false }, () => {
          // ... then fetch actors in the setState callback function
          // let endpoint = `${API_URL}movies/${movieId}/credits?api_key=${API_KEY}`;
          // fetch(endpoint)
          // .then(result => result.json())
          // .then(result => {
          //
          //   const directors = result.crew.filter( (member) => member.job === "Director");
          //
          //   this.setState({
          //     actors: result.cast,
          //     directors,
          //     loading: false
          //   }, () => {
          //     localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
          //   })
          // })
        })
      }
    })
    .catch(error => console.error('Error:', error))
  }

  render() {
    // const { movieName } = this.props.location;
    const { movie, loading } = this.state;
    return (
      <div className="rmdb-movie">
        {movie ?
        <div>
          <Navigation movie={movie.name} />
          <MovieInfo movie={movie} directors={movie.director} genre={movie.genre} />
          {/*<MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />*/}
        </div>
        : <h1>No movie found</h1> }
        {/*{actors ?*/}
        {/*<div className="rmdb-movie-grid">*/}
        {/*  <FourColGrid header={'Actors'}>*/}
        {/*    {actors.map( (element, i) => (*/}
        {/*      <Actor key={i} actor={element} />*/}
        {/*    ))}*/}
        {/*  </FourColGrid>*/}
        {/*</div>*/}
        {/*: null }*/}
        {/*{ !loading ? <h1>No movie found</h1> : null }*/}
        {loading ? <Spinner /> : null}
      </div>
    )
  }
}

export default Movie;
