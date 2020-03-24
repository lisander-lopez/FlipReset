import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./header/header";
import Home from "./home/home";
import DM from "./directmessage/DM";
import Profile from "./profile/profile";
import ChatPro from "./profile/chatpro";
import Login from "./login/login"
import Register from "./register/register"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams
} from "react-router-dom";


function App() {
	return (
		<Router>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link
				href="https://fonts.googleapis.com/css?family=Charm:700&display=swap"
				rel="stylesheet"
			/>
			<link
				rel="stylesheet"
				href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
			/>
			<link rel="stylesheet" href="animate.css" />

			<Switch>
				<Route path="/" exact>
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/home">
					<Header />
					<Home />
				</Route>
				<Route path="/messages">
					<Header />
					<DM />
				</Route>
				<Route path="/profile">
					<Header />
					<Profile />
				</Route>
				<Route path="/chatpro">
					<Header />
					<ChatPro />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

