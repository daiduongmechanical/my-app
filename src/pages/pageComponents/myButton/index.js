import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./mybutton.module.scss";

const MyButton = ({ action, to, content }) => {
  if (action) {
    const action = action;
  }

  const cx = classNames.bind(style);

  let Type = "button";
  if (to) {
    Type = Link;
  }

  return <Type to={to}>{content}</Type>;
};

export default MyButton;
