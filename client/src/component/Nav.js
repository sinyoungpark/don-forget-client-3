import React from "react"
import { withRouter } from "react-router-dom"
import "./Nav.css"
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

function Nav({ history, isLogin }) {

    return (
        <div className="topnav">
                <a class="active" href="#home">
                    <Avatar style={{ backgroundColor: '#3b23a6' }}>
                        <HomeIcon />
                    </Avatar>
                </a>
                <a href="#news">
                    <Avatar style={{ backgroundColor: '#3b23a6' }}>
                        <EventIcon />
                    </Avatar>
                </a>
                <a href="#contact">
                    <Avatar style={{ backgroundColor: '#3b23a6' }}>
                        <SearchIcon />
                    </Avatar>
                </a>
                <a href="#about">
                    <Avatar style={{ backgroundColor: '#3b23a6' }}>
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