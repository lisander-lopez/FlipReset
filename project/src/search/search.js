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
		<Ballsack />
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
		fetch(process.env.REACT_APP_MONGO_URL + "user/")
			.then((res) => res.json())
			.then((data) => {
				let json = data;
				console.log(json);
				this.addID(json).then((blah) => {
					console.log(blah);
					this.setState({
						loaded: 1,
						json: blah,
					});
					return blah;
				});
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
	render() {
		if (this.state.json) {
			console.log(this.state.json);
			let users = [];
			for (let i = 0; i < this.state.json.length; i++) {
				let curr = this.state.json[i];
				users.push(
					<div id="user">
						<span className="user-id">UserID: {curr.userID}</span>
						<span className="user-name">UserName: {curr.name}</span>
						<span className="user-posts">Posts: {curr.posts.length}</span>
						<span className="user-following">
							Following: {curr.following.length}
						</span>
						<span className="user-followers">
							Followers: {curr.followers.length}
						</span>
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

const Ballsack = compose(withRouter, withFirebase)(Search);

const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	};
};

const mapDispatchToProps = {
	userUID,
};
export default connect(mapStateToProps, mapDispatchToProps)(Ballsack);
