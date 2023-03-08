import classNames from "classnames/bind";
import style from "./showlist.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UpAnimation from "../upAnimation";

const ShowList = ({ header, data }) => {
  const cx = classNames.bind(style);

  return (
    <div className={cx("wrapper")}>
      <p className={cx("header")}>{header}</p>

      <div className={cx("slide")}>
        <UpAnimation>
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
        </UpAnimation>
      </div>
    </div>
  );
};

export default ShowList;
