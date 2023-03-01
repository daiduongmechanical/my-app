import classNames from "classnames/bind";
import InputField from "../pageComponents/inputField";
import MyButton from "../pageComponents/myButton";
import style from "./loginpage.module.scss";

const LoginPage = () => {
  const cx = classNames.bind(style);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("show__side")}></div>

      {/* login form */}
      <div className={cx("login__side")}>
        <h1 className={cx("header")}>Log in</h1>
        <div className={cx("form__cover")}>
          <form className={cx("form")}>
            <InputField
              content="Enter your email address"
              name="email"
              required
              regex={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
              notice="enter email follow type xxxx@xx.xxx"
              type="text"
            />
            <InputField
              content="Enter your email password"
              name="password"
              required
              regex={/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/}
              notice="password at least 8 characters, one number, and one case character"
              type="password"
            />

            <MyButton content="LOGIN" to={"/"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
