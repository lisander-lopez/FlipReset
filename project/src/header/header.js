import React, { Component } from "react";
import $ from "jquery";
import "./header.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	withRouter,
	useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import fire from "../components/Firebase/index";
import { withFirebase } from "../components/Firebase/context";
import { compose } from "recompose";

const tit = () => (
	<div>
		<Header />
	</div>
);

class Head extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			error: null,
		};
	}

	toggleDropDown = (event) => {
		event.preventDefault();
		$("#dropdownMenu").toggle("show");
	};

	onClickHandler = () => {
		console.log("clicked");
		var timestamp = Number(new Date());
		const file = new File([this.state.selectedFile], timestamp);
		console.log(file);
		this.props.firebase.doSubmitFile(file);
	};

	onChangeHandler = (event) => {
		console.log("changed");
		this.setState({
			selectedFile: event.target.files[0],
			loaded: 0,
		});
	};

	render() {
		return (
			<div class="wide">
				<nav class="">
					<div class="nav-col-1">
						<div class="header-cam dropdown-btn">
							<a href="#" onClick={this.toggleDropDown}>
								<i class="las la-video"></i>
							</a>
							<div id="dropdownMenu" class="dropdown-content">
								<input
									id="uploadForm"
									type="file"
									name="file"
									onChange={this.onChangeHandler}
								/>
								<p>Drag files here?</p>
								<button
									type="button"
									class="btn btn-success btn-block"
									onClick={this.onClickHandler}
								>
									Upload
								</button>
							</div>
						</div>
					</div>
					<div class="nav-col-2">
						<div class="nav-text">
							<Link to="/home">FlipReset</Link>
						</div>
						<div class="nav-text2">
							<Link to="/search">Search</Link>
						</div>
					</div>
					<div class="nav-col-3">
						<div class="header-messages">
							<Link to="/messages">
								<i class="lab la-telegram-plane"></i>
							</Link>
							<Link to="/profile">
								<i class="las la-user"></i>
							</Link>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

const Header = compose(withRouter, withFirebase)(Head);

const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	};
};

export default connect(mapStateToProps, null)(Header);
