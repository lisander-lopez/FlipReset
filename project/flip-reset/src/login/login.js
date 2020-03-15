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

class Login extends Component {
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
                                <input className="username-input" type="text" />
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