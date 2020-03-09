// THE APP COMPONENT
// This component bootstraps our entire React app. It decides which component to show based 
// on whether a user is authenticated or not. 
class App extends React.Component {
  render() {
    if (this.loggedIn) {
      return (<LoggedIn />);
    } else {
      return (<Home />);
    }
  }
}


// THE HOME COMPONENT 
// This component is shown to non logged-in users, along with a button which opens a 
// Hosted lock screen where they can signup or login. We’ll add this functionality later.
class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
          <h1>Rocket League</h1>
          <p>Sign in to get access </p>
          <a onClick={this.authenticate} className="btn btn-primary btn-lg btn-login btn-block">Sign In</a>
        </div>
      </div>
    )
  }
}







ReactDOM.render(<App />, document.getElementById('app'));