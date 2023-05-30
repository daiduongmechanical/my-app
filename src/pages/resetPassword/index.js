import classNames from "classnames/bind";
import style from "./resetpassword.module.scss";
import InputField from "../pageComponents/inputField";
import MyButton from "../pageComponents/myButton";
import { useState, useRef, useContext } from "react";
import { AccountDetailContext } from "../../route";
import userURL from "../../config/userURL";
import HidenNotice from "../pageComponents/noticeHidden";
import { Cookies } from "react-cookie";
import { useTranslation } from "react-i18next";

const ResetPasswordPage = () => {
  const cx = classNames.bind(style);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [status, setStatus] = useState(1);
  const [notice, setNotice] = useState(false);
  const formRef = useRef();
  const cookies = new Cookies();
  const { t } = useTranslation();

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
      <h3>{t("password.head")}</h3>
      {notice && <HidenNotice notify nt1={t("password.success")} time={2000} />}
      <form ref={formRef} onSubmit={handleUbmit} className={cx("form__main")}>
        <InputField
          content={t("password.current")}
          required
          regex={/^(?=.*\d)[A-Za-z\d]{8,}$/}
          notice={status === 0 ? "" : t("password.mini")}
          type="password"
          name="currentPassword"
          action={getCurrentPassword}
          wrong={status}
        />
        <InputField
          content={t("password.new")}
          required
          regex={/^(?=.*\d)[A-Za-z\d]{8,}$/}
          notice={t("password.mini")}
          type="password"
          name="newPassword"
          action={getNewPassword}
          get={true}
        />
        <InputField
          content={t("password.re")}
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
          {t("password.btn")}
        </MyButton>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
