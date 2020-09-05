import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Card, CardContent, Typography } from '@material-ui/core';

const ChatroomPage = ({ match, socket }) => {
  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });
      messageRef.current.value = "";
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className="chatroomPage">
        <Link to="/login">
          <button
            onClick={()=>{
              localStorage.clear()
            }}
          >logout</button>
        </Link>
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {messages.map((message, i) => {
              const isUser = userId === messages.userId;
              return (
                <Card style={{margin:"10px", width:"70%"}}>
                <CardContent>
                <Typography key={i} className="message">
                  <span className={userId === message.userId ? "ownMessage" : "otherMessage"}>
                {message.name}:
              </span>{" "}
              {message.message}
            </Typography>
            </CardContent>
            </Card>
              )
          })}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              className="input"
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatroomPage);