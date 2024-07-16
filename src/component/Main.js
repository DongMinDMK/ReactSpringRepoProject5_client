import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainMenu from "./MainMenu";
import Posts from "./post/Posts";
import "../style/posts.css"

function Main() {
  const [loginUser, setLoginUser] = useState({});
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("/api/members/getLoginUser")
    .then((result)=>{
      if(!result.data.loginUser){
        window.alert("로그인이 필요합니다.");
        navigate("/");
      }
      setLoginUser(result.data.loginUser);
    })
    .catch((err)=>{
      console.error(err);
    })


    axios.get("/api/posts/getPostList")
    .then((result)=>{
      console.log(result.data.postList);
      setPostList(result.data.postList)
    })
    .catch((err)=>{
      console.error(err);
    })
  },[]
  )


  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <MainMenu></MainMenu>
      {/* <MainMenu loginUser={loginUser}></MainMenu>  첫번째 방법 props 이용*/} 
      <div className="Posts">
        {
          (postList)?(
            postList.map((post, idx)=>{
              return (<Posts post={post}></Posts>) // Posts.js 컴포넌트의 props로 전달
            })
          ):(null)
        }
      </div>
    </div>
  )
}

export default Main