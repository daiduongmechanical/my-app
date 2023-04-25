import classNames from "classnames/bind";
import style from "./menu.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState, useEffect } from "react";

import discountURL from "../../config/discountURL";
import { Link, useLocation } from "react-router-dom";

const MenuPage = () => {
  const cx = classNames.bind(style);
  let location = useLocation();
  let menu = location.state;

  const [listSale, setListSale] = useState([]);

  // get list dis count
  useEffect(() => {
    discountURL
      .get("/")
      .then((response) => {
        setListSale(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // get list dish

  console.log(listSale);
  console.log(menu);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <span className={cx("header__icon")}>cupcake</span>
        <span className={cx("header__icon")}>tiramisu</span>
        <span className={cx("header__icon")}>donuts</span>
        <span className={cx("header__icon")}>Cheesecake</span>
      </div>
      <Row sm={2} xs={3} md={3} lg={4}>
        {menu.map((e, index) => (
          <Col sm={6} xs={4} md={3} lg={3} key={index}>
            <Link
              className={cx("item__cover")}
              to={`/detail-dish/${e[0].dishid}`}
            >
              <div className={"ribbon"}>
                <div className={cx("item")}>
                  {listSale.filter((dish) => dish.dishid === e[0].dishid)
                    .length !== 0 && (
                    <span className={cx("ribbon6")}>{`Sale ${
                      listSale[
                        listSale.findIndex((i) => i.dishid === e[0].dishid)
                      ].discountamount
                    }%`}</span>
                  )}
                  <div className={cx("item__img")}>
                    <img src={e[0].dishimages[0].imageurl} alt="error" />
                  </div>
                  <div className={cx("item__type")}>
                    <span>{e[0].type}</span>
                  </div>
                  <div className={cx("item__info")}>
                    <h4>{e[0].dishname}</h4>

                    <h4>
                      {listSale.length !== 0 &&
                      listSale.filter((dish) => dish.dishid === e[0].dishid)
                        .length !== 0
                        ? `$${parseFloat(
                            (e[0].dishprice *
                              (100 -
                                listSale[
                                  listSale.findIndex(
                                    (i) => i.dishid === e[0].dishid
                                  )
                                ].discountamount)) /
                              100
                          ).toFixed(2)}`
                        : `$${parseFloat(e[0].dishprice).toFixed(2)}`}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MenuPage;
