import axios from 'axios';
import React, { useState } from 'react';
import KaKaoLogin from 'react-kakao-login';

export default function KakaoSignUp() {
    const [data, setData] = useState("kakao")

    function responseKaKao(res) {
        console.log('res : ', res)
        setData(res);
        axios.post('https://www.don-forget.com/user/signin', {
            email: 'kakao',
            name: data.profile.properties.nickname
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
                useDefaultStyle={true}
            />
        </>
    );
}

