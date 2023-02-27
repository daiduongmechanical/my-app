import classNames from "classnames/bind";
import NavItem from "../header/headerComponents/navItiem";
import style from "./sidebar.module.scss";
import { StatusLoginContext } from "../../../route";
import { Fragment, useContext } from "react";
import { AccountTypeContext } from "../../../route";
const SideBar = () => {
  const cx = classNames.bind(style);
  //get status login context
  const getContext = useContext(StatusLoginContext);
  let handleContext = getContext[1];

  //get Account type context
  const getAccountTypeContext = useContext(AccountTypeContext);
  let type = getAccountTypeContext[0];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar__cover")}>
        <img
          className={cx("avatar")}
          src="https://i.pinimg.com/280x280_RS/86/4b/70/864b70ac3cf273c2a2ded0a420d5ec21.jpg"
          alt="error"
        />
        <p className={cx("avatar__username")}>VAINHO{type && "  ( Admin )"}</p>
        <NavItem handle to={"/"}>
          <span onClick={() => handleContext(false)}> Log Out</span>
        </NavItem>
      </div>

      {type ? (
        <Fragment>
          <NavItem space to={"/admin/manager-user"}>
            Manager User
          </NavItem>
          <NavItem space to={"/admin/manager-menu"}>
            Manager Menu
          </NavItem>
          <NavItem space to={"/admin/manager-order"}>
            Manager Order
          </NavItem>
        </Fragment>
      ) : (
        <Fragment>
          <NavItem space to={"/profile/previous-orders"}>
            Previous Oders
          </NavItem>
          <NavItem space to={"/profile/account-detail"}>
            Account Details
          </NavItem>
          <NavItem space to={"/profile/reset-password"}>
            Reset Password
          </NavItem>
        </Fragment>
      )}
    </div>
  );
};

export default SideBar;
