import React, { Component } from "react";
import "./DM.css";
class DM extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conversee: 'Justin'
		};
	}
	messageTitle(i) {
		if (i % 2 !== 0) {
			return (this.state.conversee);
		}
		else {
			return ("Me");
		}
	}

	generateMessages() {
		let messages = [];

		// Outer loop to create parent
		for (let i = 0; i < 5; i++) {
			//Create the parent and add the children
			messages.push(
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
							<p class="post-name">{this.messageTitle(i)}</p>
						</div>
						<div class="post-settings">
							<a href="#">
								<img class="pure-img" src="imgs/report.svg" alt="" srcset="" />
							</a>
						</div>
					</div>
					<Message />
				</div>
			);
		}
		console.log(messages);
		return messages;
	}
	render() {
		return (
			<div class="feed">
				<ConversationHeader />
				{this.generateMessages()}
				<TextBox />
			</div>
		);
	}
}

export default DM;

class Conversation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
		}
	}
	render() {
		return (
			<Message />
		);
	}
}

class ConversationHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conversee: 'Justin',
			messageCount: '5'
		}
	}
	render() {
		return (
			<div>
				<h3>Conversation with {this.state.conversee}</h3>
				<h5>{this.state.messageCount} messages</h5>
			</div>
		);
	}
}

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'hi',
			didReceive: false,
		}
	}
	render() {
		return (
			<div className="message" id={this.state.didReceive}>
				{this.state.message}
			</div>
		);
	}
}

class TextBox extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div class="input-container">
				<input
					type="text"
					name="message"
					id="postmessage1"
					class="post-message"
					placeholder="Enter your message to send..."
					onKeyUp={this.handleKeyUp}
				/>
				<a href="#" class="post-message-link disabled">
					Send
			</a>
			</div>
		);
	}
}

class ConversationList extends Component {
	constructor(props) {
		super(props);
	}
}
