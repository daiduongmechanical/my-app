import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import NavItem from "../navItiem";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import style from "./accountitem.module.scss";
import { useTranslation } from "react-i18next";
import {
  AccountTypeContext,
  NewOrderContext,
  AccountDetailContext,
  CartQuantityContext,
} from "../../../../../route";
import { useContext } from "react";

const AccountItem = ({ statusLogin }) => {
  const cx = classNames.bind(style);
  const { t } = useTranslation();

  //get account detail context

  const getDetailContext = useContext(AccountDetailContext);
  const userData = getDetailContext[0];

  //get Account type context
  const getAccountTypeContext = useContext(AccountTypeContext);
  let type = getAccountTypeContext[0];

  //get new order context

  const getOrderContext = useContext(NewOrderContext);
  const newNotice = getOrderContext[0];
  const setNewNotice = getOrderContext[1];
  let typeRoute = type ? "/admin" : "/profile";

  //get cart quantity context
  const getCartQuantityContext = useContext(CartQuantityContext);
  const cartQuantity = getCartQuantityContext[0];

  return (
    <div className={cx("wrapper")}>
      {type && (
        <NavItem normal to="/admin/manager-order">
          <Tippy content={t("header.notice")}>
            <div onClick={() => setNewNotice(false)} className={cx("icon")}>
              {newNotice && <div className={cx("icon__notice")}></div>}
              <FontAwesomeIcon className={cx("icon__login")} icon={faBell} />
            </div>
          </Tippy>
        </NavItem>
      )}

      <NavItem
        normal
        to={userData === undefined ? "/cart" : `/cart/${userData.id}`}
      >
        <Tippy content={t("header.cart")}>
          <div className={cx("icon")}>
            <img src="/cart.png" alt="error" />
            <div className={cx("quantity")}>
              <span>{cartQuantity}</span>
            </div>
          </div>
        </Tippy>
      </NavItem>
      {!statusLogin ? (
        <NavItem normal to="/login">
          <Tippy content={t("header.login")}>
            <div className={cx("icon")}>
              <FontAwesomeIcon className={cx("icon__login")} icon={faUser} />
            </div>
          </Tippy>
        </NavItem>
      ) : (
        <NavItem normal to={typeRoute}>
          <Tippy content={t("header.profile")}>
            <img
              className={cx("avatar")}
              src={
                userData === undefined
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZXpBymHiGfTzS3A6OCNgCE0NrtcFhz7ku4g&usqp=CAU"
                  : userData.avatar
              }
              alt="error"
            />
          </Tippy>
        </NavItem>
      )}
    </div>
  );
};
export default AccountItem;
