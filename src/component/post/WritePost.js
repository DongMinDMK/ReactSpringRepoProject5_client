import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainMenu from '../MainMenu';
import { useSelector } from 'react-redux';

import "../../style/writepost.css"

function Posts(props) {

    const[imgSrc1, setImgSrc1] = useState("");

    const[imgSrc2, setImgSrc2] = useState("");

    const[imgSrc3, setImgSrc3] = useState("");

    const[imgSrc4, setImgSrc4] = useState("");

    const[imgSrc5, setImgSrc5] = useState("");

    const[imgSrc6, setImgSrc6] = useState("");

    const[imgSrc7, setImgSrc7] = useState("");

    const[imgSrc8, setImgSrc8] = useState("");

    const[imgSrc9, setImgSrc9] = useState("");

    const[imgSrc10, setImgSrc10] = useState("");

    const [divStyle2, setDivStyle2] = useState({display:"none"});

    const [divStyle3, setDivStyle3] = useState({display:"none"});

    const [divStyle4, setDivStyle4] = useState({display:"none"});

    const [divStyle5, setDivStyle5] = useState({display:"none"});

    const [divStyle6, setDivStyle6] = useState({display:"none"});

    const [divStyle7, setDivStyle7] = useState({display:"none"});

    const [divStyle8, setDivStyle8] = useState({display:"none"});

    const [divStyle9, setDivStyle9] = useState({display:"none"});

    const [divStyle10, setDivStyle10] = useState({display:"none"});

    const [imgList, setImgList] = useState([]);

    const [content, setContent] = useState("");

    const [word, setWord] = useState("");
    const loginUser = useSelector( state=>state.user );

    // const [loginUser, setLoginUser] = useState({});

    const navigate = useNavigate();

    const fieldStyle={
        width:"100%",   
        display:"flex",
        margin:"5px 0",
        justifyContent:"space-between",
        border:"1px solid black",
    }

    useEffect(()=>{

    },[]

    )

    async function imgUpload(e, n){
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        const result = await axios.post("/api/posts/imgup", formData);

        if(n == 1){
            setDivStyle2(fieldStyle);
            setImgSrc1(`http://localhost:8070/uploads/${result.data.savefilename}`);
        }else if(n == 2){

            setDivStyle3(fieldStyle);

            setImgSrc2(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }else if(n == 3){

            setDivStyle4(fieldStyle);

            setImgSrc3(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }else if(n == 4){

            setDivStyle5(fieldStyle);

            setImgSrc4(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }else if(n == 5){

            setDivStyle6(fieldStyle);

            setImgSrc5(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }else if(n == 6){

            setDivStyle7(fieldStyle);

            setImgSrc6(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }else if(n == 7){

            setDivStyle8(fieldStyle);

            setImgSrc7(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }else if(n == 8){

            setDivStyle9(fieldStyle);

            setImgSrc8(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }else if(n == 9){

            setDivStyle10(fieldStyle);

            setImgSrc9(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }else if(n == 10){

            setImgSrc10(`http://localhost:8070/uploads/${result.data.savefilename}`);

        }

        let arr = [...imgList];

        arr.push(result.data.savefilename);

        setImgList([...arr]);

        console.log(imgList);
    }

    async function onsubmit(){
        if(!content){

            return window.alert("내용을 입력하세요...");

        }

        if(!imgList){

            return window.alert("이미지를 하나이상 선택하세요...");

        }

        // content 와 작성자로 post 테이블에 레코드를 추가 이때 insert 된 레코드의 id 를 리턴

        const result = await axios.post("/api/posts/insertPost", {content:content, writer:loginUser.nickname})

        let postid = result.data.id;

        // 리턴된 아이디와 이미지 이름들로 images 테이블에 레코드들을 추가

        for(let i=0; i<imgList.length; i++){

           await axios.post("/api/posts/insertImages", {postid:postid, savefilename:imgList[i]})

        }

        // window.location.href="http://localhost:3000/main"

        window.alert("게시물 등록이 정상적으로 완료되었습니다.");
        navigate("/main");
    }
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <MainMenu setWord={setWord}></MainMenu>
        <div className='postWrite'>
            <div className='title' style={{fontFamily:"Dancing Script", fontSize:"150%"}}>Feed Write</div>
            <div className='field'>
                <label>content</label>
                <textarea rows="7" value={content} onChange={(e)=>{
                    setContent(e.currentTarget.value);
                }}></textarea>
            </div>

            <div className='field' id="img1">

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 1) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>
            <img src={imgSrc1} height="50"></img>

            <div className='field' id="img2" style={divStyle2}>
                <input type="file" onChange={(e)=>{
                    imgUpload(e, 2) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄
                }}></input>
            </div>
            <img src={imgSrc2} height="50"></img>
            
            <div className='field' id="img3" style={divStyle3}>

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 3) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>

            <img src={imgSrc3} height="50"></img>
            
            <div className='field' id="img4" style={divStyle4}>

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 4) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>

            <img src={imgSrc4} height="50"></img>

            <div className='field' id="img5" style={divStyle5}>

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 5) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>

            <img src={imgSrc5} height="50"></img>

            <div className='field' id="img6" style={divStyle6}>

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 6) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>

            <img src={imgSrc6} height="50"></img>

            <div className='field' id="img7" style={divStyle7}>

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 7) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>

            <img src={imgSrc7} height="50"></img>

            <div className='field' id="img8" style={divStyle8}>

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 8) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>

            <img src={imgSrc8} height="50"></img>

            <div className='field' id="img9" style={divStyle9}>

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 9) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>

            <img src={imgSrc9} height="50"></img>

            <div className='field' id="img10" style={divStyle10}>

                <input type="file" onChange={(e)=>{

                    imgUpload(e, 10) // 첫번째 이미지라는 의미에서 파라미터로 1을 같이 보냄

                }}></input>

            </div>

            <img src={imgSrc10} height="50"></img>

            <div className='btns'>

                <button onClick={()=>{

                    onsubmit()

                }}>작성완료</button>

                <button onClick={()=>{

                    navigate("/main")

                }}>메인으로</button>

            </div>

        </div>

    </div>
  )
}

export default Posts