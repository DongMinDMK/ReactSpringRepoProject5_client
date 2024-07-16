import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/mystargram.css"

function Login() {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  function onLoginLocal(){
    if(!email){
        return window.alert("이메일을 입력하세요.");
      }
      if(!pwd){
        return window.alert("비밀번호를 입력하세요.");
      }

      axios.post("/api/members/loginLocal", {email:email, pwd:pwd})
      .then((result)=>{
        if(result.data.message == "OK"){
            navigate("/main");
          }else{
            setPwd("");
            window.alert(result.data.message);
          }
      })
      .catch((err)=>{
        console.error(err);
      })
  }


  return (
    <div className='loginform'>
      <div className='field'>
        <label>E-MAIL</label>
        <input type="text" value={email} onChange={(e)=>{
          setEmail(e.currentTarget.value)
        }}></input>
      </div>
      <div className='field'>
        <label>PASSWORD</label>
        <input type="password" value={pwd} onChange={(e)=>{
          setPwd(e.currentTarget.value)
        }}></input>
      </div>
      <div className='btns'>
        <button onClick={()=>{
          onLoginLocal();
        }}>LOGIN</button>
        <button onClick={()=>{
          navigate("/join")
        }}>JOIN</button>
      </div>
      <div className='snslogin'>
        <button>KAKAO</button>
        <button>NAVER</button>
        <button>GOOGLE</button>
        <button>FACEBOOK</button>
      </div>
    </div>
  )
}

export default Login