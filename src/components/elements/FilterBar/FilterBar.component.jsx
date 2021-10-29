import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
import PropTypes from 'prop-types';
import './FilterBar.styles.css';
import Select from 'react-select'

class FilterBarComponent extends Component{
    state = {
        sortByPopularity : false,
        sortByDirector: false,
        sortByMovie : false,
        orderBy: 1,
        genre_options: [],
        genre_filter: []
    }

    componentDidMount() {
        const endpoint = `${API_URL}movies/genre`;
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                let options = result.data.map(({name}) => ({value: name, label: name.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())}))
                this.setState({genre_options: options})
            })
    }

    options = [
        { value: 'name', label: 'Movies' },
        { value: 'director', label: 'Directors' },
        { value: 'popularity', label: '99Popularity' }
    ];


    render() {
        return (
            <div className="rmdb-actionbar">
                <div className="rmdb-action-content">
                    {/*<FontAwesome className="rmdb-fa-search" name="search" size="2x" />*/}
                    <form>
                        <div className="container px-4 py-2">
                            <div className="row gx-5">
                                <div className="col">
                                    <Select
                                        placeholder={'Sort by'}
                                        name="sort-by-filer"
                                        options={this.options}
                                        styles={{
                                            singleValue: (base) => ({ ...base,
                                                background: "#353535",
                                                color: 'white' }),
                                            valueContainer: (base) => ({
                                                ...base,
                                                background: "#353535",
                                                borderRadius: "5px",
                                                color: 'white',
                                                width: '100%',
                                            }),
                                            container: (base) => ({
                                                ...base,
                                                backgroundColor: "#353535",
                                            }),
                                        }}
                                        onChange={this.props.sort_callback}
                                    />
                                </div>
                                <div className="col">
                                    <Select
                                        placeholder={'Select Genres'}
                                        name="genre-filter"
                                        options={this.state.genre_options}
                                        isMulti
                                        styles={{
                                            singleValue: (base) => ({ ...base,
                                                background: "#353535",
                                                color: 'white' }),
                                            valueContainer: (base) => ({
                                                ...base,
                                                background: "#353535",
                                                borderRadius: "5px",
                                                color: 'white',
                                                width: '100%',
                                            }),
                                            container: (base) => ({
                                                ...base,
                                                backgroundColor: "#353535",
                                            }),
                                        }}
                                        onChange={this.props.filter_callback}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        );
    }
}
FilterBarComponent.propTypes = {
    sort_callback : PropTypes.func,
    filter_callback : PropTypes.func
}

export default FilterBarComponent;
