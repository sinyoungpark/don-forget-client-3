import React, { useState } from 'react';
import './Signup.css'
import Sample from '../Sample.png'

function Signup() {
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
      console.log("Email is Not Correct");
      return false;
    } else {
      console.log("Email is Correct");
      return true;
    }
  }

  const signUpBtnHandler = () => {
    // 진행 중
    console.log(email, name, password, passwordCheck);
  }

  return (
    <div className="signup">
      <div className="full_page">
        <div className="signup_content">
          <img className="logo_sample" src={Sample} alt="Sample" />
          <div className="signup_title">Sign up</div>
          <label>Email: *</label>
          <input type="text" name="email" onChange={onChangeHandler} />
          <label>Name: *</label>
          <input type="text" name="name" onChange={onChangeHandler} />
          <label>Password: *</label>
          <input type="password" name="password" onChange={onChangeHandler} />
          <input type="password" name="passwordCheck" onChange={onChangeHandler} />
          <label>Password Hint: *</label>
          <select>
            <option value="1">가장 기억에 남는 선생님 성함은?</option>
            <option value="2">내가 존경하는 인물은?</option>
            <option value="3">나의 노래방 애창곡은?</option>
          </select>
          <input type="text" />
          <input name="agree" type="checkbox"></input>
          <label htmlFor="agree">개인정보 수집 동의</label>
          <button onClick={signUpBtnHandler}>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
