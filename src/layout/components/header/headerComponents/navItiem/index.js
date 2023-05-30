import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";

import style from "./navItem.module.scss";

const NavItem = ({ children, to, normal, space, handle }) => {
  const cx = classNames.bind(style);
  const footer = document.querySelector(".footer_wrapper__UlRP5");

  const gotoBottom = (e) => {
    if (children === "Contact" || children === "liên lạc") {
      e.preventDefault();
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <NavLink
      onClick={gotoBottom}
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
