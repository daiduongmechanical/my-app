import { faShopify } from "@fortawesome/free-brands-svg-icons";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import NavItem from "../navItiem";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import style from "./accountitem.module.scss";
import {
  AccountTypeContext,
  NewOrderContext,
  AccountDetailContext,
} from "../../../../../route";
import { useContext } from "react";

const AccountItem = ({ statusLogin }) => {
  const cx = classNames.bind(style);

  //get Account type context
  const getAccountTypeContext = useContext(AccountTypeContext);
  let type = getAccountTypeContext[0];

  //get new order context

  const getOrderContext = useContext(NewOrderContext);
  const newNotice = getOrderContext[0];
  const setNewNotice = getOrderContext[1];
  let typeRoute = type ? "/admin" : "/profile";

  //get account detail context

  const getDetailContext = useContext(AccountDetailContext);
  const userData = getDetailContext[0];

  return (
    <div className={cx("wrapper")}>
      {type && (
        <NavItem normal to="/admin/manager-order">
          <Tippy content="cart">
            <div onClick={() => setNewNotice(false)} className={cx("icon")}>
              {newNotice && <div className={cx("icon__notice")}></div>}
              <FontAwesomeIcon icon={faBell} />
            </div>
          </Tippy>
        </NavItem>
      )}

      <NavItem
        normal
        to={userData === undefined ? "/cart" : `/cart/${userData.id}`}
      >
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
