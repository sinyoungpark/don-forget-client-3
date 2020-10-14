import React from "react"
import { withRouter } from "react-router-dom"
import "./Nav.scss"
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    curpath : {
        backgroundColor: '#ffffff',
        marginBottom: "100px",
        color : '#ff4705',
        border : "2px solid white",
        width : "30%",
        height : "8%",
        borderRadius: "20px",
        fontSize: "large",
    },
    icon : {
        backgroundColor: '#3b23a6', 
        marginBottom: "100px"
    }
}))


function Nav({ history, isLogin, location }) {
    const classes = useStyles();

    return (
        <div className={location.pathname === "/signin" || location.pathname === "/signup" ? "topnav fixed" : (location.pathname === "/intro" ? "topnav" : "sidenav")} >
            <a href="/home">
                <Avatar className={location.pathname === "/home" ? classes.curpath : classes.icon}>
                    <HomeIcon />
                </Avatar>
            </a>
            <a href="/schedule" >
                <Avatar className={location.pathname === "/schedule" ? classes.curpath : classes.icon}>
                    <EventIcon />
                </Avatar>
            </a>
            <a href="/search" >
                <Avatar className={location.pathname === "/search" ? classes.curpath : classes.icon}>
                    <SearchIcon />
                </Avatar>
            </a>
            <a href="/mypage">
                <Avatar className={location.pathname === "/mypage" ? classes.curpath : classes.icon}>
                    <SettingsIcon />
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