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
	useParams
} from "react-router-dom";
import { withFirebase } from '../components/Firebase/context'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux';
import { compose } from 'recompose';


const tit = () => (
	<div>
		<Hohoho />
	</div>
);


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: null,
			url: null,
			error: null,
		}
	}

	async componentDidMount() {
		const response = await this.props.firebase.doGrabFile();
		this.setState({ source: response });
		console.log(this.state.source);
	}


	testMongo() {
		fetch('http://localhost:3000/posts/5e9746e7f74ad5030d9f7df4')
			.then(result => {
				return result.json();
			})
			.then(data => {
				console.log(data);
			});
	}

	handleKeyUp() {
		$(".post-comment").keyup(data => {
			if (data.target.value !== "") {
				$(data.target.nextElementSibling).removeClass("disabled");
			} else {
				$(data.target.nextElementSibling).addClass("disabled");
			}
		});
	}
	generatePosts() {
		console.log(this.props.user.username)
		let posts = [];
		// Outer loop to create parent
		for (let i = 0; i < 3; i++) {
			//Create the parent and add the children
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
							<p class="post-name">Username {i}</p>
						</div>
						<div class="post-settings">
							<a href="#">
								<img class="pure-img" src="imgs/report.svg" alt="" srcset="" />
							</a>
						</div>
					</div>
					<div class="post-content">
						<div className='player-wrapper'>
							<ReactPlayer
								className='react-player'
								url={this.state.source}
								width='100%'
								height='100%'
							/>
						</div>
					</div>
					<div class="post-footer">
						<div class="post-social">
							<i class="las la-heart"></i>
							<i class="lar la-comment"></i>
						</div>
						<div class="post-divide"></div>
						<div class="post-LB">
							<i class="las la-heart black-heart"></i>
							<span id="numberOfLikes">{i}</span> likes
						</div>
						<div class="post-status">
							<span id="userName">
								<b>{this.props.user.username}</b>
							</span>
							<span>This is a posttt</span>
						</div>
						<div class="post-comments-container">
							<ul class="post-comments">
								<li class="comment">
									<span class="username">Redder04</span>
									<span class="comment-text">That was nuts!</span>
								</li>
								<li class="comment">
									<span class="username">J.</span>
									<span class="comment-text">Sick dude!</span>
								</li>
								<li class="comment">
									<span class="username">Tr</span>
									<span class="comment-text">No way!</span>
								</li>
								<li class="comment">
									<span class="username">Mike</span>
									<span class="comment-text">nuts</span>
								</li>
							</ul>
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
							<a href="#" class="post-comment-link disabled">
								Post
							</a>
						</div>
					</div>
				</div>
			);
		}
		console.log(posts);
		return posts;
	}
	render() {
		return (
			<div>
				<div class="feed">
					{this.generatePosts()}
					{this.testMongo()}
				</div>
			</div>
		);
	}
}


const Hohoho = compose(
	withRouter,
	withFirebase,
)(Home);


const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	}
}


export default connect(mapStateToProps, null)(Hohoho);
