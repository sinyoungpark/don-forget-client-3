import React, { useState } from 'react';
import './Intro.css';
import Sample from '../Sample.png'

function Intro() {
  const [click, setClick] = useState(false);
  console.log(click);

  return (
    <div className="intro">
      <button
        className="loginBtn"
        onClick={() => setClick(!click)}
      >LOGIN</button>
      <div className="full_page">
        <div className="title_content">
          <img className="logo_sample" src={Sample} alt="Sample" />
          <div className="title">돈't forget</div>
          <div className="desc">laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium</div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
