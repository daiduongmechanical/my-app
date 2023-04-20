import classNames from "classnames/bind";
import style from "./menulist.module.scss";

import MenuItem from "../menuItem";

const MenuList = ({ data, header, sale }) => {
  const cx = classNames.bind(style);

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("header")}>{header}</h3>

      {data.map((e, index) => (
        <div key={index}>
          <MenuItem data={e} sale={sale} />
        </div>
      ))}
      {/* end item */}
    </div>
  );
};

export default MenuList;
