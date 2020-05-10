import React, { Component } from "react";
import "./search.css";
import fire from "../components/Firebase/index";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	withRouter,
	useParams,
} from "react-router-dom";
import { withFirebase } from "../components/Firebase/context";
import { compose } from "recompose";
import { connect } from "react-redux";
import { userUID } from "../redux/actions";

const xyz = () => (
	<div>
		<Ballzck />
	</div>
);

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: 0,
		};
	}
	allUsersUID = async () => {
		console.log(this.props.user.uid);
		fetch(process.env.REACT_APP_MONGO_URL + "user/all/" + this.props.user.uid)
			.then((res) => res.json())
			.then((data) => {
				let json = data;
				this.setState({ json });
				console.log(json);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	async componentDidMount() {
		let d = await this.allUsersUID();
		//let new = await this.addID();
		return Promise.resolve();
	}
	async follow(idToFollow) {
		//http://localhost:3060/follow/QezhFrwO92Z8i251URJKbqqTiNr2/UNTROLWt39WOzOWSHBrVUXnYObX2
		console.log("IS TO FOLLOW", idToFollow);
		await fetch(
			process.env.REACT_APP_MONGO_URL +
				"follow/" +
				this.props.user.uid +
				"/" +
				idToFollow
		);
		//this.setState(this.state);
		await this.allUsersUID();
	}
	render() {
		if (this.state.json) {
			console.log(this.state.json);
			let users = [];
			for (let i = 0; i < this.state.json.length; i++) {
				let curr = this.state.json[i];
				users.push(
					<div className="search-block">
						<a id="user" href="#" onClick={() => this.follow(curr.userID)}>
							{/* <p className="user-id">UserID: {curr.userID}</p> */}
							<p className="user-name">UserName: {curr.displayName}</p>
							{/* <p className="user-posts">Posts: {curr.posts.length}</p>
							<p className="user-following">
								Following: {curr.following.length}
							</p>
							<p className="user-followers">
								Followers: {curr.followers.length}
							</p> */}
							<p>Click To follow then go to home page to see your friends videos !!! </p>
							<p className="user-isFollowing">
								Are you following them now ?? {curr.isFollowing.toString()}
							</p>
						</a><br/>
					</div>
				);
			}
			return users;
		}

		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}
}

const Ballzck = compose(withRouter, withFirebase)(Search);

const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	};
};

const mapDispatchToProps = {
	userUID,
};
export default connect(mapStateToProps, mapDispatchToProps)(Ballzck);
