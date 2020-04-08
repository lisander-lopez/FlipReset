import React, { Component } from "react";
import $ from "jquery";
import "./header.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams
} from "react-router-dom";
import { connect } from 'react-redux';

class Header extends Component {
	constructor(props) {
        super(props);
    }

	toggleDropDown = event => {
		event.preventDefault();
		$("#dropdownMenu").toggle("show");
	};
	 
	render(){
	return (
		<div class="wide">
			<nav class="">
				<div class="nav-col-1">
					<div class="header-cam dropdown-btn">
						<a href="#" onClick={this.toggleDropDown}>
							<i class="las la-video"></i>
						</a>
						<div id="dropdownMenu" class="dropdown-content">
							<form action="upload.php" method="POST" id="uploadForm">
								<input type="file" multiple />
								<p>{this.props.user.username}</p>
								<button type="submit">Upload</button>
							</form>
						</div>
					</div>
				</div>
				<div class="nav-col-2">
					<div class="nav-text">
						<Link to="/home">FlipReset</Link>
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

const mapStateToProps = (state) => {
    const { user} = state;
    return {
      user,
    }
  }


  export default connect(mapStateToProps, null)(Header);
