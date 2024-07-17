import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../style/posts.css"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const settings = {
    dot:false,
    arrows:false,
    infinite:false,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1
  }

function Posts(props) {

    const [loginUser, setLoginUser] = useState({});
    const [followings, setFollowings] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [images, setImages] = useState("");
    const [replyList, setReplyList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/api/members/getLoginUser')
        .then((result)=>{
            if(!result.data.loginUser){
                alert('로그인이 필요합니다');
                navigate('/');
            }
            setLoginUser(result.data.loginUser);
            setFollowings(result.data.followings);
            console.log(result.data.followings);
        })
        .catch((err)=>{console.error(err)})

        axios.get(`/api/posts/getImages/${props.post.id}`)
        .then((result)=>{
            setImages(result.data);
        })
        .catch((err)=>{console.error(err)})

        axios.get(`/api/posts/getLikes/${props.post.id}`)
        .then((result)=>{
            setLikeList(result.data);
        })
        .catch((err)=>{console.error(err)})
    },[]
    )


    async function onLike(){
        try{
            // 현재 로그인 유저의 닉네임과 현재 포스트의 id로 like 작업을 하고
            // 현재 로그인 유저의 닉네임과 현재 포스트의 id 를 서버에 보내서 내역이 있으면 삭제, 없으면 추가
            await axios.post("/api/posts/addLike", {postid:props.post.id, likenick:loginUser.nickname})

            // 현재 포스트의 like 를 재조회하고 likeList 를 갱신 합니다.
            const result = await axios.get(`/api/posts/getLikes/${props.post.id}`)
            setLikeList(result.data);


        }catch(err){
            console.error(err);
        }

    }

    async function onFollow(writer){
        // 클릭을 하면 팔로잉이 일어나게 하기
        // 한번 더 클릭을 하면 지우기
        try{
            await axios.post("/api/posts/follow", {follow_from:loginUser.nickname, follow_to:writer})
            const result = await axios.get("/api/posts/getFollowings");
            setFollowings(result.data);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className='post' style={{width:"780px"}}>
            <div className='writer' style={{display:"flex"}}>
                <div>{props.post.id}&nbsp;&nbsp;</div>
                <div>{props.post.writer}&nbsp;&nbsp;</div>
                {
                    (
                        (loginUser.nickname != props.post.writer) && (!followings.includes(props.post.writer))
                        ?(<button onClick={()=>{onFollow(props.post.writer)}}>FOLLOW</button>):
                        (null)
                    )
                }
            </div>
            {
            <Slider {...settings}>
                {
                    (images)?(images.map((img, idx)=>{
                    return (
                    <img key={idx} src={`http://localhost:5000/upimg/${img.savefilename}`} width="750" height="900"></img>
                    )
                    })):(null)
                }
            </Slider>
      }
            

            <div className='like'>
                {
                    (likeList)?( 
                        likeList.some(
                            (like)=>(loginUser.nickname==like.likenick) 
                        )
                        ?
                        ( <img src={`http://localhost:5000/images/delike.png`} onClick={ ()=>{ onLike() } } />)
                        :
                        (<img src={`http://localhost:5000/images/like.png`} onClick={ ()=>{ onLike() } }  />)
                    ):(
                        <img src={`http://localhost:5000/images/like.png`} onClick={ ()=>{ onLike() } }  />
                    )
                }

                &nbsp;&nbsp;
                <img src={`http://localhost:5000/images/reply.png`} />
            </div>
            <div className='like'>
                {
                    (likeList && likeList.length >= 1)?(<span>{likeList.length}명이 좋아합니다.</span>):(<span>아직 "좋아요"가 없어요</span>)
                }
            </div>
            <div className='content'>{props.post.content}</div>
            <div className='reply'>
                댓글 영역
            </div>
        </div>

    )
}

export default Posts