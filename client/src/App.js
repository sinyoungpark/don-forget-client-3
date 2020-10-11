import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Intro from "./component/Intro";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Nav from "./component/Nav";
import MyPage from './component/MyPage';
import "./App.css"
import { CSSTransitionGroup } from "react-transition-group";
import Schedule from "./component/Schedule";


function App(props) {

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");


  useEffect(() => {
    if (window.sessionStorage.getItem("id")) {
      setIsLogin(true);
      setUserId(window.sessionStorage.getItem("id"));
      setEmail(window.sessionStorage.getItem("email"));
      setName(window.sessionStorage.getItem("name"));
      console.log(userId);
    }
  })

  console.log(props.location.pathname);
  console.log(isLogin)
  console.log(email, name)

  return (
    <div className="App">
      <Nav />
      <div className={props.location.pathname === "/signin" || props.location.pathname === "/intro" || props.location.pathname === "/signup" ? "background" : "sideBackground"}>
        <Switch>
          <Route exact path="/intro" render={() => {
            return <Intro />
          }} />
          <Route path="/signin" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <Redirect to="/" />
            } else {
              return <Signin setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} userId={userId}/>
            }
          }} />
          <Route exact path="/signup" render={() => {
            return <Signup />
          }} />
           <Route exact path="/schedule" render={() => {
             if (window.sessionStorage.getItem("id")){
              return <Schedule userId={userId}/>
             } else {
               return <Redirect to="/"/>
             }
          }} />
          <Route exact path="/home" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <Home />
            } else {
              return <Redirect to="/signin" />
            }
          }} />
          <Route exact path="/mypage" render={() => {
            return <MyPage setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} />
          }} />
          <Route path="/" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <Redirect to="/home" />
            } else {
              return <Redirect to="/intro" />
            }
          }} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);