import classNames from "classnames/bind";
import style from "./footer.module.scss";

const Footer = () => {
  const cx = classNames.bind(style);

  return <div className={cx("wrapper")}>the footer bar</div>;
};

export default Footer;
