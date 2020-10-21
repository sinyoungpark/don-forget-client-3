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
    curpath: {
        backgroundColor: '#ffffff',
        marginBottom: "100px",
        color: '#ff4705',
        border: "2px solid white",
        width: "35%",
        height: "8%",
        borderRadius: "20px",
        fontSize: "large",
        // position: "fixed",
        "z-index": "99",
        '@media(min-width: 1px) and (max-width:  757px)': {
            position: "relative",
            borderRadius: "0",
            margin: "0px 0%",
            display: "inline",
            padding: "10% 9.17% 7%",
            top: "30%"
        }
    },
    icon: {
        backgroundColor: '#3b23a6',
        marginBottom: "100px",
        '@media(min-width: 1px) and (max-width:  757px)': {
            display: "inline",
            position: "relative",
            margin: "0px 0%",
            padding: "0% 9.15% 6%",
            top: "30%"
        }
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
            <a href="/gift" >
                <Avatar className={location.pathname === "/gift" ? classes.curpath : classes.icon}>
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