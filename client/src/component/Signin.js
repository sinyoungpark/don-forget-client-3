import React, { useState } from "react"
import Button from "@material-ui/core/Button";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider, withTheme } from '@material-ui/core/styles';
import { Container, TextField } from "@material-ui/core"
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const axios = require('axios');


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: "#3b23a6"
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#3b23a6",
        color: "#ffffff"
    },
}));

const KakaoButton = withStyles((theme) => ({
    root: {
        color: "#FFFFFF",
        backgroundColor: "#f1f413",
        '&:hover': {
            backgroundColor: "#FFFFFF",
        },
        margin: "30px"
    },
}))(Button);

const NaverButton = withStyles((theme) => ({
    root: {
        color: "#ffffff",
        backgroundColor: "#35f277",
        '&:hover': {
            backgroundColor: "#FFFFFF",
        },
    },
}))(Button);

const EmailTextField = withStyles((theme) => ({
    root: {
        display: "block",
        marginTop: "20px",
        width: "10000px"
    },
}))(TextField)

export default function Signin(props) {

    const classes = useStyles();

    const { setIsLogin, setEmail, setName } = props;
    const [email, inputEmail] = useState("");
    const [password, inputPW] = useState("");

    function handleLoginBtn() {
        axios.post('https://api.cakes.com/user/signin', {
            email: email,
            password: password
        })
            .then((response) => {
                inputEmail("");
                inputPW("");
                setIsLogin(true);

                window.sessionStorage.setItem("id", response.id);
                window.sessionStorage.setItem("email", response.email);
                window.sessionStorage.setItem("name", response.name);

                setEmail(response.email);
                setName(response.name);
            })
            .catch((err) => console.log(err));
    }

    return (
        <Container component="main" className="Signin" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                 </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Email Address" label="Email Address" onChange={(e) => inputEmail(e.target.value)} autoFocus />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password" label="password" onChange={(e) => inputPW(e.target.value)} autoFocus />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        size="large" onClick={handleLoginBtn}>LOGIN</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                비밀번호 찾기
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                회원가입
              </Link>
                        </Grid>
                    </Grid>
                </form>
                <div>
                    <KakaoButton size="large">Kakao</KakaoButton>
                    <NaverButton size="large">Naver</NaverButton>
                </div>
            </div>
        </Container>
    )
}