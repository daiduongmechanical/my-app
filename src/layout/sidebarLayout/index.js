import classNames from "classnames/bind";
import style from "./sidebarLayout.module.scss";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";
import { Fragment, useContext } from "react";

import SideBar from "../components/sidebar";

const SidebarLayout = ({ children }) => {
  const cx = classNames.bind(style);

  const props = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: "out",
    transition: { duration: 4 },
  };
  return (
    <Fragment>
      <div className={cx("header__wrapper")}>
        <Header />
      </div>
      <div className={cx("main")}>
        <SideBar />
        <motion.div {...props}>{children}</motion.div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default SidebarLayout;
