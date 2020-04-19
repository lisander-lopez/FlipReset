import React, { Component } from "react";
import "./chatpro.css";
import $ from "jquery";
import lessangry from "./lessangry.png";
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
		<Chat />
	</div>
);

class ChatPro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: this.props.user.url,
			error: null,
			comments: [],
			likes: 0,
		};
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
		this.handleLikePost = this.handleLikePost.bind(this);
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

	generateComments() {
		let postComments = this.state.comments;
		let comments = [];
		console.log("Post Comments: ", postComments);
		if (postComments) {
			for (var i = 0; i < postComments.length; i++) {
				comments.push(
					<li class="comment">
						<span class="username">{postComments[i].from}</span>
						<span class="comment-text">{postComments[i].content}</span>
					</li>
				);
			}
		}
		return comments;
	}

	// generateLikes(){
	// 	let postLikes = this.state.likes;
		
	// }

	async handleLikePost(e) {
		let postID = $(e.currentTarget).attr("value");
		$(e.currentTarget).addClass("active");
		await this.props.firebase.addLike(postID);
		console.log("Liked!");
	}

	async handleCommentSubmit(e) {
		e.preventDefault();
		let postID = $(e.currentTarget).attr("value");
		if (!$(".post-comment-link").hasClass("disabled")) {
			let com = $("#postComment1").val();

			await this.props.firebase.postComment(com, postID);

			$("#postComment1").val = "";
			console.log("UPLOADED COMMENT!");
		}
	}

	componentDidMount() {
		socket.on("timestamp", timestamp => {
			console.log("TIMESTAMP HIT! Getting likes and comments...")
			this.props.firebase.getComments(this.props.history.location.state.post._id)
				.then(result => {
					console.log("LENGTH OF COMMENTS LIST FOR POST: " + result.length);
					this.setState({
						post: this.props.history.location.state.post,
						comments: result,
					});
				},
					error => {
						console.log(error);
					});
			this.props.firebase.getLikes(this.props.history.location.state.post._id)
				.then(result => {
					this.setState({
						likes: result,
					});
				}, error => {
					console.log(error);
				});
		});
		console.log("State not from timer: ", this.props.history.location.state.post);
		this.props.firebase.getComments(this.props.history.location.state.post._id).then(
			async result => {
				console.log("LENGTH OF COMMENTS LIST FOR POST: " + result.length);
				this.setState({
					post: this.props.history.location.state.post,
					comments: result
				});
			},
			error => {
				console.log(error)
			});
		this.props.firebase.getLikes(this.props.history.location.state.post._id).then(
			async result => {
				this.setState({
					likes: result,
				});
			}, error => {
				console.log(error);
			});
		this.setState({
			post: this.props.history.location.state.post,
		});
	}

	render() {
		let statePassedIn = this.props.history.location.state.post;
		console.log("statepassed", statePassedIn);
		return [
			<div class="chatpro-container">
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
							<p class="post-name">{this.props.user.username}</p>
						</div>
						<div class="post-settings">
							<a href="#">
								<img class="pure-img" src="imgs/report.svg" alt="" srcset="" />
							</a>
						</div>
					</div>
					<div class="post-content">
						<div className="player-wrapper">
							<ReactPlayer
								className="react-player"
								url={statePassedIn.videoURL}
								width="100%"
								height="100%"
							/>
						</div>
					</div>
					<div class="post-footer">
						<div class="post-social">
							<i
								class="las la-heart"
								value={statePassedIn._id}
								onClick={this.handleLikePost}
							></i>
							<i class="lar la-comment"></i>
						</div>
						<div class="post-divide"></div>
						<div class="post-LB">
							<i class="las la-heart black-heart"></i>
							<span id="numberOfLikes">{this.state.likes}</span> likes
						</div>
						<div class="post-status">
							<span id="userName">
								<b>Username</b>
							</span>
							<span>This is a posttt</span>
						</div>
						<div class="post-comments-container">
							<ul class="post-comments">{this.generateComments()}</ul>
						</div>
						<div class="post-divide"></div>

						<div class="input-container">
							<input
								type="text"
								name="comment"
								id="postComment1"
								class="post-comment"
								placeholder="Add a comment..."
								onKeyUp={this.handleKeyUp}
							/>
							<a
								href="#"
								class="post-comment-link disabled"
								value={statePassedIn._id}
								onClick={this.handleCommentSubmit}
							>
								Post
							</a>
						</div>
					</div>
				</div>
			</div>,
		];
	}
}

const Chat = compose(withRouter, withFirebase)(ChatPro);

const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	};
};

export default connect(mapStateToProps, null)(Chat);
