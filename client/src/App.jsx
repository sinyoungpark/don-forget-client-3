"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Intro_1 = __importDefault(require("./component/Intro"));
const Signin_1 = __importDefault(require("./component/Signin"));
const Signup_1 = __importDefault(require("./component/Signup"));
const Home_1 = __importDefault(require("./component/Home"));
const Nav_1 = __importDefault(require("./component/Nav"));
const MyPage_1 = __importDefault(require("./component/MyPage"));
require("./App.scss");
const Schedule_1 = __importDefault(require("./component/Schedule"));
const Gift_1 = __importDefault(require("./component/Gift"));
function App(props) {
    const [isLogin, setIsLogin] = react_1.useState(false);
    const [email, setEmail] = react_1.useState("");
    const [name, setName] = react_1.useState("");
    const [userId, setUserId] = react_1.useState("");
    react_1.useEffect(() => {
        if (window.sessionStorage.getItem("id")) {
            setIsLogin(true);
            setUserId(window.sessionStorage.getItem("id"));
            setEmail(window.sessionStorage.getItem("email"));
            setName(window.sessionStorage.getItem("name"));
            console.log(userId);
        }
    });
    console.log(props.location.pathname);
    console.log(isLogin);
    console.log(email, name);
    return (<div className="App">
      <Nav_1.default />
      <div className={props.location.pathname === "/intro" ? "background" : props.location.pathname === "/signin" || props.location.pathname === "/signup" ? "fullBackground" : "sideBackground"}>
        <react_router_dom_1.Switch>
          <react_router_dom_1.Route exact path="/intro" render={() => {
        return <Intro_1.default />;
    }}/>
          <react_router_dom_1.Route path="/signin" render={() => {
        if (window.sessionStorage.getItem("id")) {
            return <react_router_dom_1.Redirect to="/"/>;
        }
        else {
            return <Signin_1.default setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} userId={userId}/>;
        }
    }}/>
          <react_router_dom_1.Route exact path="/signup" render={() => {
        return <Signup_1.default />;
    }}/>
          <react_router_dom_1.Route exact path="/home" render={() => {
        if (window.sessionStorage.getItem("id")) {
            return <Home_1.default />;
        }
        else {
            return <react_router_dom_1.Redirect to="/"/>;
        }
    }}/>
          <react_router_dom_1.Route exact path="/schedule" render={() => {
        if (window.sessionStorage.getItem("id")) {
            return <Schedule_1.default userId={userId}/>;
        }
        else {
            return <react_router_dom_1.Redirect to="/"/>;
        }
    }}/>
          <react_router_dom_1.Route exact path="/gift" render={() => {
        if (window.sessionStorage.getItem("id")) {
            return <Gift_1.default userId={userId}/>;
        }
        else {
            return <react_router_dom_1.Redirect to="/"/>;
        }
    }}/>
          <react_router_dom_1.Route exact path="/mypage" render={() => {
        if (window.sessionStorage.getItem("id")) {
            return <MyPage_1.default setIsLogin={setIsLogin} email={email} setEmail={setEmail} name={name} setName={setName}/>;
        }
        else {
            return <react_router_dom_1.Redirect to="/"/>;
        }
    }}/>
          <react_router_dom_1.Route path="/" render={() => {
        if (window.sessionStorage.getItem("id")) {
            return <react_router_dom_1.Redirect to="/home"/>;
        }
        else {
            return <react_router_dom_1.Redirect to="/intro"/>;
        }
    }}/>

        </react_router_dom_1.Switch>
      </div>
      
    </div>);
}
exports.default = react_router_dom_1.withRouter(App);
