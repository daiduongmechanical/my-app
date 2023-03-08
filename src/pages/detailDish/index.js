import classNames from "classnames/bind";
import style from "./detaildish.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyButton from "../pageComponents/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "tippy.js/dist/tippy.css"; // optional
import { useState } from "react";
import Comment from "../pageComponents/comment";

const DetailDishPage = () => {
  const cx = classNames.bind(style);
  const [info, setInfo] = useState(true);
  let arr = [1, 2, 3, 4];
  return (
    <div className={cx("wrapper")}>
      <Row sm={1} xs={1} md={2} lg={2}>
        <Col lg={5}>
          <div className={cx("dish__cover")}>
            <img
              className={cx("dish")}
              src="https://www.reviewjournal.com/wp-content/uploads/2018/07/10838405_web1_HELLSKITCHEN_071718ev_017.jpg?crop=1"
              alt="error"
            />

            <div className={cx("action")}>
              <h3 className={cx("action__name")}>Roast rack of lamb</h3>
              <h5 className={cx("action__price")}>Price : $20.00</h5>

              <div className={cx("action__input")}>
                <h5>Number : </h5>
                <input type="number" name="number" />
              </div>
              <div className={cx("action__cart")}>
                <MyButton golden>Add to cart</MyButton>
                <MyButton golden>Add to your favorite</MyButton>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={7}>
          <div className={cx("infomation")}>
            <div className={cx("header")}>
              <div
                onClick={() => setInfo(true)}
                className={cx("header__item", { active: info })}
              >
                <span> Descriptiion</span>
              </div>
              <div
                onClick={() => setInfo(false)}
                className={cx("header__item", { active: !info })}
              >
                <span> Comment</span>
              </div>
            </div>
            <div className={cx("infomation__show")}>
              {info ? (
                <p className={cx("description")}>
                  When lamb is at the center of the dinner table — especially
                  something as eye-catching as this rack of lamb — it makes the
                  meal feel special. This recipe is one of our favorite ways to
                  prepare a rack of lamb because it's simple but has wonderfully
                  complex flavors from the marinade. You simply rub the lamb
                  with plenty of garlic, rosemary, olive oil, and salt before
                  roasting it on high heat, so the meat browns but remains
                  medium-rare inside when it is done cooking (add another minute
                  or two to the roasting time if you prefer your lamb to be
                  cooked more).
                </p>
              ) : (
                <Comment data={arr} />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailDishPage;
