import axios from 'axios';
import React, { useState } from 'react';
import NaverLogin from 'react-naver-login';
export default function NaverSignUp(props) {
  function responseNaver(res) {
    axios.post('https://don-forget-server.com/user/signin', {
      email: ['naver', res.profile.emails[0].value],
      name: res.profile.displayName
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
        callbackUrl= "https://don-forget-server.com/oauth/naver/callback"
        // isPopup = {false}
        // callbackHandle = {false}
        render={(props) => <div onClick={props.onClick}>Naver Login</div>}
        // buttonText="Naver"
        onSuccess={responseNaver}
        onFailure={responseFail}
        // getProfile={true}
        // useDefaultStyle={false}
      />
    </>
  );
}
