import React, { useState } from "react"
import "./Signin.scss"
import axios from "axios";
import Logo from '../Logo.png';
import GoogleSignUp from './Google';
import FacebookSignUp from './Facebook';

type SigninProps = {
  setIsLogin : (isLogin:boolean) => void;
  setEmail : (email :string) => void;
  setName : (name : string) => void;
  setUserId : (userId : string) => void;
}

export default function Signin({setIsLogin, setEmail, setName, setUserId } : SigninProps){
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
  
  function handleLoginBtn(e:any) {
    e.preventDefault();
    axios.post('https://don-forget-server.com/user/signin', {
      email: email,
      password: password,
    }, {
      headers: { "Access-Control-Allow-Origin": "*" }
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

  function handleFindPw(e:any) {
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

  function openPwSettingModal(e:any) {
    e.preventDefault();
    if (password_answer === inputValue) {
      setNewPW(true);
    }
  }

  function setNewPw(e:any) {
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
      <img className="logo" src={Logo} alt="Logo_don-forget" />
      <h1>로그인</h1>
      <form className="inputValue">
        <input type="text" placeholder="이메일 주소 *" onChange={(e) => inputEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호 *" onChange={(e) => inputPW(e.target.value)} />
        <button className="login_btn" onClick={handleLoginBtn}>로그인</button>
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
      <span className="socialLogin">
         <GoogleSignUp setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} />
         <FacebookSignUp setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} />
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
            <button className="nextBtn" onClick={handleFindPw}>다음</button>
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
          <div className="findPwBtn">
            <button>취소</button>
            <button className="nextBtn" onClick={openPwSettingModal}>다음</button>
          </div>
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
          <div className="findPwBtn">
            <button onClick={setNewPw}>확인</button>
          </div>
        </div>
      </form>
    </div>
  )
}
