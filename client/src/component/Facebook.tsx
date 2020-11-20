import axios from 'axios';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


type FacebookProps = {
  setIsLogin : (isLogin:boolean) => void;
  setEmail : (email :string) => void;
  setName : (name : string) => void;
  setUserId : (userId : string) => void;
}


export default function FacebookSignUp({setIsLogin, setEmail, setName, setUserId} : FacebookProps) {
  function responseFacebook(res:any) {
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
        setEmail(response.email);
        setName(response.name);
        setUserId(response.id);
        setIsLogin(true);
      })
      .catch((err) => console.log(err));
  }
  function responseFail(err:any) {
    alert(err);
  }
  return (
    <>
      <FacebookLogin
        appId={'1872331759575671'}
        autoLoad={false}
        fields="name,email"
        callback={responseFacebook}
        render={(renderProps:any) => (
          <button className="FBLogin" onClick={renderProps.onClick}>페이스북으로 로그인하기</button>
        )}
      />
    </>
  );
}
