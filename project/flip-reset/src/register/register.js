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
import fire from '../fire';





class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: ''
        };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = fire.database().ref('items');
        const item = {
          Username: this.state.Username,
          Password: this.state.Password
        }
        itemsRef.push(item);
        this.setState({
          Username: '',
          Password: ''
        });
      }

    render() {
        return (
            <div className="Register">
                <div>
                    <label className="title-label-reg">FlipReset</label>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="entry-reg">
                        <div>
                            <label className="username-label-reg">Username: </label>
                            <input className="username-input-reg" type="text" onChange={this.handleChange} value={this.state.Username} />

                        </div>
                        <div>
                            <label className="password-label-reg">Password: </label>
                            <input className="password-input-reg" type="text" onChange={this.handleChange} value={this.state.Password} />
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