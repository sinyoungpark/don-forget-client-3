import React, { useState } from 'react';
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
          <div className="desc">laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Intro);
