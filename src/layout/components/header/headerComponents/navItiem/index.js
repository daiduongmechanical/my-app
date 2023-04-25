import { NavLink, Link } from "react-router-dom";
import classNames from "classnames/bind";

import style from "./navItem.module.scss";
import { useEffect, useState } from "react";
import dishURL from "../../../../../config/dishURL";

const NavItem = ({ children, to, normal, space, handle }) => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (children === "menu") {
      dishURL.get("/").then((response) => {
        let recive = response.data;
        const groupedByDishID = recive.reduce((result, dish) => {
          if (!result[dish.dishid]) {
            result[dish.dishid] = [];
          }
          result[dish.dishid].push(dish);
          return result;
        }, {});
        const resultArray = Object.values(groupedByDishID);
        setList(resultArray);
      });
    }
  }, []);

  return (
    <NavLink
      state={list}
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
