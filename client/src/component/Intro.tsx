import React from 'react';
import { withRouter } from "react-router-dom";
import './Intro.scss';
import Logo from '../Logo.png';


function Intro() {

  return (
    <div className="intro">
      <div className="full_page">
        <div className="title_content">
          <img className="logo" src={Logo} alt="Logo_don-forget" />
          <div className="title">돈't forget</div>
          <div className="desc">고마운 사람에 대한 기억을 잊고 있진 않으신가요? 당신의 경조사를 쉽고 간편하게 기록해 보세요!</div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Intro);
