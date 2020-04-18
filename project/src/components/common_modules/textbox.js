import React, { Component } from 'react';


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

  buildData() {
    const textData = this.state.messageText;
    console.log("FROM TEXTBOX: " + textData);
    this.setState({
      messageText: '',
    });
    return ([{ author: this.props.author, text: textData }]);
  }

  render() {
    return (
      <div class="input-container">
        <input
          type="text"
          name="comment"
          id="postComment1"
          class="post-comment"
          placeholder="Add a comment..."
          value={this.state.messageText}
          onChange={this.handleChange("messageText")}
        />
        <a
          href="#"
          class={`message-message-link ${this.state.isDisabled ? "disabled" : ""}`}
          onClick={() => this.props.udpate(this.buildData())}
        >
          Send
				</a>
      </div>
    );
  }
}


export default TextBox;