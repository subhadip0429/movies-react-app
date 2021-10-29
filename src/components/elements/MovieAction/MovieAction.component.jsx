import React from "react";
import "./MovieAction.styles.css"
import {API_URL} from "../../../config";
import GenreChipComponent from "../GenreChip/GenreChip.component";
import ModalInputComponent from "../ModalInput/ModalInput.component";
import {Redirect} from "react-router-dom";

export default class MovieActionComponent extends React.Component{
    state = {
        name: '',
        director: '',
        genre: [],
        popularity: '',
        imdb_score: '',
        genre_options: [],
        fetched: false,
        modalOpen : false,
        status: false
    }

    componentDidMount() {
        this.fetchGenreList();
        if(this.props.history.location.action === "delete"){
            this.deleteItem(this.props.match.params.movieId);
        }
        else if(this.props.history.location.action !== "add"){
            this.fetchMovieDetails(this.props.match.params.movieId);
        }
    }

    fetchMovieDetails = (movieId) => {
        // movieId = "61784a6d5fac41b0155b75e0";
        fetch(`${API_URL}movies/${movieId}`)
            .then(response => response.json())
            .then(result => {
                if(result.statusCode === 200){
                    const {name, director, genre, popularity, imdb_score} = result.data;
                    this.setState({
                        name,
                        director,
                        genre,
                        popularity,
                        imdb_score,
                        fetched: true
                    })
                }else if(result.statusCode === 404){
                    alert("Movie not found")
                }else{
                    alert("Something went wrong")
                }
            })
    }

    fetchGenreList = () => {
        fetch(`${API_URL}movies/genre`)
            .then(result => result.json())
            .then(result => {
                let options = result.data.map(({name}) => ({value: name, label: name.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())}))
                this.setState({genre_options: result.data})
            })
    }

    onClose = (name) => {
        return () => {
            console.log("close", name);
            let newValue = this.state.genre.filter(genre => genre !== name);
            this.setState({
                genre : newValue
            })
        }
    }

    onAddNew = () => {
        return () => {
            console.log("called")
            this.setState({modalOpen : true})
        }
    }
    modalOnClose = (e) => {
        if(e.target.classList.contains("modal-panel")){
            this.setState({ modalOpen: false })
        }
    }

    handleAddNewOnChange = (e) => {
        console.log("selected",e.key, e.target.value)
        if(e.key === "Enter"){
            this.setState({ modalOpen: false, genre: [...this.state.genre, e.target.value ] })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {name, director, genre, popularity, imdb_score} = this.state;
        let requestPayload = {
            genre,
            director,
            popularity,
            imdb_score
        };
        let endpoint = "";
        let method = "";
        if(this.props.history.location.action === "add"){
            endpoint = `${API_URL}movies`
            method = "POST";
            requestPayload["name"] = name;
        }else{
            endpoint = `${API_URL}movies/${this.props.match.params.movieId}`;
            method = "PATCH";
        }

        fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("_token")}`,
            },
            body : JSON.stringify(requestPayload)
        })
            .then(response => response.json())
            .then(result => {
                if(result.statusCode === 201 || result.statusCode === 200){
                    this.setState({status: true})
                }else{
                    alert("Something Went Wrong");
                }
            })
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
            .then(response => response.json())
            .then(() => this.setState({status : true}))
    }

    render() {
        // console.log(this.props.history)
        // console.log(this.state)
        // console.log(this.state.genre.map(genre => ({value: genre, label: genre.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())})))
        // if(this.props.history.location.action){
        //     return <Redirect to={"/"} />
        // }
        if(this.state.status){
            return <Redirect to={"/"} />
        }
        return (
            <>
                <div className="login-page dark-mode">
                    <div className="login-box dark-mode">
                        <h1 className="dark-mode">{this.props.history.location.action === "add" ? "Add Movie" : "Update Movie"}</h1>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" placeholder="Name" value={this.state.name} disabled={this.props.history.location.action !== "add"} onChange={e => this.setState({name: e.target.value})} className="dark-mode"/>
                            <input type="text" placeholder="Directors" value={this.state.director} onChange={e => this.setState({director: e.target.value})} className="dark-mode"/>
                            <input type="text" placeholder="99Popularity" value={this.state.popularity} onChange={e => this.setState({popularity: e.target.value})} className="dark-mode"/>
                            <input type="text" placeholder="IMDB Score" value={this.state.imdb_score} onChange={e => this.setState({imdb_score: e.target.value})} className="dark-mode"/>
                            <div className="chip-board">
                                {this.state.genre.map(name => <GenreChipComponent key={name} name={name} onClose={this.onClose} />)}
                                <GenreChipComponent key={"add-new"} name={"+ add new"} onClose={this.onAddNew} classes={"add-new"} />
                            </div>
                            <button type="submit" className="dark-mode">Submit</button>
                        </form>
                        {this.state.modalOpen && <ModalInputComponent list={this.state.genre_options.filter(genre => !this.state.genre.includes(genre.name)).map(genre => genre.name)} handleChange={this.handleAddNewOnChange} onClose={this.modalOnClose} />}
                    </div>

                </div>

            </>
        );
    }

}
