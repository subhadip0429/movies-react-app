import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.css';

const Header = ({currentUser, logout}) => {
    return (
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <Link to="/">
                    <img className="rmdb-logo" src="/images/imdb_logo.png" alt="rmdb-logo" />
                </Link>
                {/*<img className="rmdb-tmdb-logo" src="/images/tmdb_logo.png" alt="tmdb-logo" />*/}
                { !currentUser ?
                    <Link to="/login">
                        <button className="btn btn-warning rmdb-tmdb-logo">Login</button>
                    </Link>
                    :
                    <div >
                        {/*<Link to="/logout">*/}
                        {/*    <button className="btn btn-danger rmdb-tmdb-logo">Logout</button>*/}
                        {/*</Link>*/}
                        <button className="btn btn-danger rmdb-tmdb-logo" onClick={logout}>Logout</button>
                        <Link to={{pathname: "/movie-action", action: "add"}}>
                            <button className="btn btn-outline-primary rmdb-tmdb-logo">Add New</button>
                        </Link>
                        {/*<span className="rmdb-tmdb-logo bg-warning">Welcome {currentUser.name}</span>*/}
                    </div>
                }

            </div>
        </div>
    )
}

export default Header;
