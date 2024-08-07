import './App.css';
import {  Routes, Route } from "react-router-dom";
import Login from "./component/Login"
import Join from "./component/member/Join"
import Main from "./component/Main"
import WritePost from "./component/post/WritePost"
import MyPage from "./component/member/MyPage"
import Kakaosaveinfo from './component/member/Kakaosaveinfo';
import PostOne from "./component/post/PostOne";
import EditProfile from "./component/member/EditProfile"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/join" element={<Join></Join>}></Route>
        <Route path="/main" element={<Main></Main>}></Route>
        <Route path="/writePost" element={<WritePost></WritePost>}></Route>
        <Route path="/mypage" element={<MyPage></MyPage>}></Route>
        <Route path="/kakaosaveinfo" element={<Kakaosaveinfo></Kakaosaveinfo>}></Route>
        <Route path='/postone/:postid' element={<PostOne></PostOne>}></Route>
        <Route path="/editProfile" element={<EditProfile></EditProfile>}></Route>
      </Routes>
    </div>
  );
}

export default App;
