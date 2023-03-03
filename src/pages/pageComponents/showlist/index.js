import classNames from "classnames/bind";
import style from "./showlist.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ShowList = ({ header, data }) => {
  const cx = classNames.bind(style);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const showVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 1 }, delay: 0.5 },
    start: { y: 20, opacity: 0 },
  };

  useEffect(() => {
    if (inView) {
      console.log(1);
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className={cx("wrapper")}>
      <p className={cx("header")}>{header}</p>

      <div className={cx("slide")}>
        <motion.div
          ref={ref}
          variants={showVariants}
          initial="start"
          animate={controls}
          exit={{ y: -20, opacity: 0 }}
        >
          <Container>
            <Row sm={2} xs={1} md={3} lg={4}>
              {data.map((e, index) => (
                <Col key={index}>
                  <div className={cx("slide__item")}>
                    <img
                      className={cx("slide__item--img")}
                      src={e}
                      alt="error"
                    />
                    <div className={cx("slide__item--name")}>Name</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </motion.div>
      </div>
    </div>
  );
};

export default ShowList;
