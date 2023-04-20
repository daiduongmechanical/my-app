import classNames from "classnames/bind";
import InputField from "../pageComponents/inputField";
import MyButton from "../pageComponents/myButton";
import style from "./loginpage.module.scss";
import { useState, useRef, useContext } from "react";
import Images from "../../asset/image";
import { Link, useNavigate, redirect } from "react-router-dom";

import FormData from "form-data";
import userURL from "../../config/userURL";
import {
  StatusLoginContext,
  AccountTypeContext,
  AccountDetailContext,
} from "../../route";

const LoginPage = () => {
  const cx = classNames.bind(style);
  let history = useNavigate();
  const [edata, setEdata] = useState("");
  const [pdata, setPdata] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const formRef = useRef();

  //get data from    StatusLoginContext

  const getStatusLoginContext = useContext(StatusLoginContext);
  let handleLogin = getStatusLoginContext[1];

  //get account type context
  const getAccountTypeContext = useContext(AccountTypeContext);
  let handleAccountType = getAccountTypeContext[1];

  //get account detail context
  const getAccountDetailContext = useContext(AccountDetailContext);
  let handleAccountDetail = getAccountDetailContext[1];

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  const handle = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    userURL
      .post("/login", data)
      .then(function (response) {
        console.log(response);
        if (response.message === "Request failed with status code 401") {
          setLoginError(true);
        }
        if (response.data.user.manage === 1) {
          window.location.href = "http://localhost:8000";
        }
        if (response.data.user.manage === 0) {
          handleLogin(true);
          setCookie("jwt", response.data.authorisation.token, 1);
          handleAccountDetail(response.data.user);
          history("/");

          handleAccountType(false);
        }
      })
      .catch(function (error) {
        setLoginError(true);
        console.log(error);
      });
  };
  const getEData = (data) => setEdata(data);
  const getPData = (data) => setPdata(data);

  if (edata && pdata) {
    if (disabled) {
      setDisabled(false);
    }
  } else {
    if (!disabled) {
      setDisabled(true);
    }
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("show__side")}></div>

      {/* login form */}
      <div className={cx("login__side")}>
        <div className={cx("header")}>
          <h1>Log In</h1>
          {loginError && (
            <p>Login fail. please check email and password again</p>
          )}
        </div>
        <div className={cx("form__cover")}>
          <form className={cx("form")} ref={formRef}>
            <div className={cx("input__cover")}>
              <InputField
                content="Enter your email address"
                name="email"
                required
                type="text"
                action={getEData}
                regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
                notice="Email follow type xxx@example.xxx"
              />
            </div>
            <div className={cx("input__cover")}>
              <InputField
                content="Enter your email password"
                name="password"
                required
                type="password"
                action={getPData}
                regex={/^(?=.*\d)[A-Za-z\d]{8,}$/}
                notice=" Password at least 8 characters, and one number"
              />
            </div>
            <div className={cx("button__cover")}>
              <MyButton full action={handle} disabled={disabled}>
                Log in
              </MyButton>
            </div>
            <h5>Can you sign in with :</h5>
            <MyButton full action={handle}>
              <div className={cx("content__btn")}>
                <img src={Images.facebook.default} alt="error" />
                <h3>Login with facebook</h3>
              </div>
            </MyButton>
            <MyButton full action={handle} red>
              <div className={cx("content__btn")}>
                <img src={Images.google.default} alt="error" />
                <h3>Login with google</h3>
              </div>
            </MyButton>
          </form>

          <p className={cx("to__signin")}>
            If you don't have an account ?{" "}
            <Link className={cx("to__signin--link")} to="/signup">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
