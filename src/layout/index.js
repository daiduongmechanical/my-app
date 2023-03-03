import classNames from "classnames/bind";
import style from "./mainLayout.module.scss";

import Header from "./components/header";
import Footer from "./components/footer";

const MainLayout = ({ children }) => {
  const cx = classNames.bind(style);

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
