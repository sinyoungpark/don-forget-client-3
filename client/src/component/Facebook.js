import axios from 'axios';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default function FacebookSignUp(props) {
  function responseFacebook(res) {
    axios.post('https://don-forget-server.com/user/signin', {
      email: ['facebook', res.email],
      name: res.name
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
      <FacebookLogin
        appId={'1872331759575671'}
        autoLoad={false}
        fields="name,email"
        callback={responseFacebook}
        render={renderProps => (
          <button className="FBLogin" onClick={renderProps.onClick}>페이스북으로 로그인하기</button>
        )}
      />
    </>
  );
}
