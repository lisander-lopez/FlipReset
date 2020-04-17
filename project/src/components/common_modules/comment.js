import React, { Component } from "react";

const Comment = ({ author, text }) => {
	return (
		<div>
			<span class="username">
				<a href="#">{author}</a>
			</span>
			<span class="comment-text">{text}</span>
		</div>
	);
}

class CommentsThread extends Component {
  render() {
    return (
      <ul class="post-comments">
        {this.props.comments.map(data => {
          return (
            <li key={data.text} class="comment">
              {this.props.appender(data.author, data.text)}
            </li>
          );
        })}
      </ul>
    );
  }
}

export { Comment, CommentsThread };