import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/mainmenu.css"

function MainMenu() {

    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({});
    const [imgSrc, setImgSrc] = useState("http://localhost:5000/images/user.png");

    useEffect(()=>{
        axios.get("/api/members/getLoginUser")
        .then((result)=>{
            if(result.data.loginUser && result.data.loginUser.profileimg){
                setImgSrc(`${result.data.loginUser.profileimg}`);
                setLoginUser(result.data.loginUser);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
    )

    function onLogout(){

    }

  return (
    <div>
      <div className='topmenu' style={{marginTop:"10px"}}>
        <img src='http://localhost:5000/images/home.png' onClick={()=>{
          navigate("/main");
        }}></img>
        <img src='http://localhost:5000/images/write.png' onClick={()=>{
          navigate("/writePost");
        }}></img>
        <img src='http://localhost:5000/images/search.png'></img>
        <img src={imgSrc}></img>
        <img src='http://localhost:5000/images/logout.png' onClick={()=>{
          onLogout();
        }}></img>
      </div>
    </div>
  )
}

export default MainMenu