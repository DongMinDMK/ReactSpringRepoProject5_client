import React, {useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {  loginAction, setFollowers, setFollowings } from '../../store/userSlice';

function EditProfile() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdChk, setPwdChk] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [profilemsg,setProfilemsg] = useState("");
    const [oldImgsrc, setOldImgSrc] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [imgStyle, setImgStyle] = useState({display:"none"})
    const lUser = useSelector( state=>state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        setEmail( lUser.email )
        setNickname(lUser.nickname )
        setPhone( lUser.phone )
        setOldImgSrc( lUser.profileimg )
        setProfilemsg( lUser.profilemsg )

        if(lUser.provider == "KAKAO"){
            setPwd('KAKAO');
            setPwdChk('KAKAO');
            document.getElementById('pwd').enabled=false;
            document.getElementById('pwdchk').enabled=false;
        }
    },[]
    )

    function fileupload(e){
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        axios.post("/api/members/fileupload", formData)
        .then((result)=>{
            setImgSrc(`http://localhost:8070/uploads/${result.data.savefilename}`);
            setImgStyle({display:"block", width:"200px"})
        })
        .catch((err)=>{
            console.error(err);
        })

    }

    async function onSubmit(){
        if( !email ){return alert('이메일을 입력하세요')}
        if( !nickname ){return alert('닉네임을 입력하세요')}
        if( !pwd ){return alert('Password를 입력하세요')}
        if( pwd != pwdChk ){return alert('Password 확인이 일치하지 않습니다')}

        try{
            if(email != lUser.email){
                let result = await axios.post("/api/members/emailCheck", null, {params:{email:email}})
                if(result.data.message == "NO"){
                    return alert('닉네임이 중복됩니다');
                }
            }

            if(!imgSrc){
                setImgSrc(oldImgsrc)
            }

            // 회원정보 수정
            let result2 = await axios.post("/api/members/updateMember", {email:email, nickname:nickname, pwd:pwd, phone:phone, profileimg:imgSrc, profilemsg:profilemsg})
            if(result2.data.message == "OK"){
                window.alert("회원정보 수정이 완료되었습니다.");
                // 로그인유저 조회
                const res=await axios.get('/api/members/getLoginUser')
                 // 리덕스 수정
                 dispatch( loginAction( res.data.loginUser )  );     
                 dispatch( setFollowers( {followers:res.data.followers} ) );          
                 dispatch( setFollowings( {followings:res.data.followings} ) );
            }
            window.location.href='http://localhost:3000/mypage';

        }catch(err){
            console.error(err);
        }
    }

  return (
    <div className='loginform'>
            <div className="logo" style={{fontSize:"2.0rem"}}>Member Join</div>
            <div className='field'>
                <label>E-MAIL</label>
                <input type="text" value={email} onChange={
                    (e)=>{ setEmail( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>PASSWORD</label>
                <input type="password" id="pwd" value={pwd} onChange={
                    (e)=>{ setPwd( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>RETYPE PASS</label>
                <input type="password" id="pwdchk" value={pwdChk} onChange={
                    (e)=>{ setPwdChk( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>NICKNAME</label>
                <input type="text"  value={nickname} onChange={
                    (e)=>{ setNickname( e.currentTarget.value ) }
                } readOnly/>
            </div>
            <div className='field'>
                <label>PHONE</label>
                <input type="text" value={phone} onChange={
                    (e)=>{ setPhone( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>INTRO</label>
                <input type="text" value={profilemsg} onChange={
                    (e)=>{ setProfilemsg( e.currentTarget.value ) }
                }/>
            </div>

            <div className='field'>
                <label>Old profileimg</label>
                <div><img src={oldImgsrc} width="150" /></div>
            </div>

            <div className='field'>
                <label>PROFILE-IMG</label>
                <input type="file" onChange={(e)=>{ fileupload(e) }}/>
            </div>
            <div className='field'>
                <label>Profile img preview</label>
                <div><img src={imgSrc} style={imgStyle} /></div>
            </div>

            <div className='btns'>
                <button onClick={ ()=>{   onSubmit()    }  }>Update Profile</button>
                <button onClick={ ()=>{ navigate('/myPage')   }  }>BACK</button>
            </div>

        </div>
  )
}

export default EditProfile