import classNames from "classnames/bind";
import style from "./resetpassword.module.scss";
import InputField from "../pageComponents/inputField";
import MyButton from "../pageComponents/myButton";
import { useState, useRef, useContext } from "react";
import { AccountDetailContext } from "../../route";
import userURL from "../../config/userURL";
import HidenNotice from "../pageComponents/noticeHidden";
import { Cookies } from "react-cookie";

const ResetPasswordPage = () => {
  const cx = classNames.bind(style);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [status, setStatus] = useState(1);
  const [notice, setNotice] = useState(false);
  const formRef = useRef();
  const cookies = new Cookies();

  //get account details context
  const getContext = useContext(AccountDetailContext);
  const profile = getContext[0];

  const getNewPassword = (x) => {
    setNewPassword(x);
  };
  const getRePassword = (x) => {
    setRepassword(x);
  };
  const getCurrentPassword = (x) => {
    setCurrentPassword(x);
  };

  const handleUbmit = (e) => {
    if (profile === undefined) {
      return;
    }
    e.preventDefault();
    const data = new FormData(formRef.current);
    data.append("userID", profile.id);

    userURL
      .postForm("/reset_password", data, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        console.log(response);
        if (response.data === 0) {
          setStatus(0);
        }
        if (response.data === 1) {
          setNotice(true);
        }
      });
  };

  return (
    <div className={cx("wrapper")}>
      <h3>Reset Password</h3>
      {notice && (
        <HidenNotice
          notify
          nt1="The password is changed successfully"
          time={2000}
        />
      )}
      <form ref={formRef} onSubmit={handleUbmit} className={cx("form__main")}>
        <InputField
          content={"enter current password"}
          required
          regex={/^(?=.*\d)[A-Za-z\d]{8,}$/}
          notice={
            status === 0 ? "" : "Password minimum 8 characters and one number"
          }
          type="password"
          name="currentPassword"
          action={getCurrentPassword}
          wrong={status}
        />
        <InputField
          content={"enter new password"}
          required
          regex={/^(?=.*\d)[A-Za-z\d]{8,}$/}
          notice=" Password minimum 8 characters and one number"
          type="password"
          name="newPassword"
          action={getNewPassword}
          get={true}
        />
        <InputField
          content={" re-enter current password"}
          type="password"
          name="renewPassword"
          action={getRePassword}
          compare={newPassword}
          get={true}
        />
        <MyButton
          disabled={
            rePassword === "" ||
            newPassword === "" ||
            rePassword !== newPassword ||
            currentPassword === ""
          }
          red
          full
        >
          Reset Your Password
        </MyButton>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
