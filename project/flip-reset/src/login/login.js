import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import "./login.css";
import firebase from 'firebase';


class Login extends Component {
    constructor(){
        super();
            this.state = {
                Username: '',
                Password: ''
            };
    }


    render() {
        return (
                <div className="Login">
                    <div>
                        <label className="title-label">FlipReset</label>
                    </div>
                    <form>
                        <div className="entry">
                            <div>
                                <label className="username-label">Username: </label>
                                <input className= "username-input" type="text" value = {this.state.Username} />
                                
                            </div>
                            <div>
                                <label className="password-label">Password: </label>
                                <input className="password-input" type="password" />
                            </div>
                            <Link to="/home">
                                <button className="btn btn-primary submit-button">submit</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-primary register-button">register</button>
                            </Link>
                        </div>
                    </form>
                </div>
        );
    }
}

export default Login;