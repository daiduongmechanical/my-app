import classNames from "classnames/bind";
import style from "./header.module.scss";
import AccountItem from "./headerComponents/accountItem";
import NavBar from "./headerComponents/navBar";
import NavItem from "./headerComponents/navItiem";
import { StatusLoginContext } from "../../../route";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const cx = classNames.bind(style);
  const [language, setLanguage] = useState(
    window.localStorage.getItem("language")
  );
  //get status login context
  const getStatusLoginContext = useContext(StatusLoginContext);
  const { t, i18n } = useTranslation();
  let statusLogin = getStatusLoginContext[0];

  const hanleLanguage = (e) => {
    window.localStorage.setItem("language", e.target.value);
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("left__location")}>
        <select onChange={hanleLanguage}>
          <option selected={language === "vi"} value="vi">
            Tiếng Việt
          </option>
          <option selected={language === "en"} value="en">
            English
          </option>
        </select>
      </div>
      <NavBar>
        <NavItem to="/">{t("header.home")}</NavItem>
        <NavItem to="/menu">{t("header.menu")}</NavItem>
        <img className={cx("logo")} src="/logomain.png" alt="error" />
        <NavItem to="/about-us">{t("header.aboutus")}</NavItem>
        <NavItem to="/contact">{t("header.contact")}</NavItem>
      </NavBar>
      <div className={cx("right__location")}>
        <AccountItem statusLogin={statusLogin} />
      </div>
    </div>
  );
};

export default Header;
