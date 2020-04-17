import React, { Component } from "react";
// import "./home.css";
import { connect } from 'react-redux';
import { compose, fromRenderProps } from 'recompose';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter,
  useParams
} from "react-router-dom";
import { withFirebase } from '../Firebase/context';
import ReactPlayer from 'react-player';
import { Comment, CommentsThread } from './comment';
import TextBox from './textbox';

function newComment(author, text) {
  return (
    <Comment author={author} text={text} />
  );
}

class FlipPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profilePicSrc: "https://www.speakingtigerbooks.com/wp-content/uploads/2016/09/facebook-default-no-profile-pic.jpg",
      username: this.props.user.username,
      url: this.props.user.url,
      error: null,
      comments: [],
      likes: 0,
      didILike: false,
      caption: '',

    };
    this.updateCommentList = this.updateCommentList.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  updateCommentList(comment) {
    this.setState({
      comments: this.state.comments.concat(comment),
    });
  }

  handleLike = event => {
    event.preventDefault();
    var likeStatus = false;
    let i = 0;

    for (i; i < this.state.likedBy.length; i++) {
      if (this.state.likedBy[i] === this.state.username) {
        likeStatus = true;
        break;
      }
    }

    this.setState({
      likedBy: ((likeStatus === false) ?
        this.state.likedBy.concat(this.state.username) :
        this.state.likedBy.splice(i, 1)
      ),
      likes: ((likeStatus === false) ?
      this.state.likedBy.length + 1 :
      this.state.likedBy.length),
      didILike: likeStatus,
    });
  }

  // {this.props.user.username} 
  // url={this.state.url}

/*  */
  render() {
    return (
      <div class="post animated bounceInLeft delay-1s">
        <div class="post-header">
          <div class="post-author">
            <a href="#">
              <img
                src="https://www.speakingtigerbooks.com/wp-content/uploads/2016/09/facebook-default-no-profile-pic.jpg"
                alt="Author Picture"
                srcSet=""
              />
            </a>
            <p class="post-name">{this.state.username}</p>
          </div>
          <div class="post-settings">
            <a href="#">
              <img class="pure-img" src="imgs/report.svg" alt="" srcSet="" />
            </a>
          </div>
        </div>
        <div class="post-content">
          <div className='player-wrapper'>
            <ReactPlayer
              className='react-player'
              width='100%'
              height='100%'
            />
          </div>
        </div>
        <div class="post-footer">
          <div class="post-social">
            <i
              class={`las la-heart ${this.state.didILike ? "liked" : ""}`}
              id="like-elem"
              onClick={this.handleLike}></i>
            <i class="lar la-comment"></i>
          </div>
          <div class="post-divide"></div>
          <div class="post-LB">
            <i class="las la-heart black-heart"></i>
            <span id="numberOfLikes">{this.state.likes}</span> likes
					</div>
          <div class="post-status">
            <span class="userName">
              <b>{this.state.username}</b>
            </span>
            <span>{this.state.caption}</span>
          </div>
          <CommentsContainer
            comments={this.state.comments}
            username={this.state.username}
          />
        </div>
      </div>
    );
  }
}

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // comments contains a list of message metadata
      // the comments thread component does all of the rendering
      comments: this.props.comments,
    }
    this.updateCommentList = this.updateCommentList.bind(this);
  }

  // will be attached to send button of text box
  updateCommentList(comment) {
    this.setState({
      comments: this.state.comments.concat(comment),
    });
  }

  render() {
    return (
      <div>
        <div class="post-comments-container">
          <CommentsThread
            comments={this.state.comments}
            appender={newComment}
          />
        </div>
        <div class="post-divide"></div>
        <TextBox
          author={this.props.username}
          udpate={this.updateCommentList}
        />
      </div>
    );
  }
}

const PostyMcPostFace = compose(
  withRouter,
  withFirebase,
)(FlipPost);

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  }
}

export default connect(mapStateToProps, null)(PostyMcPostFace);

export default FlipPost;