import React, {useState, useEffect} from 'react'
import '../../style/mypage.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MainMenu from '../MainMenu';
import { useSelector } from 'react-redux';

function MyPage() {

    const [word, setWord] = useState("");
    const [imgSrc, setImgSrc] = useState("http://localhost:8070/images/user.png");
    // const [loginUser, setLoginUser] = useState({});
    const loginUser = useSelector( state=>state.user );
    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [imgList, setImgList] = useState([]);
    const [postList, setPostList] = useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        // axios.get('/api/members/getLoginUser')
        // .then((result)=>{
        //     setLoginUser(result.data.loginUser);
        //     setFollowings(result.data.followings);
        //     setFollowers(result.data.followers);
        //     console.log(result.data.followings);

        //     if(result.data.loginUser.profileimg){
        //         setImgSrc(`${result.data.loginUser.profileimg}`);
        //     }
        // })
        // .catch((err)=>{console.error(err)})

        axios.get("/api/posts/getMyPost", {params:{writer:loginUser.nickname}})
        .then((result)=>{
            setImgList([...result.data.imgList]);
            setPostList([...result.data.postList]);
        })
        .catch((err)=>{
            console.error(err);
        })

        if(loginUser.profileimg){
            setImgSrc(`${loginUser.profileimg}`)
        }
    },[]
    )

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
                    <div>{(loginUser.followers)?(loginUser.followers.length):(0)}</div>
                </div>
                <div className='field'>
                    <label>FOLLOWINGS</label>
                    <div>{(loginUser.followings)?(loginUser.followings.length):(0)}</div>
                </div>
                <div className='field'>
                    <label>INTRO</label>
                    <div>{loginUser.profilemsg}</div>
                </div>
                <div className='btns'>
                    <button onClick={()=>{navigate("/editProfile")}}>EDIT PROFILE</button>
                    <button onClick={()=>{navigate("/writePost")}}>POST WRITE</button>
                </div>
                <div className='userpost' >
                {/* 한줄에 세개씩 이미지를 적당한 크기로 나열해주세요. 필요하다면  css 수정도 해주세요 */}
                {
                    (imgList)?(
                        imgList.map((imgs, idx)=>{
                            return (
                                <div key={idx} onClick={()=>{ navigate(`/postone/${postList[idx].id}`) }}>
                                    <img src={`http://localhost:8070/uploads/${imgs}`} />
                                </div>
                            )
                        })
                    ):(null)
                    
                }
            </div>
            </div>
        </div>
    </div>
  )
}

export default MyPage