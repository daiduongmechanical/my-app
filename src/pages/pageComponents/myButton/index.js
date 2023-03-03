import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./mybutton.module.scss";

<<<<<<< HEAD
const MyButton = ({ action, to, children, full, disabled, red }) => {
=======
const MyButton = ({ action, to, content }) => {
  if (action) {
    const action = action;
  }

>>>>>>> ee562d5e98d6239e75a460f99ba4953d72b76656
  const cx = classNames.bind(style);

  let Type = "button";
  if (to) {
    Type = Link;
  }

<<<<<<< HEAD
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
=======
  return <Type to={to}>{content}</Type>;
>>>>>>> ee562d5e98d6239e75a460f99ba4953d72b76656
};

export default MyButton;
