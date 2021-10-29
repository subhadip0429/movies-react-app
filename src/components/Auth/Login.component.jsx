import React,{Component} from "react";
import "./login.styles.css";
import {API_URL} from "../../config";
import {Redirect} from "react-router-dom";

class LoginComponent extends Component{
    state = {
        email : "",
        password: ""
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        let endpoint = `${API_URL}users/authenticate`;
        fetch(endpoint,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(result => {
                if(result.statusCode === 200){
                    this.props.authenticated(result.data.token)
                }else if(result.statusCode === 401){
                    alert("Invalid email/password");
                }else{
                    alert("Something went wrong!!Try again later")
                }
            })
            .catch(error => console.error(error));
    }

    render() {
        if(this.state.status){
            return <Redirect to={"/"} />
        }
        return (
            <div className="login-page dark-mode">
                <div className="login-box dark-mode">
                    <form onSubmit={this.onSubmit}>
                        <input type="email" placeholder="Email" value={this.state.email} onChange={e => this.setState({email : e.target.value})} className="dark-mode"/>
                        <input type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({password : e.target.value})} className="dark-mode"/>
                        <button type="submit" id="login-button" className="dark-mode">Login</button>
                    </form>
                </div>

            </div>
        );
    }
}


export default LoginComponent;
