import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Header from '../elements/Header/Header.component';
import Home from '../Home/Home.component';
import Movie from '../Movie/Movie.component';
import NotFound from '../elements/NotFound/NotFound.component';
import LoginComponent from "../Auth/Login.component";
import {API_URL} from "../../config";
import MovieActionComponent from "../elements/MovieAction/MovieAction.component";

class App extends React.Component{
    // let currentUser = localStorage.getItem("current-user");
    state = {
        authenticated: false,
        token : localStorage.getItem("_token"),
        currentUser : null
    }

    authenticated = (token) => {
        localStorage.setItem("_token", token);
        this.setState({token })
    }

    logout = () => {
        localStorage.removeItem("_token");
        this.setState({token: null, currentUser : null})
    }

    verifyToken = () => {
        fetch(`${API_URL}users/me`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${this.state.token}`,
            }
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    currentUser : result.data
                })
            })
            .catch(error => console.error(error))
    }

    render() {
        if(this.state.token && !this.state.currentUser){
            this.verifyToken();
        }
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Header currentUser={this.state.currentUser} logout={this.logout} />
                    <Switch>
                        <Route path="/" exact >
                            <Home currentUser={this.state.currentUser} />
                        </Route>
                        <Route path="/login" exact >
                            {!this.state.currentUser ? <LoginComponent authenticated={this.authenticated} /> : <Redirect to="/" />}
                        </Route>
                        <Route path={"/movie-action"} exact component={MovieActionComponent} />
                        <Route path={"/movie-action/:movieId"} exact component={MovieActionComponent} />
                        <Route path="/:movieId" component={Movie} exact />
                        <Route component={NotFound} />
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
