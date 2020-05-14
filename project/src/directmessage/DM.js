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
			activeConvo: {
				recipient: '',
				messages: [],
			},
			activeConvoID: 1,

		};
		console.log(this.props.user.displayname);
		this.setActiveConvoID = this.setActiveConvoID.bind(this);
		this.setActiveConvo = this.setActiveConvo.bind(this);
		this.updateMessageList = this.updateMessageList.bind(this);
	}

	async componentDidMount() {
		
	}

	setActiveConvoID(event, id) {
		event.preventDefault();
		this.setState({
			activeConvoID: id,
		});
		this.setActiveConvo(this.props.user.displayname);
		console.log("active convo: ", this.state.activeConvoID);
	}

	async setActiveConvo(name) {
		let id = this.state.activeConvoID;
		this.props.firebase.doGetConvo(name, id)
			.then(res => {
				this.setState({
					activeConvo: {
						recipient: res.recipient,
						messages: res.messages,
					}
				});
			}, e => {
				console.log(e);
			}
			);
	}

	async updateMessageList(message) {
		console.log("SENDING: ", message[0].message)
		this.props.firebase.doSendDM(this.props.user.displayname, this.state.activeConvo.recipient, message[0].message)
			.then(res => {
				console.log(res);
			}, e => {
				console.log(e);
			}
			);
		console.log(this.state.activeConvo);
	}

	render() {
		return (
			<div className="conversation-container">
				{this.state.activeConvoID}
				<AllConversations
					user={this.props.user.displayname}
					activeConvoID={this.setActiveConvoID}
					addConvo={this.props.firebase.doAddUserDMConvo}
					addDMUser={this.props.firebase.doAddUserDM}
					getUser={this.props.firebase.doGetUser}
					getConvos={this.props.firebase.doGetUserDMConvos}
					isUser={this.props.firebase.doIsDMUser}
				/>
				<div className="conversation-header">
					<h3>Conversation with {this.state.activeConvo.recipient}</h3>
					<h5>{this.state.activeConvo.messages.length} messages</h5>
				</div>
				<ul className="conversation-list">
					{this.state.activeConvo.messages.map(data => {
						return (
							<li key={data.i}>
								{newMessage(data.i, data.from, data.content)}
							</li>
						);
					})}
				</ul>
				<TextBox
					i={this.state.activeConvo.messages.length}
					sender={this.props.user.displayname}
					udpate={this.updateMessageList}
				/>
			</div>
		);
	}
}

function newMessage(i, sender, message) {
	console.log(message);
	return (
		<Message i={i} sender={sender} message={message} />
	);
}

const TestData = [
	{ i: 0, sender: "Me", message: "hello there" },
	{ i: 1, sender: "Justin", message: "General kenobi!" },
	{ i: 2, sender: "Me", message: "only a sith deals in absolutes!" },
	{ i: 3, sender: "Justin", message: "take a seat, young skywalker." },
	{ i: 4, sender: "Me", message: "I am the senate!" },
];

const TestConvoTabs = [
	{ i: 0, recipient: "gurgleswamp" },
	{ i: 1, recipient: "BringFreaks" },
	{ i: 2, recipient: "Redder04" },
]

class Message extends Component {
	constructor(props) {
		super(props);
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
		return ([{ i: this.props.i, sender: this.props.sender, message: text }]);
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
			nameText: '',
			activeConvoID: this.props.activeConvoID,
			conversations: [],
		};
		this.createNewConvo = this.createNewConvo.bind(this);
	}

	async componentDidMount() {
		console.log(this.props.user);
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

	async createNewConvo() {
		let myID = this.props.user;
		let them = this.state.nameText;
		// isUser checks the DM database not the users

		let theirID = await this.props.getUser(them);
		if (theirID == null) {
			console.log("not a user.");
			this.setState({
				nameText: ''
			});
			return;
		}

		this.props.isUser(myID).then(
			result => {
				if (result == []) {
					this.props.addDMUser(myID).then(
						secondResult => {
							console.log(secondResult)
						}, error => {
							console.log(error);
						});
				}
			}, error => {
				console.log(error);
			}
		);

		this.props.isUser(them).then(
			result => {
				if (result == []) {
					this.props.addDMUser(them).then(
						secondResult => {
							console.log(secondResult)
						}, error => {
							console.log(error);
						});
				}
			}, error => {
				console.log(error);
			}
		);
		console.log("them: :", them);
		console.log("myID:", myID);

		this.props.getConvos(myID).then(
			result => {
				if (result == []) {
					this.props.addConvo(myID, them).then(
						secondResult => {
							console.log(secondResult)
						}, error => {
							console.log(error);
						});
				}
				else {
					let found = false;
					for (let i = 0; i < result.length; i++) {
						if (result[i].recipient == them)
							found = true;
					}
					if (!found)
						this.props.addConvo(myID, them)
				}
			}, error => {
				console.log(error);
			}
		);
		this.props.getConvos(them).then(
			result => {
				if (result == []) {
					this.props.addConvo(them, myID).then(
						secondResult => {
							console.log(secondResult)
						}, error => {
							console.log(error);
						});
				}
				else {
					let found = false;
					for (let i = 0; i < result.length; i++) {
						if (result[i].recipient == myID)
							found = true;
					}
					if (!found)
						this.props.addConvo(them, myID)
				}
			}, error => {
				console.log(error);
			}
		);
		this.setState({
			nameText: ''
		});
		// get user
		// let this.state.nameText = await this.props.
	}



	handleChange = name => event => {
		event.preventDefault();
		this.setState({
			[name]: event.target.value
		});
	}

	render() {
		return (
			<div>
				<ul className="conversation-list">
					<li>
						<input
							value={this.state.nameText}
							onChange={this.handleChange("nameText")}>
						</input>
						<button
							onClick={this.createNewConvo}>
							New Conversation
						</button>
					</li>
					{this.state.conversations.map(data => {
						return (
							<li key={data._id}>
								<button onClick={(event) => this.props.activeConvoID(event, data._id)}>
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