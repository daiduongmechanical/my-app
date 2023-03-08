import classNames from "classnames/bind";
import style from "./cartpage.module.scss";

const CartPage = () => {
  const cx = classNames.bind(style);

  return <div className={cx("wrapper")}></div>;
};

export default CartPage;
