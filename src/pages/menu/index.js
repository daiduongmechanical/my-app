import classNames from "classnames/bind";
import MenuList from "../pageComponents/menuList";
import style from "./menu.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import dishURL from "../../config/dishURL";

const MenuPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);

  let main = [];
  let drinks = [];
  let dessert = [];
  let start = [];

  useEffect(() => {
    dishURL
      .get("/")
      .then((response) => {
        console.log(response);
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (list.lenth !== 0) {
    list.forEach((e) => {
      switch (e.type) {
        case "dessert":
          dessert = [...dessert, e];
          break;
        case "drink":
          drinks = [...drinks, e];
          break;
        case "start":
          start = [...start, e];
          break;
        default:
          main = [...main, e];
          break;
      }
    });
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}></div>
      <Row sm={1} xs={1} md={2} lg={2}>
        <Col>
          <MenuList data={start} header="starter" />
        </Col>
        <Col>
          <MenuList data={main} header="main dish" />
        </Col>

        <Col>
          <MenuList data={dessert} header="dessert" />
        </Col>
        <Col>
          <MenuList data={drinks} header="drink" />
        </Col>
      </Row>
    </div>
  );
};

export default MenuPage;
