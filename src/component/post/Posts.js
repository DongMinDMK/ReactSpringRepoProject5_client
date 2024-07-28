import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFollowings } from '../../store/userSlice';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import '../../style/posts.css';


const settings = {
    dot:false,
    arrows:false,
    infinite:false,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1
  }

function Posts(props) {

    // const [loginUser, setLoginUser] = useState({});
    const [followings, setFollowings2] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [images, setImages] = useState("");
    const [replyList, setReplyList] = useState([]);
    const [ viewVal, setViewVal ] = useState(false)
    const [ replyStyle, setReplyStyle] = useState({display:"none"})
    const [replyContent, setReplyContent]  = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let loginUser = useSelector( state=>state.user );

    useEffect(()=>{
        // axios.get('/api/members/getLoginUser')
        // .then((result)=>{
        //     if(!result.data.loginUser){
        //         alert('로그인이 필요합니다');
        //         navigate('/');
        //     }
        //     setLoginUser(result.data.loginUser);
        //     setFollowings(result.data.followings);
        //     console.log(result.data.followings);
        // })
        // .catch((err)=>{console.error(err)})

        setFollowings2([...loginUser.Followings])

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

        axios.get(`/api/posts/getReplys/${props.post.id}`)
        .then((result)=>{
            console.log(`result.data.replyList : ${result.data.replyList}`)
            setReplyList([...result.data.replyList]);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
    )

    useEffect(()=>{
        if(!viewVal){
            setReplyStyle({display:"none"})
        }else{
            setReplyStyle({display:"flex", margin:"5px 5px"})
        }
    },[viewVal]
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
            // setFollowings(result.data);
        }catch(err){
            console.error(err);
        }
    }

    function viewOrNot(){
        setViewVal(!viewVal);
    }

    async function deleteReply(id){
        try{
            await axios.delete(`/api/posts/deleteReply/${id}`)
            const result = await axios.get(`/api/posts/getReplys/${props.post.id}`)
            setReplyList([...result.data.replyList]);
        }catch(err){
            console.error(err);
        }
    }

    async function addReply(){
        try{
            await axios.post("/api/posts/insertReply", {postid:props.post.id, writer:loginUser.nickname, content:replyContent})
            const result = await axios.get(`/api/posts/getReplys/${props.post.id}`)
            setReplyList([...result.data.replyList]);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className='post' style={{width:"780px"}}>
            <div className='writer' style={{display:"flex"}}>
                <div>{props.post.id}&nbsp;&nbsp;</div>
                <div>{props.post.writer}&nbsp;&nbsp;</div>

                {/* 객체 some((변수)=>{}) : 객체의 요소 하나하나를 한번씩 '변수' 에 저장하고 익명함수를 반복 실행합니다.
                 대개는 익명함수에서 비교연산의 결과를 리턴하는데 그 결과가 모두 false 라면 최종 결과가 false 이며, 
                 리턴값 중 하나라도 true 가 있으면 최종결과는  true 입니다. 
                 위 명령은 내가 팔로잉 하는 사람들 중 현재 post 의 작성자가 있다면 true 없다면 false 가 결과가 됩니다.  
                 !followings.some((following)=>{following.follow_to == props.post.writer}) :  글쓴이가 내가 팔로잉 하는 사람 중에 없다면 
                 버튼을 보여줘라 이것은 객체배열을 들고 왔기 땜에 some, 즉 서버에서 조회한 레코드 들을 들고 왔기 때문에 객체 배열로 들고옴. 
                 하나만 들고오면 그냥 스트링 문자의 배열이기 때문에 includes() 를 쓰면 됨. */}
                {
                    (
                        (loginUser.nickname != props.post.writer) && (!followings.some((following)=>{return following.fto == props.post.writer}))
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
                    <img key={idx} src={`http://localhost:8070/uploads/${img.savefilename}`} width="750" height="900"></img>
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
                        ( <img src={`http://localhost:8070/images/delike.png`} onClick={ ()=>{ onLike() } } />)
                        :
                        (<img src={`http://localhost:8070/images/like.png`} onClick={ ()=>{ onLike() } }  />)
                    ):(
                        <img src={`http://localhost:8070/images/like.png`} onClick={ ()=>{ onLike() } }  />
                    )
                }

                &nbsp;&nbsp;
                <img src={`http://localhost:8070/images/reply.png`} onClick={()=>{viewOrNot()}} />
            </div>
            <div className='like'>
                {
                    (likeList && likeList.length >= 1)?(<span>{likeList.length}명이 좋아합니다.</span>):(<span>아직 "좋아요"가 없어요</span>)
                }
            </div>
            <div className='content'>{props.post.content}</div>
            <div className='reply'>
                {
                    (replyList && replyList.length >= 1)?(replyList.map((reply, idx)=>{
                        return (
                            <div key={idx} style={replyStyle}>
                                <div style={{flex:"1", fontWeight:"bold"}}>{reply.writer}&nbsp;</div>
                                <div style={{flex:"3"}}>{reply.content}</div>
                                <div style={{flex:"1", textAlign:"right"}}>
                                    {
                                        (reply.writer==loginUser.nickname)?(
                                            <button onClick={ ()=>{ deleteReply(reply.id)  } } style={{width:"100%"}}>삭제</button>
                                        ):(null)
                                    }
                                </div>
                            </div>   
                        )
                    })):(<div>아직 댓글이 없습니다.</div>)
                }
                <div style={replyStyle}>
                    <input type="text" style={{flex:"5"}} value={replyContent} onChange={
                        (e)=>{ setReplyContent( e.currentTarget.value) }
                    }/>
                    <button style={{flex:"1"}} onClick={
                        ()=>{ addReply() }
                    }>댓글입력</button>
                </div>
            </div>
        </div>

    )
}

export default Posts