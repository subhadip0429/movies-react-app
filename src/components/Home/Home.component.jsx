import React, { Component } from 'react';
import { API_URL } from '../../config';
import SearchBar from '../elements/SearchBar/SearchBar.component';
import FourColGrid from '../elements/FourColGrid/FourColGrid.component';
import MovieThumb from '../elements/MovieThumb/MovieThumb.component';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn.component';
import Spinner from '../elements/Spinner/Spinner.component';
import './Home.styles.css';
import FilterBarComponent from "../elements/FilterBar/FilterBar.component";

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 1,
    totalPages: 0,
    searchTerm: '',
    sortBy: "popularity",
    genre_filter_list: [],
    currentURLQuery : {page : 1},
    render : false
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.fetchItems();
  }

  searchItems = (searchTerm) => {
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })

    this.fetchItems();
  }

  sortItems = (sortByOption, orderBy = 1) => {
    console.log("sort items called",sortByOption, orderBy);
    this.setState({
      loading: true,
      sortBy: sortByOption.value
    });
  }

  filterItems = (genre_list_option) => {
    console.log("filter items called", genre_list_option)
    this.setState({
      loading: true,
      genre_list_option: genre_list_option.map(genre_option => genre_option.value).join(",")
    })
  }

  loadMoreItems = () => {
    const { currentPage } = this.state;
    this.setState({ loading: true, currentPage: currentPage + 1 })
  }

  fetchItems = (append = false) => {
    const { movies, sortBy, searchTerm, currentPage } = this.state;
    const endpoint =`${API_URL}movies?page=${currentPage}&sort_by=${sortBy}&search_text=${searchTerm}`;
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      this.setState({
        movies: append ? [...movies, ...result.data.data] : result.data.data,
        loading: false,
        currentPage: parseInt(result.data.page),
        totalPages: parseInt(result.data.count)
      })
    })
    .catch(error => console.error('Error:', error))
  }

  deleteItem = (id) => {
    console.log("deleting id", id)
    const token = localStorage.getItem("_token");
    fetch(`${API_URL}movies/${id}`,{
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
        // .then(response => response.json())
        .then(() => {
          this.setState({loading : true});
          this.fetchItems()
        });
  }

  render() {
    const { movies, loading, currentPage, totalPages, searchTerm } = this.state;
    return (
      <div className="rmdb-home">
        <FilterBarComponent sort_callback={this.sortItems} filter_callback={this.filterItems}/>
        <SearchBar callback={this.searchItems}/>
        <div className="rmdb-home-grid">
            <FourColGrid
              header={searchTerm ? 'Search Result' : 'Popular Movies'}
              loading={loading}
            >
              {movies.map( (element, i) => (
                <MovieThumb
                  key={i}
                  image={'./images/no_image.jpg'}
                  movieId={element._id}
                  movieName={element.name}
                  deleteItemHandler={this.deleteItem}
                  authenticated={this.props.currentUser != null}
                />
              ))}
            </FourColGrid>
            {loading ? <Spinner /> : null}
            {(currentPage <= totalPages && !loading) ?
              <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
              : null
            }
          </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.loading){
      if(prevState.currentPage !== this.state.currentPage)
        this.fetchItems(true);
      else
        this.fetchItems();
    }
  }
}

export default Home;
