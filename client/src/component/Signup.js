import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './Signup.scss'
import Logo from '../Logo.png'

import axios from "axios";


function Signup({ history }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  //회원가입 실패 alert 창 !
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPW, setWrongPW] = useState(false);
  const [wrongName, setWrongName] = useState(false);
  const [wrongQuestion, setWrongQuestion] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const onChangeHandler = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === "name") {
      setName(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    } else if (e.target.name === "passwordCheck") {
      setPasswordCheck(e.target.value)
    } else if (e.target.name === "answer") {
      setAnswer(e.target.value)
    }
  }

  const selectOptionHandler = (e) => {
    let questionSelect = document.querySelector('.question');
    console.log(questionSelect.options[questionSelect.selectedIndex].text);
    setQuestion(questionSelect.options[questionSelect.selectedIndex].text);
  }

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  const signUpBtnHandler = (e) => {
    console.log("email:", email);
    console.log("name:", name);
    console.log("password:", password);
    console.log("pwCheck:", passwordCheck);
    console.log("question:", question);
    console.log("answer:", answer);
    e.preventDefault();
    if (validate(email) && (password === passwordCheck) && (name !== "") && (question !== "") && (answer !== "")) {
      axios.post('https://don-forget-server.com/user/signup', {
        email: email,
        name: name,
        password: password,
        type: question,
        password_answer: answer
      })
        .then(res => console.log(res))
        .then(() => { history.push('/signin') })
    }
    else {
      validate(email) ? setWrongEmail(false) : setWrongEmail(true);
      ((password === passwordCheck) && password !== "") ? setWrongPW(false) : setWrongPW(true);
      (name !== "") ? setWrongName(false) : setWrongName(true);
      (question !== "") ? setWrongQuestion(false) : setWrongQuestion(true);
      (answer !== "") ? setWrongAnswer(false) : setWrongAnswer(true);
    }
  }

  return (
    <div className="signup">
      <div className="signup_content">
        <img className="logo" src={Logo} alt="Logo_don-forget" />
        <h1>Sign up</h1>
        <form className="inputValue">
          <input type="text" name="email" onChange={onChangeHandler} placeholder="이메일 주소 *" label="이메일 주소" />
          <input type="text" name="name" onChange={onChangeHandler} placeholder="이름 *" label="이름 *" />
          <input type="password" name="password" placeholder="비밀번호 *" label="비밀번호" onChange={onChangeHandler} />
          <input type="password" name="passwordCheck" placeholder="비밀번호 확인 *" label="비밀번호 확인" onChange={onChangeHandler} />
          <select className="question" onChange={selectOptionHandler}>
            <option value="" disabled selected>비밀번호 찾기 힌트 질문: *</option>
            <option value="1">가장 기억에 남는 선생님 성함은?</option>
            <option value="2">내가 존경하는 인물은?</option>
            <option value="3">나의 노래방 애창곡은?</option>
          </select>
          <input type="text" name="answer" placeholder="비밀번호 찾기 힌트 답 *" label="비밀번호 찾기 힌트 답" onChange={onChangeHandler} />
          <input name="agree" type="checkbox"></input>
          <label htmlFor="agree">개인정보 수집 동의</label>
          <div className={wrongEmail ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
             유효하지 않은 이메일입니다.
          </div>
          <div className={wrongPW ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            비밀번호가 일치하지 않습니다.
          </div>
          <div className={wrongName ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            이름을 입력해주세요.
          </div>
          <div className={wrongQuestion ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            비밀번호 찾기 힌트 질문을 선택해주세요.
          </div>
          <div className={wrongAnswer ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            비밀번호 찾기 힌트 답을 입력해주세요.
          </div>
          <button onClick={signUpBtnHandler}>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signup);
