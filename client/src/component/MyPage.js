import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './MyPage.scss';
import axios from "axios";
import Chart from './Mypage_Chart';

function MyPage(props) {

  const { email, name, setIsLogin, setEmail, setName, history } = props;

  const [openName, setOpenName] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [isRightPassword, setIsRightPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  const signoutHandler = () => {
    console.log('signoutHandler');
    axios.post('https://don-forget-server.com/user/signout', {})
      .then(res => {
        setIsLogin(false);
        setEmail("");
        setName("");
        window.sessionStorage.clear();
      })
      .then(() => { history.push('/intro') })
      .catch((err) => console.log(err));
  }

  const changeNameHandler = (e) => {
    e.preventDefault();
    console.log(changeName);
    axios.post(`https://don-forget-server.com/user/changename/${window.sessionStorage.getItem("id")}`, {
      name: changeName
    })
      .then(res => {
        console.log(res.data);
        setOpenName(false);
        setName(changeName);
        window.sessionStorage.setItem("name", res.data.name);
      })
      .catch((err) => console.log(err));
  }

  const checkPasswordHandler = () => {
    axios.post(`https://don-forget-server.com/user/confirmuser/${window.sessionStorage.getItem("id")}`, {
      password: oldPassword
    })
      .then(res => {
        console.log(res.data);
        // 새 비밀번호 입력 창 띄움
        setIsRightPassword(true);
      })
      .catch((err) => {
        console.log(err)
        alert("비밀번호가 다릅니다.")
      });
  }

  const changePasswordHandler = () => {
    if (newPassword === newPasswordCheck) {
      axios.post(`https://don-forget-server.com/user/changepassword/${window.sessionStorage.getItem("id")}`, {
        password: newPassword
      })
        .then(res => {
          console.log(res.data);
          alert("비밀번호가 변경되었습니다.");
        })
        .then(() => {
          setOpenPassword(false);
          setIsRightPassword(false);
        })
        .catch((err) => console.log(err));
    }
    else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }

  return (
    <div className="mypage">
      <div className="full_page">
        <h1>My Page</h1>
        <div style={{ width: "90%", marginTop: 20, marginBottom: 20 }}>
          <Chart />
        </div>
        <div className="userInfo">
          <h1>User Info:</h1>
          <div>{openName ? <>
            <input type="text" placeholder="변경할 이름을 입력해주세요."
              onChange={(e) => setChangeName(e.target.value)}></input>
            <button onClick={changeNameHandler}>✔︎</button>
          </> : name}</div>
          <div>{email}</div>
        </div>
        <button className="changeBtn" onClick={() => setOpenName(!openName)}>이름 변경</button>
        <button className="changeBtn" onClick={() => setOpenPassword(!openPassword)}>비밀번호 변경</button>
        <button className="changeBtn" onClick={signoutHandler}>로그아웃</button>

        <div className={openPassword ? "changePasswordModal" : "none"}>
          <input type="password" placeholder="기존 비밀번호"
            onChange={(e) => setOldPassword(e.target.value)}></input>
          <button onClick={checkPasswordHandler}>check!</button>
          <div className={isRightPassword ? "newPw" : "none"}>
            <input type="password" placeholder="새 비밀번호"
              onChange={(e) => setNewPassword(e.target.value)}></input>
            <input type="password" placeholder="새 비밀번호 확인"
              onChange={(e) => setNewPasswordCheck(e.target.value)}></input>
            <button onClick={changePasswordHandler}>변경</button>
            <button onClick={() => setOpenPassword(false)}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
