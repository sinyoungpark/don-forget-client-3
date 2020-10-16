import axios from 'axios';
import React, { useState } from 'react';
import NaverLogin from 'react-naver-login';
export default function NaverSignUp(props) {
  function responseNaver(res) {
    axios.post('https://don-forget-server.com/user/signin', {
      email: ['naver', res.user.getEmail()],
      name: res.getName()
    })
      .then((response) => response.data)
      .then((response) => {
        console.log(response);
        window.sessionStorage.setItem("id", response.id);
        window.sessionStorage.setItem("email", response.email);
        window.sessionStorage.setItem("name", response.name);
        props.setEmail(response.email);
        props.setName(response.name);
        props.setUserId(response.id);
        props.setIsLogin(true);
      })
      .catch((err) => console.log(err));
  }
  function responseFail(err) {
    alert(err);
  }
  return (
    <>
      <NaverLogin
        clientId= 'RVzosz8NSQef332q56bi'
        callbackUrl= "http://localhost:3000/home"
        isPopup = {true}
        // callbackHandle = {false}
        render={(props) => <button className="naver" onClick={props.onClick}>Sign in with Naver</button>}
        // buttonText="Naver"
        onSuccess={responseNaver}
        onFailure={responseFail}
        // getProfile={true}
        // useDefaultStyle={false}
      />
    </>
  );
}
