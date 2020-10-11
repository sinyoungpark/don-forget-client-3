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

function App(props) {

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
    if (window.sessionStorage.getItem("id")) {
      setIsLogin(true);
      setEmail(window.sessionStorage.getItem("email"));
      setName(window.sessionStorage.getItem("name"));
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
            if (isLogin) {
              return <Home />
            }
            return <Intro />
          }} />
          <Route path="/signin" render={() => {
            if (isLogin) {
              return <Redirect to="/" />
            } else {
              return <Signin setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} />
            }
          }} />
          <Route exact path="/signup" render={() => {
            return <Signup />
          }} />
          <Route exact path="/home" render={() => {
            if (isLogin) {
              return <Home />
            }
            return <Redirect to="/signin" />
          }} />
          <Route exact path="/mypage" render={() => {
            return <MyPage setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} />
          }} />
          <Route path="/" render={() => {
            if (isLogin) {
              return <Redirect to="/home" />
            }
            return <Redirect to="/intro" />
          }} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);