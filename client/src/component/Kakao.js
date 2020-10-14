import axios from 'axios';
import React, { useState } from 'react';
import KaKaoLogin from 'react-kakao-login';

<<<<<<< HEAD
export default function KakaoSignUp() {
    function responseKaKao(res) {
        axios.post('https://www.don-forget.com/user/signin', {
=======
export default function KakaoSignUp(){
    function responseKaKao(res){
        axios.post('https://don-forget-server.com/user/signin', {
>>>>>>> 78cd0f7a50d04c2c51f095c879ad1052c7808860
            email: 'kakao',
            name: res.profile.properties.nickname
        })
            .then((response) => response.data)
            .then((response) => {
                window.sessionStorage.setItem("id", response.id);
                window.sessionStorage.setItem("email", response.email);
                window.sessionStorage.setItem("name", response.name);
                this.props.setEmail(response.email);
                this.props.setName(response.name);
                this.props.setUserId(response.id);
                this.props.setIsLogin(true);
            })
            .catch((err) => console.log(err));
    }

    function responseFail(err){
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
                    useDefaultStyle={true}
                />
            </>
        );
}

