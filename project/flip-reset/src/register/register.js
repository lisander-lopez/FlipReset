import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import "./register.css";

class Register extends Component {
    render() {
        return (
                <div className="Register">
                    <div>
                        <label className="title-label-reg">FlipReset</label>
                    </div>
                    <form>
                        <div className="entry-reg">
                            <div>
                                <label className="username-label-reg">Username: </label>
                                <input className="username-input-reg" type="text" />
                            </div>
                            <div>
                                <label className="password-label-reg">Password: </label>
                                <input className="password-input-reg" type="password" />
                            </div>
                            <div>
                                <label className="confirm-label-reg">Confirm: </label>
                                <input className="confirm-input-reg" type="password" />
                            </div>
                            <Link to="/">
                                <button className="btn btn-primary submit-button-reg">submit</button>
                            </Link>
                        </div>
                    </form>
                </div>
        );
    }
}

export default Register;