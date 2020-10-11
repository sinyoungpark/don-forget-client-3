import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './MyPage.css';
import axios from "axios";

function MyPage(props) {

  const { setIsLogin, setEmail, setName } = props;

  const signoutHandler = () => {
    console.log('signoutHandler');
    axios.post('http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/user/signout', {})
      .then(res => {
        setIsLogin(false);
        setEmail("");
        setName("");
        window.sessionStorage.clear();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="mypage">
      <div className="full_page">
        <button onClick={signoutHandler}>logout</button>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
