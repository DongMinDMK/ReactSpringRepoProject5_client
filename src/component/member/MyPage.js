import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainMenu from "../MainMenu";

import "../../style/mypage.css"

function MyPage() {

    const [word, setWord] = useState("");
    const [imgSrc, setImgSrc] = useState("http://localhost:5000/images/user.png");
    const [loginUser, setLoginUser] = useState({});
    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [imgList, setImgList] = useState([]);

    useEffect(()=>{
        axios.get('/api/members/getLoginUser')
        .then((result)=>{
            setLoginUser(result.data.loginUser);
            setFollowings(result.data.followings);
            setFollowers(result.data.followers);
            console.log(result.data.followings);

            if(result.data.loginUser.profileimg){
                setImgSrc(`${result.data.loginUser.profileimg}`);
            }
        })
        .catch((err)=>{console.error(err)})
    })

  return (
    <div className='mypage'>
        <MainMenu setWord={setWord}></MainMenu>
        <div className='userinfo'>
            <div className="img">
                <img src={imgSrc}></img>
            </div>
            <div className='profile'>
                <div className='field'>
                    <label>E-MAIL</label>
                    <div>{loginUser.email}</div>
                </div>
                <div className='field'>
                    <label>NICK NAME</label>
                    <div>{loginUser.nickname}</div>
                </div>
                <div className='field'>
                    <label>FOLLOWERS</label>
                    <div>{(followers)?(followers.length):(0)}</div>
                </div>
                <div className='field'>
                    <label>FOLLOWINGS</label>
                    <div>{(followings)?(followings.length):(0)}</div>
                </div>
                <div className='field'>
                    <label>INTRO</label>
                    <div>{loginUser.profilemsg}</div>
                </div>
                <div className='btns'>
                    <button>EDIT PROFILE</button>
                    <button>POST WRITE</button>
                </div>
                <div className='userpost'>
                    {/* 한줄에 세개씩 이미지를 적당한 크기로 나열해주세요 필요하다면 css 수정도 해주세요 */}
                    {/* {
                        (imgList)?(imgList.map((imgs, idx)=>{
                            return(
                                <div key={idx}>
                                    <img src={`http://localhost:5000/upimg/${imgs}`}></img>
                                </div>
                            )
                        })):(null)
                    } */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyPage