import classNames from "classnames/bind";
import InputField from "../pageComponents/inputField";
import MyButton from "../pageComponents/myButton";
import style from "./loginpage.module.scss";
import { useState, useRef } from "react";
import Images from "../../asset/image";
import { Link } from "react-router-dom";
import FormData from "form-data";
import axios from "axios";

const LoginPage = () => {
  const cx = classNames.bind(style);

  const [edata, setEdata] = useState("");
  const [pdata, setPdata] = useState("");
  const [disabled, setDisabled] = useState(true);
  const formRef = useRef();

  const handle = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    axios
      .post("http://localhost:3000/login", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
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
        <h1 className={cx("header")}>Log in</h1>
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
                regex={/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/}
                notice=" Password minimum 8 characters, one case letter and one number"
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
