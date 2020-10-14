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
import Search from './component/Search';


//switch 
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import shadows from "@material-ui/core/styles/shadows";
import { relativeTimeRounding } from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  wrapper: {
    width: 100 + theme.spacing(2),
  },
  paper: {
    boxShadow: "none",
    zIndex: 1,
    position: "relative"
  },
  svg: {
    width: 100,
    height: 1000
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 10,
  },
}));


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
  console.log(email, name);

  const classes = useStyles();

  return (
    <div className="App">
      <Nav />
      <Slide direction={(props.location.pathname === "/signin" || props.location.pathname === "/signup" || props.location.pathname === "/intro") ? "none" : "right"} in={true} mountOnEnter unmountOnExit {...(true ? { timeout: 3000 } : {})}>
        <Paper elevation={10} className={classes.paper}>
          {/* <svg className={classes.svg}> */}
          <polygon points="0,100 50,00, 100,100" className={classes.polygon}>
            <div className={props.location.pathname === "/intro" ? "background" : props.location.pathname === "/signin" || props.location.pathname === "/signup" ? "fullBackground" : "sideBackground"}>
              <Switch>
                <Route exact path="/intro" render={() => {
                  return <Intro />
                }} />
                <Route path="/signin" render={() => {
                  if (window.sessionStorage.getItem("id")) {
                    return <Redirect to="/" />
                  } else {
                    return <Signin setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} userId={userId} />
                  }
                }} />
                <Route exact path="/signup" render={() => {
                  return <Signup />
                }} />
                <Route exact path="/home" render={() => {
                  if (window.sessionStorage.getItem("id")) {
                    return <Home />
                  } else {
                    return <Redirect to="/" />
                  }
                }} />
                <Route exact path="/schedule" render={() => {
                  if (window.sessionStorage.getItem("id")) {
                    return <Schedule userId={userId} />
                  } else {
                    return <Redirect to="/" />
                  }
                }} />
                <Route exact path="/search" render={() => {
                  if (window.sessionStorage.getItem("id")) {
                    return <Search userId={userId} />
                  } else {
                    return <Redirect to="/" />
                  }
                }} />
                <Route exact path="/mypage" render={() => {
                  if (window.sessionStorage.getItem("id")) {
                    return <MyPage setIsLogin={setIsLogin} email={email} setEmail={setEmail} name={name} setName={setName} />
                  } else {
                    return <Redirect to="/" />
                  }
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
            {/* </svg> */}
          </polygon>
        </Paper>
      </Slide>
    </div>
  );
}

export default withRouter(App);