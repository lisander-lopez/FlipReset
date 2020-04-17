import React, { Component } from "react";
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
	}

	componentDidMount() {
		this.props.firebase.getUserPosts(this.props.user.uid).then(
			async (result) => {
				this.setState({
					posts: result,
				});
			},
			(error) => {
				console.log(error);
			}
		);
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
					<Link
						to="/chatpro"
						className="Deeznutsidk"
						onClick={this.handleSubmit}
					>
						<div class="profile-post-content">
							<div className="player-wrapper">
								<ReactPlayer
									className="react-player"
									url={this.props.firebase.doGrabFile(userPosts[i].video)}
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
				<div class="item1">{this.props.user.username}</div>
				<div class="item2">
					<img src={lessangry}></img>
				</div>
				<div class="item3">FRIENDS: 23</div>
				<div class="item4">POSTS: {this.state.length}</div>
				<div class="item5">MESSAGE</div>
				<div class="item6">FRIEND REQUEST</div>
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
