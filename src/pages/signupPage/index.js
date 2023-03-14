import classNames from "classnames/bind";
import InputField from "../pageComponents/inputField";
import style from "./signuppage.module.scss";
import MyButton from "../pageComponents/myButton";
import { useRef, useState } from "react";
import FormData from "form-data";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  const cx = classNames.bind(style);
  const [nameData, setNameData] = useState(false);
  const [emailData, setEmailData] = useState(false);
  const [phoneData, setphoneData] = useState(false);
  const [passwordData, setpasswordData] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef();
  let history = useNavigate();

  const nameAction = (data) => setNameData(data);
  const emailAction = (data) => setEmailData(data);
  const phoneAction = (data) => setphoneData(data);
  const passwordAction = (data) => setpasswordData(data);
  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    const data = new FormData(formRef.current);
    axios
      .post("http://localhost:8000/api/register", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (nameData && emailData && phoneData && passwordData) {
    console.log(1);
    if (disabled) {
      setDisabled(false);
    }
  } else {
    console.log(2);
    if (!disabled) {
      setDisabled(true);
    }
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("show__side")}></div>

      {/* login form */}
      <div className={cx("login__side")}>
        <h1 className={cx("header")}>SIGN UP</h1>
        <form ref={formRef}>
          <InputField
            content="Enter your name"
            name="name"
            type="text"
            regex={/(?=.*[a-z]).{3,}/}
            notice="Name as least 3 characters"
            required
            action={nameAction}
          />

          <InputField
            content="Enter your phone number"
            name="Phone"
            type="number"
            regex={/^[0-9\-\+]{9,15}$/}
            notice="Phone must be 9-13 numbers"
            require
            action={phoneAction}
          />

          <InputField
            content="Enter your email"
            name="email"
            type="text"
            regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
            notice="Email follow type xxx@example.xxx"
            required
            action={emailAction}
          />
          <InputField
            content="Enter your password"
            name="password"
            type="password"
            regex={/^(?=.*\d)[A-Za-z\d]{8,}$/}
            notice=" Password minimum 8 characters and one number"
            required
            action={passwordAction}
          />

          <MyButton full action={handleSubmit} disabled={disabled} red>
            Sign Up
          </MyButton>
        </form>
        <p className={cx("to__signin")}>
          If you readly have an account ?{" "}
          <Link className={cx("to__signin--link")} to="/login">
            {" "}
            log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
