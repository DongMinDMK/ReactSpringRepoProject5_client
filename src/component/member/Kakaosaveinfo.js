import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, setFollowers, setFollowings } from '../../store/userSlice';

function Kakaosaveinfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        ()=>{
            axios.get('/api/members/getLoginUser')
            .then((result)=>{
                dispatch( loginAction(result.data.loginUser) );
                dispatch( setFollowers( {followers:result.data.followers} ) );          
                dispatch( setFollowings( {followings:result.data.followings} ) );
                navigate('/main');   
            })
            .catch((err)=>{console.error(err)})
        },[]
    )

  return (
    <div></div>
  )
}

export default Kakaosaveinfo