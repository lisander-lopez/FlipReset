import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
    Link,
    useRouteMatch,
    useParams,
    Redirect,

} from "react-router-dom";
import "./login.css";
import { compose } from 'recompose';
import { withFirebase } from '../components/Firebase/context'
import { connect } from 'react-redux';
import { loginUser ,userUID} from '../redux/actions'; 
import { isCompositeComponent } from "react-dom/test-utils";


const SignInPage = () => (
    <div>
        <SignInForm />
    </div>
);


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };

    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
         .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.loginUser(email)
                console.log(this.props.user.username)
                this.props.userUID(this.props.firebase.auth.currentUser.uid)
                console.log(this.props.user.uid)
                this.props.history.push('/home');
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };



    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div className="Login">
                <div>
                    <label className="title-label">FlipReset</label>
                </div>
                <form onSubmit={this.onSubmit}>
                    <input
                        className="username-label"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        className="password-label"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={isInvalid} type="submit">
                        Sign In
                    </button>
                
                    {error && <p>{error.message}</p>}
                </form>
                <Link to="/register">
                    <button className="btn btn-primary register-button">Register</button>
                </Link>
            </div>
        );
    }
}


const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

//export default SignInPage;

const mapStateToProps = (state) => {
    const { user} = state;
    return {
      user,
    }
  }
  
  const mapDispatchToProps = {
    loginUser,
    userUID
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

  export {SignInForm};