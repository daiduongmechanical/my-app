import classNames from "classnames/bind";
import NavItem from "../header/headerComponents/navItiem";
import style from "./sidebar.module.scss";
import { StatusLoginContext } from "../../../route";
import { Fragment, useContext } from "react";
import { AccountTypeContext, AccountDetailContext } from "../../../route";
import userURL from "../../../config/userURL";
const SideBar = () => {
  const cx = classNames.bind(style);
  //get status login context
  const getContext = useContext(StatusLoginContext);
  let handleContext = getContext[1];

  //get Account type context
  const getAccountTypeContext = useContext(AccountTypeContext);
  let type = getAccountTypeContext[0];

  //get account detail context
  const getAccountDetailContext = useContext(AccountDetailContext);
  const account = getAccountDetailContext[0];

  //get cockie
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if (account === undefined) {
    return;
  }

  //xu ly log out
  const handleLogout = () => {
    let jwt = getCookie("jwt");
    userURL
      .post("/logout", [], {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        if (response.data.status === "success") {
          handleContext(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar__cover")}>
        <img
          className={cx("avatar")}
          src="https://i.pinimg.com/280x280_RS/86/4b/70/864b70ac3cf273c2a2ded0a420d5ec21.jpg"
          alt="error"
        />
        <p className={cx("avatar__username")}>
          {account.name}
          {type && "  ( Admin )"}
        </p>
        <NavItem handle to={"/"}>
          <span onClick={handleLogout}> Log Out</span>
        </NavItem>
      </div>

      {type ? (
        <Fragment>
          <NavItem space to={"/admin/overview"}>
            Over View
          </NavItem>
          <NavItem space to={"/admin/manager-user"}>
            Manager User
          </NavItem>
          <NavItem space to={"/admin/manager-menu"}>
            Manager Menu
          </NavItem>
          <NavItem space to={"/admin/manager-order"}>
            Manager Order
          </NavItem>
          <NavItem space to={"/admin/manager-discount"}>
            Manager discount
          </NavItem>
        </Fragment>
      ) : (
        <Fragment>
          <NavItem space to={"/profile/current-orders"}>
            CurrentOrders
          </NavItem>
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
