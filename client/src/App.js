import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Intro from "./component/Intro";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Home from "./component/Home";


function App() {

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

  return (
    <div className="App">
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
        <Route path="/" render={() => {
          if (isLogin) {
            return <Redirect to="/home" />
          }
          return <Redirect to="/intro" />
        }} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
