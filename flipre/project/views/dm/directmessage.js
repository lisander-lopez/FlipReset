class DirectMessagesPage extends React.Component {
  render() {
    return (
      <div className="page-container">
        <h1 className="page-title">DIRECT MESSAGES</h1>
        <ConversationListContainer/>
        <ConversationContainer/>
      </div>
    );
  }
}

/* Container for links to all conversations. */
class ConversationListContainer extends React.Component {
  render() {
    return (
      <div>
        <ConversationListHeader />
        <ConversationList />
      </div>
    );
  }
}

/* Container for list header with search bar */
class ConversationListHeader extends React.Component {
  render() {
    return (
      <SearchTextBox />
    );
  }
}

/* Container for links to all conversations. */
class ConversationList extends React.Component {

  render() {
    return (
      <ui className="contacts">
        <li className="active">
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                className="rounded-circle user_img" />
              <span className="online_icon"></span>
            </div>
            <div className="user_info">
              <span>Khalid</span>
              <p>Kalid is online</p>
            </div>
          </div>
        </li>
        <li>
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img
                src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                className="rounded-circle user_img" />
              <span className="online_icon offline"></span>
            </div>
            <div className="user_info">
              <span>Taherah Big</span>
              <p>Taherah left 7 mins ago</p>
            </div>
          </div>
        </li>
        <li>
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg"
                className="rounded-circle user_img" />
              <span className="online_icon"></span>
            </div>
            <div className="user_info">
              <span>Sami Rafi</span>
              <p>Sami is online</p>
            </div>
          </div>
        </li>
        <li>
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img src="http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg"
                className="rounded-circle user_img" />
              <span className="online_icon offline"></span>
            </div>
            <div className="user_info">
              <span>Nargis Hawa</span>
              <p>Nargis left 30 mins ago</p>
            </div>
          </div>
        </li>
        <li>
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg"
                className="rounded-circle user_img" />
              <span className="online_icon offline"></span>
            </div>
            <div className="user_info">
              <span>Rashid Samim</span>
              <p>Rashid left 50 mins ago</p>
            </div>
          </div>
          <ConversationNode />
        </li>
      </ui>
    );
  }
}

/* Container for a link to a conversation thread. */
/* Thank Travis for the stupid component name. */
class ConversationNode extends React.Component {
  render() {
    return (
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg"
            className="rounded-circle user_img" />
          <span className="online_icon offline"></span>
        </div>
        <div className="user_info">
          <span>DOES A CONVO NODE RENDER??</span>
          <p>Rashid left 50 mins ago</p>
        </div>
      </div>
    );
  }
}

/* Container for the active conversation and its header. */
class ConversationContainer extends React.Component {
  render() {
    return (
      <div className="card-body msg_card_body">
        <ConversationHeader />
        <Conversation />
        <MessageTextBox />
      </div>
    );
  }
}

/* Container for the header of the active conversation. */
class ConversationHeader extends React.Component {
  render() {
    return (
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <ProfilePicture />
          <div className="user_info">
            <span>Chat with Justin</span>
            <p>69 Messages</p>
          </div>
          <div className="video_cam">
            <span><i className="fas fa-video"></i></span>
            <span><i className="fas fa-phone"></i></span>
          </div>
        </div>
        <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
        <OptionsMenu />
      </div>
    );
  }
}

/* Container for the active conversation thread. */
class Conversation extends React.Component {
  render() {
    return (
      <div className="card-body msg_card_body">
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img_msg" />
          </div>
          <div className="msg_cotainer">
            Hi, how are you samim?
          <span className="msg_time">8:40 AM, Today</span>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            Hi Khalid i am good tnx how about you?
          <span className="msg_time_send">8:55 AM, Today</span>
          </div>
          <div className="img_cont_msg">
            <img
              src="#"
              className="rounded-circle user_img_msg" />
          </div>
        </div>
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img_msg" />
          </div>
          <div className="msg_cotainer">
            I am good too, thank you for your chat template
          <span className="msg_time">9:00 AM, Today</span>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            You are welcome
          <span className="msg_time_send">9:05 AM, Today</span>
          </div>
          <div className="img_cont_msg">
            <img
              src="#"
              className="rounded-circle user_img_msg" />
          </div>
        </div>
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img_msg" />
          </div>
          <div className="msg_cotainer">
            I am looking for your next templates
          <span className="msg_time">9:07 AM, Today</span>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            Ok, thank you have a good day
          <span className="msg_time_send">9:10 AM, Today</span>
          </div>
          <div className="img_cont_msg">
            <img
              src="#"
              className="rounded-circle user_img_msg" />
          </div>
        </div>
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img_msg" />
          </div>
          <div className="msg_cotainer">
            Bye, see you
          <span className="msg_time">9:12 AM, Today</span>
          </div>
        </div>
        <Message />
      </div>
    );
  }
}

/* Object for an individual message. */
class Message extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-start mb-4">
        <ProfilePicture />
        <div className="msg_cotainer">
          DOES A MESSAGE LOAD???
        <span className="msg_time">9:12 AM, Today</span>
        </div>
      </div>
    );
  }
}

/* Object for entering a message and pressing send. */
class MessageTextBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { message: '' }
  }

  handleTextChange = event => {
    this.setState({ [name]: event.target.value });
  }

  render() {
    return (
      <div className="card-footer">
        <div className="input-group">
          <MediaSelector />
          <textarea name=""
            className="form-control type_msg"
            placeholder="Type your message..."
            value={this.state.message}
            onChange={this.handleTextChange}></textarea>
          <div className="input-group-append">
            <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
          </div>
        </div>
      </div>
    );
  }
}

/* Button for selecting different types of content to send. */
class MediaSelector extends React.Component {
  render() {
    return (
      <div className="input-group-append">
        <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
      </div>
    );
  }
}

/* Profile picture component */
class ProfilePicture extends React.Component {
  render() {
    return (
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            className="rounded-circle user_img" />
          <span className="online_icon"></span>
        </div>
      </div>
    );
  }
}

/* Component for dropdown menu. */
class OptionsMenu extends React.Component {
  render() {
    return (
      <div className="action_menu">
        <ul>
          <li><i className="fas fa-user-circle"></i> View profile</li>
          <li><i className="fas fa-users"></i> Add to close friends</li>
          <li><i className="fas fa-plus"></i> Add to group</li>
          <li><i className="fas fa-ban"></i> Block</li>
        </ul>
      </div>
    );
  }
}

/* Component for searching through messages. */
class SearchTextBox extends React.Component {
  render() {
    return (
      <div className="input-group">
        <input type="text" placeholder="Search..." name="" className="form-control search" />
        <div className="input-group-prepend">
          <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<DirectMessagesPage />, document.getElementById("root-dm"));