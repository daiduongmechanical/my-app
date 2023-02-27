import { faShopify } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import NavItem from "../navItiem";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import style from "./accountitem.module.scss";
import { AccountTypeContext } from "../../../../../route";
import { useContext } from "react";

const AccountItem = ({ statusLogin }) => {
  const cx = classNames.bind(style);

  //get Account type context
  const getAccountTypeContext = useContext(AccountTypeContext);
  let type = getAccountTypeContext[0];

  let typeRoute = type ? "/admin" : "/profile";
  return (
    <div className={cx("wrapper")}>
      <NavItem normal to="/cart">
        <Tippy content="cart">
          <div className={cx("icon")}>
            <FontAwesomeIcon icon={faShopify} />
          </div>
        </Tippy>
      </NavItem>
      {!statusLogin ? (
        <NavItem normal to="/login">
          <Tippy content="Login">
            <div className={cx("icon")}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </Tippy>
        </NavItem>
      ) : (
        <NavItem normal to={typeRoute}>
          <Tippy content="Profile">
            <img
              className={cx("avatar")}
              src="https://i.pinimg.com/280x280_RS/86/4b/70/864b70ac3cf273c2a2ded0a420d5ec21.jpg"
              alt="error"
            />
          </Tippy>
        </NavItem>
      )}
    </div>
  );
};
export default AccountItem;
