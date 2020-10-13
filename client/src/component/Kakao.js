import axios from 'axios';
import React, { Component } from 'react';
import KaKaoLogin from 'react-kakao-login';

class KakaoSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'kakao'
        }
    }
    responseKaKao = (res) => {
        console.log('res : ', res)
        this.setState({
            data: res
        })
        axios.post('https://www.don-forget.com/user/signin', {
            socialLogin: 'kakao',
            email: this.state.data.profile.kakao_account.email,
            name: this.state.data.profile.properties.nickname
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
        console.log(this.state.data)
    }
    responseFail = (err) => {
        alert(err);
    }
    render() {
        return (
            <>
                <KaKaoLogin
                    jsKey={'d7fcccce457540e5621e96787fac52a9'}
                    buttonText="KaKao"
                    onSuccess={this.responseKaKao}
                    onFailure={this.responseFail}
                    getProfile={true}
                    useDefaultStyle={true}
                />
            </>
        );
    }
}
export default KakaoSignUp;