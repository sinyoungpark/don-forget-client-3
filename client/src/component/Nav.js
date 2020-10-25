import React from "react"
import { withRouter } from "react-router-dom"
import "./Nav.scss"
import Avatar from '@material-ui/core/Avatar';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from "@material-ui/core/styles";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles((theme) => ({
    curpath: {
        backgroundColor: '#ffffff',
        color: '#ff4705',
        border: "2px solid white",
        width: "35%",
        height: "8%",
        borderRadius: "20px",
        marginBottom: "100px",
        fontSize: "large",
        "z-index": "99",
        '@media(min-width: 1px) and (max-width:  757px)': {
            marginBottom: "0",
            height: "85%",
            width: "80%",
            borderRadius: "0",
            padding: "6%"
        }
    },
    icon: {
        backgroundColor: '#3b23a6',
        padding:"6%",
        marginBottom: "100px",
        "&:hover":{
            backgroundColor:"#7354ff"
        },
        '@media(min-width: 1px) and (max-width:  757px)': {
            marginBottom: "0px",
            padding:"0%",
            width:"80px",
            height:"80px"
        }
    }
}))


function Nav({ history, isLogin, location }) {
    const classes = useStyles();

    return (
        <div className={location.pathname === "/signin" || location.pathname === "/signup" ? "topnav fixed" : (location.pathname === "/intro" ? "topnav" : "sidenav")} >
            <a href="/home">
                <Avatar className={location.pathname === "/home" ? classes.curpath : classes.icon}>
                    <CalendarTodayIcon />
                </Avatar>
            </a>
            <a href="/schedule" >
                <Avatar className={location.pathname === "/schedule" ? classes.curpath : classes.icon}>
                    <ListIcon />
                </Avatar>
            </a>
            <a href="/gift" >
                <Avatar className={location.pathname === "/gift" ? classes.curpath : classes.icon}>
                    <SearchIcon />
                </Avatar>
            </a>
            <a href="/mypage">
                <Avatar className={location.pathname === "/mypage" ? classes.curpath : classes.icon}>
                    <AccountCircleIcon />
                </Avatar>
            </a>
            <button
                className="loginBtn"
                onClick={() => { history.push('/signin') }}
            >LOGIN</button>
        </div>

    )
}

export default withRouter(Nav); 