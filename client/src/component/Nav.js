import React from "react"
import { withRouter } from "react-router-dom"
import "./Nav.css"
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

function Nav({ history, isLogin, location }) {
    return (
        <div className={location.pathname === "/signin" || location.pathname === "/signup" ? "none" : (location.pathname === "/intro" ? "topnav" : "sidenav")} >
            <a href="/home">
                <Avatar className={location.pathname === "/home" ? "cur" : "no"} style={{ backgroundColor: '#3b23a6', marginBottom: "100px" }}>
                    <HomeIcon />
                </Avatar>
            </a>
            <a href="/schedule">
                <Avatar className="icon" style={{ backgroundColor: '#3b23a6', marginBottom: "100px" }}>
                    <EventIcon />
                </Avatar>
            </a>
            <a href="/schedule">
                <Avatar className="icon" style={{ backgroundColor: '#3b23a6', marginBottom: "100px" }}>
                    <SearchIcon />
                </Avatar>
            </a>
            <a href="/mypage">
                <Avatar className="icon" style={{ backgroundColor: '#3b23a6', marginBottom: "100px" }}>
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