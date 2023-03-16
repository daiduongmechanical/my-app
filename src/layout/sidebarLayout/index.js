import classNames from "classnames/bind";
import style from "./sidebarLayout.module.scss";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SideBar from "../components/sidebar";

const SidebarLayout = ({ children }) => {
  const cx = classNames.bind(style);

  const props = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: "out",
    transition: { duration: 1 },
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header__wrapper")}>
        <Header />
      </div>

      <div className={cx("main")}>
        <Row sm={1} xs={1} md={2} lg={2}>
          <Col sm={12} xs={12} md={4} lg={4}>
            <SideBar />
          </Col>
          <Col sm={12} xs={12} md={8} lg={8}>
            <motion.div {...props}>{children}</motion.div>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
};

export default SidebarLayout;
