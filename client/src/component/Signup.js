import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './Signup.css'
import Sample from '../Sample.png'

const axios = require('axios');

function Signup({ history }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const onChangeHandler = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === "name") {
      setName(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    } else if (e.target.name === "passwordCheck") {
      setPasswordCheck(e.target.value)
    }
  }

  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  const signUpBtnHandler = () => {
    console.log(email, name, password, passwordCheck);

    if (validate(email) && (password === passwordCheck)) {
      axios.post('https://api.cakes.com/user/signin', {
        email: email,
        name: name,
        password: password,
        // password_question_id: password_question_id,
        // password_answer: password_answer
      })
        .then(res => res.json())
        .then(json => console.log(json.message))
        .then(() => { history.push('/signin') })
    } else {
      validate(email) ? console.log(true) : alert("유효하지 않은 이메일입니다");
      (password === passwordCheck && password !== "") ? console.log(true) : alert("비밀번호가 일치하지 않습니다");
    }
  }

  return (
    <div className="signup">
      <div className="signup_content">
        <img className="logo_sample" src={Sample} alt="Sample" />
        <h1>Sign up</h1>
        <form className="inputValue">
          <input type="text" name="email" onChange={onChangeHandler} placeholder="Email Address *" label="Email Address" />
          <input type="text" name="name" onChange={onChangeHandler} placeholder="Name *" label="Name *" />
          <input type="password" name="password" placeholder="password *" label="password" onChange={onChangeHandler} />
          <input type="password" name="password" placeholder="passwordCheck *" label="passwordCheck" onChange={onChangeHandler} />
          <select>
            <option value="" disabled selected>Password Hint: *</option>
            <option value="1">가장 기억에 남는 선생님 성함은?</option>
            <option value="2">내가 존경하는 인물은?</option>
            <option value="3">나의 노래방 애창곡은?</option>
          </select>
          <input type="text" placeholder="Answer *" label="Answer" />
          <input name="agree" type="checkbox"></input>
          <label htmlFor="agree">개인정보 수집 동의</label>
          <button onClick={signUpBtnHandler}>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signup);
