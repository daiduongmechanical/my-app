import classNames from "classnames/bind";
import InputField from "../pageComponents/inputField";
import MyButton from "../pageComponents/myButton";
import style from "./loginpage.module.scss";
import { useState, useRef, useContext, useEffect } from "react";
import Images from "../../asset/image";
import { Link, useNavigate, useLocation } from "react-router-dom";

import FormData from "form-data";
import userURL from "../../config/userURL";
import { useTranslation } from "react-i18next";
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
  const [typeError, setTypeError] = useState("");
  const formRef = useRef();
  const { t } = useTranslation();

  const location = useLocation();

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

  //login with account

  const handle = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    userURL
      .post("/login", data)
      .then(function (response) {
        console.log(response);

        //login with employee
        if (response.data.user.manage === 1) {
          handleLogin(true);
          setCookie("jwt", response.data.authorisation.token, 1);
          handleAccountDetail(response.data.user);
          handleAccountType(true);
          history("/");
        }
        //login with manageer
        if (response.data.user.manage === 2) {
          window.location.replace(
            `http://localhost:8000/${response.data.user.id}`
          );
        }
        //login with customer
        if (response.data.user.manage === 0) {
          handleLogin(true);
          setCookie("jwt", response.data.authorisation.token, 1);
          handleAccountDetail(response.data.user);
          history("/");

          handleAccountType(false);
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setLoginError(true);

          setTypeError(t("login.error"));
        }

        if (error.response.status === 400) {
          setLoginError(true);
          setTypeError(t("login.block"));
        }
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

  const loginGoogle = () => {
    userURL
      .get("/google-login", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.statusText === "OK") {
          window.location.replace(response.data.url);
        }
      })
      .catch((error) => console.error(error));
  };

  //get data after redirect from goodle
  useEffect(() => {
    userURL
      .get(`/google-callback${location.search}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
     let userData=response.data.user;
     userData['address']=null;
     userData['addresscode']=null;
     userData['dob']=null;


     
        handleAccountDetail(userData);
        setCookie("jwt", response.data.jwt_token, 1);
        handleLogin(true);
        history("/");
      })
      .catch((error) => console.log(error));
  }, []);
  //get data after redirect from facebook
  useEffect(() => {
    userURL
      .get(`/facebook-callback${location.search}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.statusText === "OK") {
          handleAccountDetail(response.data.user);
          setCookie("jwt", response.data.jwt_token, 1);
          handleLogin(true);
          history("/");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  //render
  return (
    <div className={cx("wrapper")}>
      <div className={cx("show__side")}>
        <img src="/background.jpg" alt="error" />
      </div>

      {/* login form */}
      <div className={cx("login__side")}>
        <div className={cx("header")}>
          <h1> {t("login.head")}</h1>
          {loginError && <p>{typeError}</p>}
        </div>
        <div className={cx("form__cover")}>
          <form className={cx("form")} ref={formRef}>
            <div className={cx("input__cover")}>
              <InputField
                content={t("login.email")}
                name="email"
                required
                type="text"
                action={getEData}
                regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
                notice={t("login.emailerror")}
              />
            </div>
            <div className={cx("input__cover")}>
              <InputField
                content={t("login.password")}
                name="password"
                required
                type="password"
                action={getPData}
                regex={/^(?=.*\d)[A-Za-z\d]{8,}$/}
                notice={t("login.passerror")}
              />
            </div>
            <div className={cx("button__cover")}>
              <MyButton full action={handle} disabled={disabled}>
                {t("login.head")}
              </MyButton>
            </div>
            <h5>{t("login.with")}</h5>
          </form>
          <MyButton full>
            <a
              className={cx("content__btn")}
              href={"http://localhost:8000/api/facebook-login"}
            >
              <img src={Images.facebook.default} alt="error" />
              <h3>{t("login.facebook")}</h3>
            </a>
          </MyButton>

          <MyButton full red>
            <div className={cx("content__btn")} onClick={loginGoogle}>
              <img src={Images.google.default} alt="error" />
              <h3>{t("login.google")}</h3>
            </div>
          </MyButton>

          <p className={cx("to__signin")}>
            {t("login.if")}
            <Link className={cx("to__signin--link")} to="/signup">
              {" "}
              {t("login.signup")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
