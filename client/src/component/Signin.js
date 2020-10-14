import React, { useState } from "react"
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import "./Signin.scss"
import { CSSTransitionGroup } from "react-transition-group";
import axios from "axios";
//import kakao-api
import KakaoSignUp from "./Kakao";
export default function Signin(props) {
    const { setIsLogin, setEmail, setName, setUserId } = props;
    const [email, inputEmail] = useState("");
    const [password, inputPW] = useState("");
    //findPW
    const [name, inputName] = useState("");
    //qustion
    const [password_question, setQuestion] = useState("");
    const [password_answer, setAnswer] = useState("");
    const [userid, getUserid] = useState("");
    const [inputValue, userAnswer] = useState("");
    //open 비밀번호 재설정 modal창 
    const [isOpenNewPW, setNewPW] = useState(false);
    const [passwordCheck, inputPWCheck] = useState("");
    //modal 창 isOpen
    const [isOpenStepOne, setStepOne] = useState(false);
    const [isOpenStepTwo, setStepTwo] = useState(false);
    //로그인 실패 alert 창 !
    const [isOpenAlert, setAlert] = useState(false);
    function handleLoginBtn(e) {
        e.preventDefault();
        axios.post('https://don-forget-server.com/user/signin', {
            email: email,
            password: password
        })
            .then((response) => response.data)
            .then((response) => {
                window.sessionStorage.setItem("id", response.id);
                window.sessionStorage.setItem("email", response.email);
                window.sessionStorage.setItem("name", response.name);
                setEmail(response.email);
                setName(response.name);
                setUserId(response.id);
                inputEmail("");
                inputPW("");
                setIsLogin(true);
            })
            .catch((err) => setAlert(true));
    }
    function handleFindPw(e) {
        e.preventDefault();
        axios.post('https://don-forget-server.com/user/findpassword/stepone', {
            name: name,
            email: email
        })
            .then((response) => response.data)
            .then((data) => {
                inputEmail("");
                inputName("");
                setQuestion(data.password_question);
                setAnswer(data.password_answer);
                getUserid(data.id)
                setStepTwo(true);
            })
            .catch((err) => console.log(err))
    }
    function openPwSettingModal(e) {
        e.preventDefault();
        if (password_answer === inputValue) {
            setNewPW(true);
        }
    }
    function setNewPw(e) {
        e.preventDefault();
        if (password === passwordCheck) {
            axios.post("https://don-forget-server.com/user/findpassword/resetpassword", {
                password: password,
                id: userid
            })
                .then((res) => console.log(res.data))
                .then(() => {
                    setStepOne(!isOpenStepOne)
                    setStepTwo(!isOpenStepTwo);
                    setNewPW(!isOpenNewPW);
                })
        }
    }
    return (
        <div className="signin">
            <Avatar style={{ backgroundColor: '#3b23a6' }}>
                <LockOutlinedIcon />
            </Avatar>
            <h1>Login</h1>
            <form className="inputValue">
                <input type="text" placeholder="Email Address *" label="Email Address" onChange={(e) => inputEmail(e.target.value)} />
                <input type="password" placeholder="Password *" label="password" onChange={(e) => inputPW(e.target.value)} />
                <button className="login_btn" onClick={handleLoginBtn}>LOGIN</button>
                <a href="비밀번호 찾기" onClick={(e) => {
                    e.preventDefault();
                    inputEmail("");
                    inputName("");
                    setStepOne(!isOpenStepOne);
                }}> 비밀번호 찾기 </a>
                <a href="/signup" className="signinLink">회원가입 </a>
                <div className={isOpenAlert ? "alert" : "none"}>
                    <strong> ⚠️ &nbsp; Error</strong>
                    아이디와 비밀번호가 일치하지 않습니다.
                </div>
            </form>
            <span>
                <KakaoSignUp setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} />
                <button className="naver">Naver</button>
            </span>
            <form className={isOpenStepOne ? "modal" : "none"}>
                <div className="content">
                    <h3>비밀번호 찾기 Step One</h3>
                    <p> 비밀번호를 찾고자 하는 아이디와 이름을 입력해 주세요.</p>
                    <div className="findPW">
                        <input type="text" placeholder="don-forget 이메일" onChange={(e) => inputEmail(e.target.value)} />
                        <input type="text" placeholder="don-forget 이름" onChange={(e) => inputName(e.target.value)} />
                    </div>
                    <div className="findPwBtn">
                        <button>취소</button>
                        <button onClick={handleFindPw}>다음</button>
                    </div>
                </div>
            </form>
            <form className={isOpenStepTwo ? "modal" : "none"}>
                <div className="content">
                    <h3>비밀번호 찾기 Step two</h3>
                    <p>{password_question}</p>
                    <div className="findPW">
                        <input type="text" placeholder="질문에 알맞는 응답을 입력해주세요" onChange={(e) => userAnswer(e.target.value)} />
                    </div>
                    <button>취소</button>
                    <button onClick={openPwSettingModal}>다음</button>
                </div>
            </form>
            <form className={isOpenNewPW ? "modal" : "none"}>
                <div className="content">
                    <h3>새 비밀번호 설정</h3>
                    <p>새 비밀번호를 입력해주세요.</p>
                    <div className="findPW">
                        <input type="text" placeholder="새 비밀번호 *" onChange={(e) => inputPW(e.target.value)} />
                        <input type="text" placeholder="비밀번호 확인 *" onChange={(e) => inputPWCheck(e.target.value)} />
                    </div>
                    <button onClick={setNewPw}>확인</button>
                </div>
            </form>
        </div>
    )
}