import classNames from "classnames/bind";
import style from "./header.module.scss";
import AccountItem from "./headerComponents/accountItem";
import NavBar from "./headerComponents/navBar";
import NavItem from "./headerComponents/navItiem";
import { StatusLoginContext } from "../../../route";
import { useContext } from "react";

const Header = () => {
  const cx = classNames.bind(style);

  //get status login context
  const getStatusLoginContext = useContext(StatusLoginContext);
  let statusLogin = getStatusLoginContext[0];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("left__location")}>
        <span>logo website</span>
        <NavBar>
          <NavItem to="/">home</NavItem>
          <NavItem to="/menu">Menu</NavItem>
          <NavItem to="/about-us">About Us</NavItem>
        </NavBar>
      </div>

      <div className={cx("right__location")}>
        <AccountItem statusLogin={statusLogin} />
      </div>
    </div>
  );
};

export default Header;
