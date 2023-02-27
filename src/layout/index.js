// import classNames from "classnames/bind";
// import style from "./mainLayout.module.scss";

import Header from "./components/header";
import Footer from "./components/footer";
import { Fragment } from "react";

const MainLayout = ({ children }) => {
  // const cx = classNames.bind(style);

  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default MainLayout;
