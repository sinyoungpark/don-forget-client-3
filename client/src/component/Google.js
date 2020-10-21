import axios from 'axios';
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
export default function GoogleSignUp(props) {
  function responseGoogle(res) {
    axios.post('https://don-forget-server.com/user/signin', {
      email: ['google', res.profileObj.email],
      name: res.profileObj.name
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
      <GoogleLogin
        clientId={'85751289442-5o0ul7v700sr29t6rg1de1pjord5a5k4.apps.googleusercontent.com'}
        buttonText="구글로 로그인하기"
        onSuccess={responseGoogle}
        onFailure={responseFail}
        // getProfile={true}
        // useDefaultStyle={false}
        cookiePolicy={'single_host_origin'}
        // isSignedIn={true}
      />
    </>
  );
}
