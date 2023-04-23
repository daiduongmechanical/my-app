import classNames from "classnames/bind";
import style from "./menu.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import dishURL from "../../config/dishURL";
// import discountURL from "../../config/discountURL";
import { Link } from "react-router-dom";

const MenuPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  // const [listSale, setListSale] = useState([]);

  // // get list dis count
  // useEffect(() => {
  //   discountURL
  //     .get("/")
  //     .then((response) => {
  //       if (response.statusText === "OK") {
  //         setListSale(response.data);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // get list dish
  useEffect(() => {
    dishURL
      .get("/")
      .then((response) => {
        let recive = response.data;
        const groupedByDishID = recive.reduce((result, dish) => {
          if (!result[dish.dishid]) {
            result[dish.dishid] = [];
          }
          result[dish.dishid].push(dish);
          return result;
        }, {});
        const resultArray = Object.values(groupedByDishID);
        setList(resultArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(list);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <span className={cx("header__icon")}>cupcake</span>
        <span className={cx("header__icon")}>tiramisu</span>
        <span className={cx("header__icon")}>donuts</span>
        <span className={cx("header__icon")}>Cheesecake</span>
      </div>
      <Row sm={2} xs={3} md={3} lg={4}>
        {list.map((e, index) => (
          <Col key={index}>
            <Link to={`/detail-dish/${e[0].dishid}`}>
              <div className={cx("item")}>
                <div className={cx("item__img")}>
                  <img src={e[0].dishimages[0].imageurl} alt="error" />
                </div>
                <div className={cx("item__type")}>
                  <span>{e[0].type}</span>
                </div>
                <div className={cx("item__info")}>
                  <h4>{e[0].dishname}</h4>
                  <h4>${parseFloat(e[0].dishprice).toFixed(2)}</h4>
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
