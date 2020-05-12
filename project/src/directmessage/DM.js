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
import { Dropdown } from "react-bootstrap";

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
		console.log(this.props.user);
	}

	async componentDidMount() {

	}

	render() {
		return (
			<div className="conversation-container">
				<AllConversations
					userID={this.props.user.uid}
					addConvo={this.props.firebase.doAddUserDMConvo}
					addDMUser={this.props.firebase.doAddUserDM}
					getUser={this.props.doGetUser}
					getConvos={this.props.firebase.doGetUserDMConvos}
				/>
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

const TestConvoTabs = [
	{ i: 0, recipient: "gurgleswamp" },
	{ i: 1, recipient: "BringFreaks" },
	{ i: 2, recipient: "Redder04" },
]

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
			<div className="conversation-container">
				{/* <div>my name: {this.props.user.username}</div> */}
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
			<ul className="conversation-list">
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
			<div className="conversation-header">
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
			<div className="message animated bounceInLeft delay-1s">
				<div className="message-header">
					<div className="message-author">
						<a href="#">
							<img
								src="https://www.speakingtigerbooks.com/wp-content/uploads/2016/09/facebook-default-no-profile-pic.jpg"
								alt="Author Picture"
								srcset=""
							/>
						</a>
						<p className="message-name">{this.props.sender}</p>
					</div>
					<div className="message-text">
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
			<div className="input-container">
				<input
					type="text"
					name="messageText"
					id="messageText"
					className="message-message"
					placeholder="Enter your message to send..."
					value={this.state.messageText}
					onChange={this.handleChange("messageText")}
				/>
				<a
					href="#"
					className={`message-message-link ${this.state.isDisabled ? "disabled" : ""}`}
					onClick={() => this.props.udpate(this.buildMessageData())}
				>
					Send
				</a>
			</div>
		);
	}
}

// List of all the conversations 
class AllConversations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeConvo: 0,
			conversations: [],
		};
		this.selectConvo = this.selectConvo.bind(this);
	}

	async componentDidMount() {
		socket.on("timestamp", timestamp => {
			console.log("TIMESTAMP HIT! Getting convos...");
			this.props.getConvos(this.props.user).then(
				result => {
					this.setState({
						conversations: result,
					});
					console.log("result: ", this.state.conversations);
				}, error => {
					console.log(error);
				}
			);
		});
		this.props.getConvos(this.props.user).then(
			result => {
				this.setState({
					conversations: result,
				});
				console.log("result: ", this.state.conversations);
			}, error => {
				console.log(error);
			}
		);
	}

	render() {
		return (
			<div>
				<ul className="conversation-list">
					{TestConvoTabs.map(data => {
						return (
							<li key={data.i}>
								<button>
									{data.recipient}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
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