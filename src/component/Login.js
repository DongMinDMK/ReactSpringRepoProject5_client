import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, setFollowers, setFollowings } from '../store/userSlice';

import "../style/mystargram.css"

function Login() {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let loginUser = useSelector( state=>state.user );

  async function onLoginLocal(){
      if(!email){
        return window.alert("이메일을 입력하세요.");
      }
      if(!pwd){
        return window.alert("비밀번호를 입력하세요.");
      }

      try{
          const result = await axios.post("/api/members/loginLocal", {email:email, pwd:pwd})
      
          if(result.data.message == "OK"){
            const res = await axios.get("/api/members/getLoginUser")
            dispatch(loginAction(res.data.loginUser))
            dispatch(setFollowers({followers:res.data.followers}))
            dispatch(setFollowings({followings:res.data.followings}))
            
            navigate("/main");

          }else{
            setPwd("");
            window.alert(result.data.message);
          }
      }catch(err){
        console.error(err);
      }
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
        <button onClick={()=>{
          window.location.href='http://localhost:8070/members/kakaostart';
        }}>KAKAO</button>
        <button>NAVER</button>
        <button>GOOGLE</button>
        <button>FACEBOOK</button>
      </div>
    </div>
  )
}

export default Login