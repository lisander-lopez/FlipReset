import React, { Component } from "react";
import $ from "jquery";
import "./home.css";

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

import io from "socket.io-client";
const socket = io('http://localhost:3030');

const tit = () => (
	<div>
		<Hohoho />
	</div>
);

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			length: null,
			error: null,
		};
		// this.handleLikePost = this.handleLikePost.bind(this);
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
		// const response = await this.props.firebase.doGrabFile();
		// this.setState({ source: response });
		// console.log(this.state.source);
		socket.on("timestamp", timestamp => {
			const oldlen = this.state.length
			console.log("RECEIVED EMISSION ACROSS --ALL-- CLIENTS")
			console.log("OLD LENGTH OF VID ARRAY: " + oldlen)
			console.log("CALLING GETVIDLIST. RETURNED INFO NOT UPDATED, NEEDS PROMISE/DELAY")
			console.log('LOADING DATA...')

			this.props.firebase.getAllPosts()
				.then(result => {
					console.log("NEW LENGTH OF VID ARRAY (NEEDS TO BE 1 HIGHER TO SIGNIFY UPDATED DB): " + result.length)
					this.setState({
						posts: result,
						length: result.length
					})
				},
					error => {
						console.log(error)
					})
		});
		this.props.firebase.getAllPosts().then(
			async (result) => {
				console.log(result)
				this.setState({
					posts: result,
					length: result.length
				});
			},
			(error) => {
				console.log(error);
			});
		let d = await this.allUsersUID();
		return Promise.resolve();





	}





	handleKeyUp() {
		$(".post-comment").keyup((data) => {
			if (data.target.value !== "") {
				$(data.target.nextElementSibling).removeClass("disabled");
			} else {
				$(data.target.nextElementSibling).addClass("disabled");
			}
		});
	}
	generatePosts() {
		console.log(this.props.user.username);
		let userPosts = this.state.posts;
		console.log("posts from state", userPosts);
		console.log("JSON", this.state.json);
		let posts = [];
		let flag = false;
		// Outer loop to create parent
		let friends = [];
		if (this.state.json) {
			for (let i = 0; i < this.state.json.length; i++) {
				if (this.state.json[i].isFollowing === true) {
					friends.push(
						this.state.json[i].displayName
					);
				}
			}

			console.log("MYFRIENDS", friends);

			for (let i = 0; i < this.state.posts.length; i++) {
				//Create the parent and add the children
				let curr = this.state.json[i];
				for (let j = 0; j < friends.length; j++) {
					if (friends[j] === this.state.posts[i].author) {
						flag = true;
						console.log("friend === author");
					}
				}
				if (flag === true) {
					posts.push(
						<div class="post animated bounceInLeft delay-1s">
							<div class="post-header">
								<div class="post-author">
									<a href="#">
										<img
											src="https://www.speakingtigerbooks.com/wp-content/uploads/2016/09/facebook-default-no-profile-pic.jpg"
											alt="Author Picture"
											srcset=""
										/>
									</a>
									<p class="post-name">{this.state.posts[i].author}</p>
								</div>
								<div class="post-settings">
									<a href="#">
										<img class="pure-img" src="imgs/report.svg" alt="" srcset="" />
									</a>
								</div>
							</div>
							<Link
								to={{
									pathname: "/chatpro",
									state: { post: this.state.posts[i] },
								}}
							>
							<div class="post-content">
								<div className="player-wrapper">
									<ReactPlayer
										className="react-player"
										url={this.state.posts[i].videoURL}
										width="100%"
										height="100%"
									/>
								</div>
							</div></Link>
						</div>
					);
				}

			}
			console.log(posts)
			return posts;
		}

	}
	render() {
		return (
			<div>
				<div class="feed">{this.generatePosts()}</div>
			</div>
		);
	}
}

const Hohoho = compose(withRouter, withFirebase)(Home);

const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	};
};

export default connect(mapStateToProps, null)(Hohoho);
