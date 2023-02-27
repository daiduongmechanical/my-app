import classNames from "classnames/bind";

import style from "./navBar.module.scss";

const NavBar = ({ children }) => {
  const cx = classNames.bind(style);

  return <div className={cx("wrapper")}>{children}</div>;
};

export default NavBar;
