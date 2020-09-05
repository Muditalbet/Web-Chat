import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import makeToast from "../Toaster";

const DashboardPage = (props) => {
  const chatroomNameRef = React.createRef()
  const [chatrooms, setChatrooms] = React.useState([]);
  
  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);
  
  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  const createChatroom = () =>{
    // console.log("test")
    const chatroomName = chatroomNameRef.current.value;
    axios
    .post("http://localhost:8000/chatroom", {
        name:chatroomName
    }).then((response)=>{
      makeToast("success", response.data.message)
      getChatrooms();
    }).catch((err)=>console.log(err))
  }


  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="Enter chat box name"
            ref={chatroomNameRef}
          />
        </div>
      </div>
      <button onClick={createChatroom}>Create Chatroom</button>
      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;