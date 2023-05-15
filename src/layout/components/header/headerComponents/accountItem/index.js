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
import cartURL from "../../../../../config/cartURL";
import { useContext, useEffect, useState, useRef } from "react";

const AccountItem = ({ statusLogin }) => {
  const cx = classNames.bind(style);
  const [cartQuantity, setCartQuantity] = useState();
  const quantityRef = useRef("");

  //get account detail context

  const getDetailContext = useContext(AccountDetailContext);
  const userData = getDetailContext[0];
  //get list cart

  useEffect(() => {
    if (userData !== undefined) {
      cartURL
        .get(`/${userData.id}`)
        .then((response) => {
          if (response.data.length !== quantityRef.current)
            setCartQuantity(response.data.length);
          quantityRef.current = response.data.length;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [userData]);
  //get Account type context
  const getAccountTypeContext = useContext(AccountTypeContext);
  let type = getAccountTypeContext[0];

  //get new order context

  const getOrderContext = useContext(NewOrderContext);
  const newNotice = getOrderContext[0];
  const setNewNotice = getOrderContext[1];
  let typeRoute = type ? "/admin" : "/profile";

  console.log(userData);

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
            <img src="/cart.png" alt="error" />
            <div className={cx("quantity")}>
              <span>{cartQuantity}</span>
            </div>
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
            <img className={cx("avatar")} src={userData.avatar} alt="error" />
          </Tippy>
        </NavItem>
      )}
    </div>
  );
};
export default AccountItem;
