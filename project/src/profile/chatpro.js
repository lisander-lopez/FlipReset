import React, { Component } from "react";
import "./chatpro.css";
import lessangry from "./lessangry.png"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    withRouter,
    useParams
} from "react-router-dom";
import { withFirebase } from '../components/Firebase/context'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux';
import { compose } from 'recompose';


const tit = () => (
    <div>
        <Chat />
    </div>
);


class ChatPro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.user.url,
            error: null,
        }
    }

    render() {
        
        return ([
            <div class="chatpro-container">
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
                            <p class="post-name">{this.props.user.username}</p>
                        </div>
                        <div class="post-settings">
                            <a href="#">
                                <img class="pure-img" src="imgs/report.svg" alt="" srcset="" />
                            </a>
                        </div>
                    </div>
                    <div class="post-content">
                        <div className='player-wrapper'>
                            <ReactPlayer
                                className='react-player'
                                url={this.state.url}
                                width='100%'
                                height='100%'
                            />
                        </div>
                    </div>
                    <div class="post-footer">
                        <div class="post-social">
                            <i class="las la-heart"></i>
                            <i class="lar la-comment"></i>
                        </div>
                        <div class="post-divide"></div>
                        <div class="post-LB">
                            <i class="las la-heart black-heart"></i>
                            <span id="numberOfLikes">4</span> likes
						</div>
                        <div class="post-status">
                            <span id="userName">
                                <b>Username</b>
                            </span>
                            <span>This is a posttt</span>
                        </div>
                        <div class="post-comments-container">
                            <ul class="post-comments">
                                <li class="comment">
                                    <span class="username">Redder04</span>
                                    <span class="comment-text">That was nuts!</span>
                                </li>
                                <li class="comment">
                                    <span class="username">J.</span>
                                    <span class="comment-text">Sick dude!</span>
                                </li>
                                <li class="comment">
                                    <span class="username">Tr</span>
                                    <span class="comment-text">No way!</span>
                                </li>
                                <li class="comment">
                                    <span class="username">Mike</span>
                                    <span class="comment-text">nuts</span>
                                </li>
                            </ul>
                        </div>
                        <div class="post-divide"></div>

                        <div class="input-container">
                            <input
                                type="text"
                                name="comment"
                                id="postComment1"
                                class="post-comment"
                                placeholder="Add a comment..."
                                onKeyUp={this.handleKeyUp}
                            />
                            <a href="#" class="post-comment-link disabled">
                                Post
							</a>
                        </div>
                    </div>
                </div>
            </div>

        ]);
    }




}


const Chat = compose(
    withRouter,
    withFirebase,
)(ChatPro);


const mapStateToProps = (state) => {
    const { user } = state;
    return {
        user,
    }
}


export default connect(mapStateToProps, null)(Chat);