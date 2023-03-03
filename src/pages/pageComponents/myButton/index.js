import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./mybutton.module.scss";

const MyButton = ({ action, to, children, full, disabled, red }) => {
  const cx = classNames.bind(style);

  let Type = "button";
  if (to) {
    Type = Link;
  }

  return (
    <Type
      className={cx("wrapper", { full, disabled, red })}
      disabled={disabled}
      to={to}
      onClick={action}
    >
      {children}
    </Type>
  );
};

export default MyButton;
