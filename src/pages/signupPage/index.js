import classNames from "classnames/bind";
import InputField from "../pageComponents/inputField";
import style from "./signuppage.module.scss";
import MyButton from "../pageComponents/myButton";
import { useRef, useState, useContext } from "react";
import FormData from "form-data";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { StatusLoginContext, AccountDetailContext } from "../../route";
import { useTranslation } from "react-i18next";
import HidenNotice from "../pageComponents/noticeHidden";

const SignUpPage = () => {
  const cx = classNames.bind(style);
  const [nameData, setNameData] = useState(false);
  const [emailData, setEmailData] = useState(false);
  const [phoneData, setphoneData] = useState(false);
  const [passwordData, setpasswordData] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const formRef = useRef();
  let history = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState(false);

  //get data from    StatusLoginContext

  const getStatusLoginContext = useContext(StatusLoginContext);
  let handleLogin = getStatusLoginContext[1];

  //get account detail context
  const getAccountDetailContext = useContext(AccountDetailContext);
  let handleAccountDetail = getAccountDetailContext[1];

  const nameAction = (data) => setNameData(data);
  const emailAction = (data) => setEmailData(data);
  const phoneAction = (data) => setphoneData(data);
  const passwordAction = (data) => setpasswordData(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    axios
      .post("http://localhost:8000/api/register", data)
      .then(function (response) {
        console.log(response);
        if (response.data.status === "success") {
          handleAccountDetail(response.data.user);
          setHidden(true);
          const count = setInterval(() => {
            handleLogin(true);
            history("/");
            clearInterval(count);
          }, 3000);
        }
      })
      .catch(function (error) {
        setError(true);
        setHidden(true);
      });
  };

  if (nameData && emailData && phoneData && passwordData) {
    if (disabled) {
      setDisabled(false);
    }
  } else {
    if (!disabled) {
      setDisabled(true);
    }
  }

  const resetError = (x) => {
    setHidden(x);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("show__side")}>
        <img src="/background.jpg" alt="error" />
      </div>

      {hidden &&
        (error ? (
          <HidenNotice
            notify
            time={3000}
            nt1={t("signup.error")}
            reset={resetError}
          />
        ) : (
          <HidenNotice notify time={3000} nt1={t("signup.success")} />
        ))}
      {/* login form */}
      <div className={cx("login__side")}>
        <h1 className={cx("header")}>{t("signup.head")}</h1>
        <form ref={formRef}>
          <InputField
            content={t("signup.name")}
            name="name"
            type="text"
            regex={/(?=.*[a-z]).{3,}/}
            notice={t("signup.nameerror")}
            required
            action={nameAction}
          />

          <InputField
            content={t("signup.phone")}
            name="phone"
            type="number"
            regex={/^[0-9\-\+]{9,15}$/}
            notice={t("signup.phoneerror")}
            required
            action={phoneAction}
          />

          <InputField
            content={t("signup.email")}
            name="email"
            type="text"
            regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
            notice={t("signup.emailerror")}
            required
            action={emailAction}
          />
          <InputField
            content={t("signup.password")}
            name="password"
            type="password"
            regex={/^(?=.*\d)[A-Za-z\d]{8,}$/}
            notice={t("signup.passerror")}
            required
            action={passwordAction}
          />

          <MyButton full action={handleSubmit} disabled={disabled} red>
            {t("signup.head")}
          </MyButton>
        </form>
        <p className={cx("to__signin")}>
          {`${t("signup.if")} ?`}
          <Link className={cx("to__signin--link")} to="/login">
            {t("signup.login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
