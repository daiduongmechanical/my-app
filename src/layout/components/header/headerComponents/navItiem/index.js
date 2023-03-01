import { NavLink, Link } from "react-router-dom";
import classNames from "classnames/bind";

import style from "./navItem.module.scss";

const NavItem = ({ children, to, normal, space, handle }) => {
  const cx = classNames.bind(style);

  return (
    <NavLink
      className={(nav) =>
        cx("itemCover", { active: nav.isActive, normal, space, handle })
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
export default NavItem;
