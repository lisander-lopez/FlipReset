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

const tit = () => (
	<div>
		<Profile />
	</div>
);

class Prof extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: null,
			error: null,
		};
	}

	async componentDidMount() {
		//console.log(this.props.firebase.auth.currentUser.uid);
		/*
		const namesOfFile = this.props.firebase.getVidList(
			this.props.firebase.auth.currentUser.uid
		);
		*/
		let namesOfFile = await this.props.firebase.getVidList(
			"sJg5BF0gxoTCJaKqv0kAP4jqMWz1"
		);
		console.log("NUTSSS");
		console.log(namesOfFile);
		namesOfFile.forEach((element) => {
			console.log(element);
		});
		const response = await this.props.firebase.doGrabFile();

		this.setState({ source: response });
		console.log(this.state.source);
	}

	generatePosts() {
		let posts = [];
		for (let i = 0; i < 20; i++) {
			posts.push(
				<Link to="/chatpro" className="Deeznutsidk">
					<div class="profile-post-content">
						<div className="player-wrapper">
							<ReactPlayer
								className="react-player"
								url={this.state.source}
								width="100%"
								height="100%"
							/>
						</div>
					</div>
				</Link>
			);
		}
		console.log(posts);
		return posts;
	}
	render() {
		return [
			<div class="grid-container">
				<div class="item1">USERNAME</div>
				<div class="item2">
					<img src={lessangry}></img>
				</div>
				<div class="item3">FRIENDS: 23</div>
				<div class="item4">POSTS: 20</div>
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

export default connect(mapStateToProps, null)(Profile);
