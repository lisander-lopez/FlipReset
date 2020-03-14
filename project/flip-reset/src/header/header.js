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

function Header() {
	const toggleDropDown = event => {
		event.preventDefault();
		$("#dropdownMenu").toggle("show");
	};
	return (
		<div class="wide">
			<nav class="">
				<div class="nav-col-1">
					<div class="header-cam dropdown-btn">
						<a href="#" onClick={toggleDropDown}>
							<i class="las la-video"></i>
						</a>
						<div id="dropdownMenu" class="dropdown-content">
							<form action="upload.php" method="POST" id="uploadForm">
								<input type="file" multiple />
								<p>Drag your files here or click in this area.</p>
								<button type="submit">Upload</button>
							</form>
						</div>
					</div>
				</div>
				<div class="nav-col-2">
					<div class="nav-text">
						<Link to="/">FlipReset</Link>
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
export default Header;
