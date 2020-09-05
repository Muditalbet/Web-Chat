import React from "react";
import {Link} from 'react-router-dom';
const IndexPage = (props) => {
  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    console.log(token);
    if (!token) {
      props.history.push("/");
    } else {
      props.history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [0]);


  return <div style={{display:"flex",justifyContent:"space-evenly", marginTop:"400px"}}>
    <Link to='/login'>
    <button style={{width:"400px", margin:"10px auto", fontSize:"30px", padding:"20px" }}>Login</button>
    </Link>
    <Link to='/register'>
    <button style={{width:"400px", margin:"10px auto", fontSize:"30px" , padding:"20px"}} >Register</button>
    </Link>
  </div>
};

export default IndexPage;