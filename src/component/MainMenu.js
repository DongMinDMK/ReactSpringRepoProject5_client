import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, logoutAction } from '../store/userSlice';

import "../style/mainmenu.css"

function MainMenu(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let loginUser = useSelector( state=>state.user );
    // const [loginUser, setLoginUser] = useState({});
    const [imgSrc, setImgSrc] = useState("http://localhost:8070/images/user.png");
    const [viewOrNot, setViewOrNot] = useState(false);
    const [searchTag, setSearchTag] = useState("");
    const [inputStyle, setInputStyle] = useState({display:"none"});

    useEffect(()=>{
        // axios.get("/api/members/getLoginUser")
        // .then((result)=>{
        //     if(result.data.loginUser && result.data.loginUser.profileimg){
        //         setImgSrc(`${result.data.loginUser.profileimg}`);
        //         setLoginUser(result.data.loginUser);
        //     }
        // })
        // .catch((err)=>{
        //     console.error(err);
        // })

    },[]
    )

    useEffect(
      ()=>{
          if( loginUser.profileimg ){
                   setImgSrc(loginUser.profileimg);
          } 
      },[]
    )

    useEffect(()=>{
      if(!viewOrNot){
        setInputStyle({display:"none"})
        props.setWord("n");
        setSearchTag("");
      }else{
        setInputStyle({display:"flex", margin:"5px 5px"});
      }
    },[viewOrNot]
    )

    function onLogout(){
      axios.get("/api/members/logout")
      .then(()=>{
        navigate("/");
      })
      .catch((err)=>{
        console.error(err);
      })
    }

    function onSearch(){
      props.setWord(searchTag)
    }

  return (
    <div>
      <div className='topmenu' style={{marginTop:"10px"}}>
        <img src='http://localhost:8070/images/home.png' onClick={()=>{
          navigate("/main");
        }}></img>
        <img src='http://localhost:8070/images/write.png' onClick={()=>{
          navigate("/writePost");
        }}></img>
        <img src='http://localhost:8070/images/search.png' onClick={()=>{setViewOrNot(!viewOrNot)}}></img>
        <img src={imgSrc} onClick={()=>{navigate("/mypage")}}></img>
        <img src='http://localhost:8070/images/logout.png' onClick={()=>{
          onLogout();
        }}></img>
      </div>

      <div className="search" style={inputStyle}>
        <input type="text" value={searchTag} style={{flex:"4", padding:"3px"}} onChange={(e)=>{
          setSearchTag(e.currentTarget.value)
        }}></input>
        <button style={{flex:"1", padding:"3px"}} onClick={()=>{onSearch()}}>해시태그 검색</button>
      </div>
    </div>
  )
}

export default MainMenu