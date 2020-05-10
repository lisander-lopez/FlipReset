import React, { Component } from "react";
import "./DM.css";
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
import { ListGroup } from "react-bootstrap";

import io from "socket.io-client";
const socket = io('http://localhost:3030');

const tit = () => (
	<div>
		<SlideInMyDM />
	</div>
);

class DM extends Component {

	constructor(props) {
		super(props);
		this.state = {
			allConvos: [],
		};
	}

	async componentDidMount() {
		let them;
		this.props.firebase.doGetUser(this.state.theirName)
			.then(async (result) => {
				them = result;
				console.log("their name: " + them);
			}, error => {
				console.log(error);
			});
		// this.props.firebase.doMakeNewDMConvo(this.props.user.displayname, this.state.theirName);
		// this.props.firebase.doTestSendDM("message", this.props.user.displayname, this.state.theirName);

		this.props.firebase.doGetUserDMConvos(this.props.user.displayname)
			.then(async (result) => {
				this.setState({
					allConvos: result
				});
				console.log("convos updated: ", this.state.allConvos);
			}, error => {
				console.log(error)
			});

		this.props.firebase.doGetConvoMessages(this.props.user.displayname, this.state.theirName);
	}

	render() {
		const loading = this.state.allConvos.length === 0;
		return (
			<div class="conversation-container">
				<AllConversations update={this.props.firebase.doGetUserDMConvos(this.props.user.displayname)} />
				<ConversationContainer />
			</div>
		);
	}
}

function newMessage(i, sender, message, didReceive) {
	console.log(message);
	return (
		<Message i={i} sender={sender} message={message} didReceive={didReceive} />
	);
}

const TestData = [
	{ i: 0, sender: "Me", message: "hello there", didReceive: false },
	{ i: 1, sender: "Justin", message: "General kenobi!", didReceive: true },
	{ i: 2, sender: "Me", message: "only a sith deals in absolutes!", didReceive: false },
	{ i: 3, sender: "Justin", message: "take a seat, young skywalker.", didReceive: true },
	{ i: 4, sender: "Me", message: "I am the senate!", didReceive: false },
];

class ConversationContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// messages contains a list of message metadata
			// the conversation component does all of the rendering
			messages: [],
			theirName: 'gurgleswamp',
			messageCount: 0,
		}
		this.updateMessageList = this.updateMessageList.bind(this);
	}

	// will be attached to send button of text box
	updateMessageList(message) {
		// const msgs = this.state.messages;
		// let tempMsgs = [];
		// tempMsgs.concat(msgs);
		// tempMsgs.push(message);

		this.setState({
			messages: this.state.messages.concat(message),
			messageCount: this.state.messages.length + 1
		});
	}

	render() {
		return (
			<div class="conversation-container">
				<ConversationHeader
					sender={this.state.theirName}
					messageCount={this.state.messageCount}
				/>
				<ConversationThread
					messages={this.state.messages}
				/>
				<TextBox
					i={this.state.messageCount}
					sender={((this.state.messageCount % 2 !== 0) ? this.state.theirName : "Me")}
					didReceive={((this.state.messageCount % 2 !== 0) ? true : false)}
					udpate={this.updateMessageList}
				/>
			</div>
		);
	}
}

// Conversation is just a render helper. It is a glorified list, taking in the messages
// state from conversationContainer
class ConversationThread extends Component {
	render() {
		return (
			<ul class="conversation-list">
				{this.props.messages.map(data => {
					return (
						<li key={data.i}>
							{newMessage(data.i, data.sender, data.message, data.didReceive)}
						</li>
					);
				})}
			</ul>
		);
	}
}

class ConversationHeader extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div class="conversation-header">
				<h3>Conversation with {this.props.sender}</h3>
				<h5>{this.props.messageCount} messages</h5>
			</div>
		);
	}
}

class Message extends Component {
	constructor(props) {
		super(props);
		this.toggleReceive = this.toggleReceive.bind(this);
	}

	// not used yet
	toggleReceive() {
		return (this.props.didReceive);
	}

	render() {
		return (
			<div class="message animated bounceInLeft delay-1s">
				<div class="message-header">
					<div class="message-author">
						<a href="#">
							<img
								src="https://www.speakingtigerbooks.com/wp-content/uploads/2016/09/facebook-default-no-profile-pic.jpg"
								alt="Author Picture"
								srcset=""
							/>
						</a>
						<p class="message-name">{this.props.sender}</p>
					</div>
					<div class="message-text">
						{this.props.message}
					</div>
				</div>
			</div>
		);
	}
}

class TextBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageText: '',
			isDisabled: true,
		};
	}

	handleChange = name => event => {
		event.preventDefault();
		this.setState({
			[name]: event.target.value,
			isDisabled: ((this.state.messageText === '') ? true : false)
		});
	}

	buildMessageData() {
		const text = this.state.messageText;
		console.log("FROM TEXTBOX: " + text);
		this.setState({
			messageText: '',
		});
		return ([{ i: this.props.i, sender: this.props.sender, message: text, didReceive: this.props.didReceive }]);
	}

	render() {
		return (
			<div class="input-container">
				<input
					type="text"
					name="messageText"
					id="messageText"
					class="message-message"
					placeholder="Enter your message to send..."
					value={this.state.messageText}
					onChange={this.handleChange("messageText")}
				/>
				<a
					href="#"
					class={`message-message-link ${this.state.isDisabled ? "disabled" : ""}`}
					onClick={() => this.props.udpate(this.buildMessageData())}
				>
					Send
				</a>
			</div>
		);
	}
}

// individual element for AllConversations, clickable card to render the
// selected conversation
class ConversationNode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lasMessage: 'hi',
			sender: 'Justin',
			messageCount: '5'
		}

	}
}

// List of all the conversations 
class AllConversations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conversations: [],
		};
		// this.generateConvoTabs = this.generateConvoTabs.bind(this);
	}

	async componentDidMount() {
		this.props.update.then(
			result => {
				this.setState({ conversations: result });
				console.log("PASSED CONVOS: ", this.state.conversations);
			}, error => {
				console.log(error);
			}
		);
	}

	printConvos(){
		// const {data} = this.state;
		let len = this.state.conversations.length;
		console.log("all convos to be parsed: ", this.state.conversations);
		console.log("arr len: ", len);
	}

	render() {
		return (
			<ul class="conversation-list">
				{this.printConvos()}
				{this.state.conversations.map(data => {
					return (
						<li key={data}>
							{data}
						</li>
					);
				})}
			</ul>
		);
	}
}


const SlideInMyDM = compose(withRouter, withFirebase)(DM);

const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	};
};


export default connect(mapStateToProps, null)(SlideInMyDM);