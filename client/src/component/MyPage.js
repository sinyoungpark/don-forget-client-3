import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './MyPage.scss';
import axios from "axios";
import Chart from './Mypage_Chart';
import cookie from 'react-cookies'

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
        cookie.remove('id');
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
        <div className="chart">
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
          <div className="mypage_buttons">
            <button className="changeBtn" onClick={() => setOpenName(!openName)}>이름 변경</button>
            <button className="changeBtn" onClick={() => setOpenPassword(!openPassword)}>비밀번호 변경</button>
            <button className="changeBtn" onClick={signoutHandler}>로그아웃</button>
          </div>
        </div>

        <div className={openPassword ? "changePasswordModal" : "none"}>
          <div className="changePW_content">

            <h3>비밀번호 변경하기</h3>

            <h4>Step 1.</h4>
            <input type="password" placeholder="기존 비밀번호"
              onChange={(e) => setOldPassword(e.target.value)}></input>
            <button onClick={() => setOpenPassword(false)}>취소</button>
            <button onClick={checkPasswordHandler}>확인</button>
            <div className={isRightPassword ? "newPw" : "none"}>
              <h4>Step 2.</h4>
              <input type="password" placeholder="새 비밀번호"
                onChange={(e) => setNewPassword(e.target.value)}></input>
              <input type="password" placeholder="새 비밀번호 확인"
                onChange={(e) => setNewPasswordCheck(e.target.value)}></input>
              <button onClick={() => setOpenPassword(false)}>취소</button>
              <button onClick={changePasswordHandler}>변경</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
