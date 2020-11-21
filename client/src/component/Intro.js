"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./Intro.scss");
const Logo_png_1 = __importDefault(require("../Logo.png"));
function Intro() {
    return (react_1.default.createElement("div", { className: "intro" },
        react_1.default.createElement("div", { className: "full_page" },
            react_1.default.createElement("div", { className: "title_content" },
                react_1.default.createElement("img", { className: "logo", src: Logo_png_1.default, alt: "Logo_don-forget" }),
                react_1.default.createElement("div", { className: "title" }, "\uB3C8't forget"),
                react_1.default.createElement("div", { className: "desc" }, "\uACE0\uB9C8\uC6B4 \uC0AC\uB78C\uC5D0 \uB300\uD55C \uAE30\uC5B5\uC744 \uC78A\uACE0 \uC788\uC9C4 \uC54A\uC73C\uC2E0\uAC00\uC694? \uB2F9\uC2E0\uC758 \uACBD\uC870\uC0AC\uB97C \uC27D\uACE0 \uAC04\uD3B8\uD558\uAC8C \uAE30\uB85D\uD574 \uBCF4\uC138\uC694!")))));
}
exports.default = react_router_dom_1.withRouter(Intro);
