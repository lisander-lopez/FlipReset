import React, { useEffect, Component } from "react";
import "./profile.css";
import lessangry from "./lessangry.png";
import ChatPro from "./chatpro.js";
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
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { compose } from "recompose";
import { saveURL } from "../redux/actions";

import io from "socket.io-client";
const socket = io("http://localhost:3030");

const tit = () => (
	<div>
		<Profile />
	</div>
);

class Prof extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			posts: [],
			length: null,
			error: null,
		};
		console.log(this.props.user);
	}

	componentDidMount() {
		socket.on("timestamp", (timestamp) => {
			const oldlen = this.state.length;
			console.log("RECEIVED EMISSION ACROSS --ALL-- CLIENTS");
			console.log("OLD LENGTH OF VID ARRAY: " + oldlen);
			console.log(
				"CALLING GETVIDLIST. RETURNED INFO NOT UPDATED, NEEDS PROMISE/DELAY"
			);
			console.log("LOADING DATA...");

			this.props.firebase.getUserPosts(this.props.user.uid).then(
				(result) => {
					console.log(
						"NEW LENGTH OF VID ARRAY (NEEDS TO BE 1 HIGHER TO SIGNIFY UPDATED DB): " +
							result.length
					);
					this.setState({
						posts: result,
						length: result.length,
					});
				},
				(error) => {
					console.log(error);
				}
			);
		});
		this.props.firebase.getUserPosts(this.props.user.uid).then(
			async (result) => {
				this.setState({
					posts: result,
					length: result.length,
				});
			},
			(error) => {
				console.log(error);
			}
		);
		this.getUserProf();
	}

	async getUserProf() {
		fetch(process.env.REACT_APP_MONGO_URL + "user/" + this.props.user.uid)
			.then((d) => d.json())
			.then((data) => {
				this.setState({
					followers: data.followers,
					following: data.following,
				});
				console.log(data);
			});
	}

	handleSubmit(e) {
		console.log(e.target.src);
		this.props.saveURL(e.target.src);
		console.log(this.props.user.url);
	}

	generatePosts() {
		let userPosts = this.state.posts;
		console.log("posts from state", userPosts);
		let posts = [];
		if (userPosts) {
			for (let i = 0; i < this.state.posts.length; i++) {
				posts.push(
					/*<Link
						to="/chatpro"
						className="Deeznutsidk"
						onClick={this.handleSubmit}
					>*/
					<Link
						to={{
							pathname: "/chatpro",
							state: { post: this.state.posts[i] },
						}}
					>
						<div class="profile-post-content">
							<div className="player-wrapper">
								<ReactPlayer
									className="react-player"
									url={this.state.posts[i].videoURL}
									width="100%"
									height="100%"
								/>
							</div>
						</div>
					</Link>
				);
			}
		}

		return posts;
	}
	render() {
		return [
			<div class="grid-container">
				<div class="item1">{this.props.user.displayname}</div>
				<div class="item2">
					<img src={lessangry}></img>
				</div>
				<div class="item3">
					Followers:{" "}
					{this.state.followers ? this.state.followers.length : "Loading..."}
				</div>
				<div class="item4">POSTS: {this.state.length}</div>
				<div class="item5">MESSAGE</div>
				<div class="item6">
					Following:{" "}
					{this.state.following ? this.state.following.length : "Loading..."}
				</div>
			</div>,

			<div class="profile-feed">{this.generatePosts()}</div>,
		];
	}
}

const Profile = compose(withRouter, withFirebase)(Prof);

const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	};
};

const mapDispatchToProps = {
	saveURL,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
