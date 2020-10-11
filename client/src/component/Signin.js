import React, { useState } from "react"
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import "./Signin.css"
import { CSSTransitionGroup } from "react-transition-group";
import axios from "axios";


export default function Signin(props) {

    const { setIsLogin, setEmail, setName } = props;
    const [email, inputEmail] = useState("");
    const [password, inputPW] = useState("");

    function handleLoginBtn(e) {
        e.preventDefault();
        axios.post('http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/user/signin', {
            email: email,
            password: password
        })
            .then((response) => {
                setIsLogin(true);

                window.sessionStorage.setItem("id", response.id);
                window.sessionStorage.setItem("email", response.email);
                window.sessionStorage.setItem("name", response.name);

                setEmail(response.email);
                setName(response.name);
                inputEmail("");
                inputPW("");
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="signin">
            <Avatar style={{ backgroundColor: '#3b23a6' }}>
                <LockOutlinedIcon />
            </Avatar>
            <h1>
                Login
                 </h1>
            <form className="inputValue">
                <input type="text" placeholder="Email Address *" label="Email Address" onChange={(e) => inputEmail(e.target.value)} />
                <input type="text" placeholder="password *" label="password" onChange={(e) => inputPW(e.target.value)} />
                <button className="login_btn" onClick={handleLoginBtn}>LOGIN</button>
                <a href="#"> 비밀번호 찾기 </a>
                <a href="/signup" className="signinLink">회원가입 </a>
            </form>
            <span>
                <button className="kakao">Kakao</button>
                <button className="naver">Naver</button>
            </span>
        </div>
    )
}