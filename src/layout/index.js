import classNames from "classnames/bind";
import style from "./mainLayout.module.scss";
import { useEffect } from "react";
import { useLocation } from "react-router";

import Header from "./components/header";
import Footer from "./components/footer";

const MainLayout = ({ children }) => {
  const cx = classNames.bind(style);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header__wrapper")}>
        <Header />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
