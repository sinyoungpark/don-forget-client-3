import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './MyPage.css';
import axios from "axios";

function MyPage(props) {

  const { email, name, setIsLogin, setEmail, setName, history } = props;

  const [openName, setOpenName] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [isRightPassword, setIsRightPassword] = useState(false);
  const [changePassword, setChangePassword] = useState("");

  const signoutHandler = () => {
    console.log('signoutHandler');
    axios.post('http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/user/signout', {})
      .then(res => {
        setIsLogin(false);
        setEmail("");
        setName("");
        window.sessionStorage.clear();
      })
      .then(() => { history.push('/intro') })
      .catch((err) => console.log(err));
  }

  const changeNameHandler = () => {
    console.log(changeName);
    axios.post(`http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/user/changename/${window.sessionStorage.getItem("id")}`, {
      new_name: changeName
    })
      .then(res => {
        console.log(res.data);
        setOpenName(false);
      })
      .catch((err) => console.log(err));
  }

  const checkPasswordHandler = () => {

  }

  const changePasswordHandler = () => {

  }

  return (
    <div className="mypage">
      <div className="full_page">
        <h1>My Page</h1>
        <div className="userInfo">
          <h1>User Info:</h1>
          <div>{openName ? <>
            <input type="text" placeholder="변경할 이름을 입력해주세요."
              onChange={(e) => setChangeName(e.target.value)}></input>
            <button onClick={changeNameHandler}>✔︎</button>
          </> : name}</div>
          <div>{email}</div>
        </div>
        <button onClick={() => setOpenName(true)}>이름 변경</button>
        <button onClick={() => setOpenPassword(true)}>비밀번호 변경</button>
        <button onClick={signoutHandler}>로그아웃</button>

        <div className="changePasswordModal">
          <input type="password" placeholder="기존 비밀번호"></input>
          <button onClick={checkPasswordHandler}>check!</button>
          <input type="password" placeholder="새 비밀번호"></input>
          <input type="password" placeholder="새 비밀번호 확인"></input>
          <button onClick={changePasswordHandler}>check!</button>
          <button onClick={() => setOpenPassword(false)}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
