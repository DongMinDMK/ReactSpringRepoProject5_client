import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../style/mystargram.css"

function Join() {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdChk, setPwdChk] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [intro, setIntro] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [imgStyle, setImgStyle] = useState({display:"none"});
    // const [filename, setFilename] = useState("");

    const navigate = useNavigate();

    async function fileUpLoad(e){
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await axios.post("/api/members/fileupload", formData);
        // setFilename(result.data.savefilename)

        console.log(`result.data.savefilename : ${result.data.savefilename}`);
        setImgSrc(`http://localhost:8070/uploads/${result.data.savefilename}`);
        setImgStyle({display:"block", width:"300px"});
    }

    async function onsubmit(){
        if(!email){
            return window.alert("이메일을 입력해주세요...");
        }
        if(!pwd){
            return window.alert("비밀번호를 입력하세요.");
        }
        if(pwd != pwdChk){
            return window.alert("비밀번호 확인이 일치하지 않습니다.");
        }
        if(!nickname){
            return window.alert("닉네임을 입력하세요.");
        }

       try{
        let result = await axios.post("/api/members/emailCheck", null, {params: {email:email}})
        if(result.data.message=="NO"){
            return window.alert("이메일이 중복됩니다.");
        }

        result = await axios.post("/api/members/nickNameCheck", null, {params:{nickname:nickname}})
        if(result.data.message=="NO"){
            return window.alert("닉네임이 중복됩니다.");
        }

        result = await axios.post("/api/members/insertMember", {email:email, pwd:pwd, nickname:nickname, phone:phone, profilemsg:intro, profileimg:imgSrc})

        if(result.data.message=="OK"){
            window.alert("회원가입이 정상적으로 완료되었습니다.");
            navigate("/");
        }
       }catch(err){
        console.error(err);
       }

    }

  return (
    <div className='loginform'>
      <div className='logo' style={{fontSize:"2.0rem"}}>Member Join</div>
      <div className='field'>
        <label>E-MAIL</label>
        <input type="text" value={email} onChange={(e)=>{
            setEmail(e.currentTarget.value);
        }}></input>
      </div>
      <div className='field'>
        <label>NICKNAME</label>
        <input type="text" value={nickname} onChange={(e)=>{
            setNickname(e.currentTarget.value);
        }}></input>
      </div>
      <div className='field'>
        <label>PASSWORD</label>
        <input type="password" value={pwd} onChange={(e)=>{
            setPwd(e.currentTarget.value);
        }}></input>
      </div>
      <div className='field'>
        <label>RETYPE PASS</label>
        <input type="password" value={pwdChk} onChange={(e)=>{
            setPwdChk(e.currentTarget.value);
        }}></input>
      </div>
      <div className='field'>
        <label>PHONE</label>
        <input type="text" value={phone} onChange={(e)=>{
            setPhone(e.currentTarget.value);
        }}></input>
      </div>
      <div className='field'>
        <label>PROFILE MESSAGE(INTRO)</label>
        <input type="text" value={intro} onChange={(e)=>{
            setIntro(e.currentTarget.value);
        }}></input>
      </div>
      <div className='field'>
        <label>PROFILE IMAGE</label>
        <input type="file" onChange={(e)=>{
            fileUpLoad(e);
        }}></input>
      </div>
      <div className='field'>
        <label>PROFILE IMAGE PREVIEW</label>
        <div><img src={imgSrc} style={imgStyle}></img></div>
      </div>
      <div className='btns'>
        <button onClick={()=>{
            onsubmit();}}>JOIN</button>
        <button onClick={()=>{
            navigate("/");}}>BACK</button>
      </div>
    </div>
  )
}

export default Join

