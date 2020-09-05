import React from "react";
import { BrowserRouter, Switch, Route, useHistory, Link } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/Registerpage";
import DashboardPage from "./pages/Dashboardpage";
import IndexPage from "./pages/Indexpage";
import Chatroompage from "./pages/Chatroompage";
import io from "socket.io-client";
import makeToast from "./Toaster";

function App() {
  const history = useHistory()
  const [socket, setSocket] = React.useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };
  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route path="/login" render={()=><LoginPage setupSocket={setupSocket} />} exact />
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/dashboard" render={()=><DashboardPage socket={socket} />} exact />
        <Route path="/chatroom/:id" render={()=><Chatroompage socket={socket} />} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;