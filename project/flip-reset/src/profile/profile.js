import React, { Component} from "react";
import "./profile.css";
import lessangry from "./lessangry.png";
import ChatPro from "./chatpro.js";
import {
	BrowserRouter as Router,
	Link,
} from "react-router-dom";

class Profile extends Component {
	/*
	// We are going to have to convert this component into a stateful component so that we pass the state onto chatpro 
	// For example you would do <Link to="/chatpro/:ID"<
	// we already did that in app.js 
	// we have all of the routing done already i just need to figure 
	// out how to make hte entire image clickable
	// <Route path="/chatpro">
	// <ChatPro />
	// </Route>
	// idk
	// it works and links properly don't worry about that shit just tellme HOW TO GET IT
	// TO ALL BE clickable
	// Should be what justins doing, wrapping it inside link, cause a link is basically a special a tag
	// and in CSS just target it 
	// what's the point of targeting in css
	// So you can style it, already got the style in the profile-post-content tag
	// But incase you want to change the actual a tags styling I guess, cause the link tag turns into a A tag when you
	// build it
	are you gonna be able to individually plug each photo's info when we get data in home?
		
	no on viewing a profile picture
	Well here look 
	
	ok so just in place of all of the random shit we have for usernames and comments and shit
	we just pull from the json and store in a variable?
	:D YESSSSSSS :D 
	ok
	The reason why I wwanted to use react cause it iintegrates "easily"
	your form upload.php would be sick if it was upload.go mr.
	????
	in MVC architecture it would be nice to use go as the controller instead of php mr
	yeah we're gonna use go for our database querying
	
	Yea thats why i'm gay I wnated to get LMFAOOOOOOOOOOO
	Everything is working the way its suppose to so thats good, since I WANTED you guys to use GO for database
	
	am i good just pulling your image styles instead of putting it in my own css file
	
	The  SGT COL MAJOR PVT GENERAL styling can be used, but since it uses 5 photos per row instead of 1 
	yeah i'm not even copying and pasting it's just pulling the syles straight from where i stole them
	so is that gonna be an issue i nthe future or are we good
	idk how it's even doing that

	All you have to do is change the class names so that the feed classnames are not the same as profile... in chatpro

	I DO NOT WANT TO
	





	OKKKK IMA DO OPSSSS BYE :D , keep me updated
	*/

	/*
		DATA SCHEME:
		personPosts OBJ
		[
			{
				"postID": 2121
				"url": "asdfasd.jpg"
			},
			{},
			{},
		]
	*/
	generatePosts() {
		let posts = [];
		for (let i = 0; i < 234; i++) {
			posts.push(
				<Link to="/chatpro" className="Deeznutsidk">
					<div class="profile-post-content"></div>
				</Link>
			);
		}
		console.log(posts);
		return posts;
	}
	render() {
		return ([
			<div class="grid-container">
				<div class="item1">USERNAME</div>
				<div class="item2"><img src={lessangry}></img></div>
				<div class="item3">FRIENDS: 23</div>
				<div class="item4">POSTS: 234</div>
				<div class="item5">MESSAGE</div>
				<div class="item6">FRIEND REQUEST</div>
			</div>,
			<div class="profile-feed">{this.generatePosts()}</div>
		]);

	}
}

export default Profile;
