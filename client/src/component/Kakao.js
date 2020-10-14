import axios from 'axios';
import React, { useState } from 'react';
import KaKaoLogin from 'react-kakao-login';
export default function KakaoSignUp(props) {
  function responseKaKao(res) {
    axios.post('https://don-forget-server.com/user/signin', {
      email: ['kakao', res.profile.properties.nickname],
      name: res.profile.properties.nickname
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
      <KaKaoLogin
        jsKey={'d7fcccce457540e5621e96787fac52a9'}
        buttonText="KaKao"
        onSuccess={responseKaKao}
        onFailure={responseFail}
        getProfile={true}
        useDefaultStyle={false}
      />
    </>
  );
}
