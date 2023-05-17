import classNames from "classnames/bind";
import style from "./showlist.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UpAnimation from "../upAnimation";
import { Link } from "react-router-dom";

const ShowList = ({ header, data }) => {
  const cx = classNames.bind(style);

  return (
    <div className={cx("wrapper")}>
      <p className={cx("header")}>{header}</p>

      <div className={cx("slide")}>
        <UpAnimation>
          <Container>
            <Row sm={2} xs={1} md={3} lg={4}>
              {data.map((e) => (
                <Col key={e.dishid}>
                  <Link
                    to={`/detail-dish/${e.dishid}`}
                    className={cx("slide__link")}
                  >
                    <div className={cx("slide__item")}>
                      <img
                        className={cx("slide__item--img")}
                        src={
                          e.dish
                            ? e.dish.dishimages[
                                Math.floor(
                                  Math.random() *
                                    (e.dish.dishimages.length - 0) +
                                    0
                                )
                              ].imageurl
                            : e.dishimages[
                                Math.floor(
                                  Math.random() * (e.dishimages.length - 0) + 0
                                )
                              ].imageurl
                        }
                        alt="error"
                      />
                      <div className={cx("slide__item--name")}>
                        {e.dish ? e.dish.dishname : e.dishname}
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </UpAnimation>
      </div>
    </div>
  );
};

export default ShowList;
