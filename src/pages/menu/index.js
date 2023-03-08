import classNames from "classnames/bind";
import MenuList from "../pageComponents/menuList";
import style from "./menu.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MenuPage = () => {
  const cx = classNames.bind(style);

  let arr = [
    { name: "mon 1", type: "main dish" },
    { name: "mon 2", type: "dessert" },
    { name: "mon 3", type: "drink" },
    { name: "mon 4", type: "main dish" },
    { name: "mon 5", type: "main dish" },
    { name: "mon 6", type: "drink" },
    { name: "mon 7", type: "dessert" },
    { name: "mon 8", type: "main dish" },
    { name: "mon 9", type: "drink" },
  ];

  let main = [];
  let drinks = [];
  let dessert = [];

  arr.forEach((e) => {
    switch (e.type) {
      case "dessert":
        dessert = [...dessert, e];
        break;
      case "drink":
        drinks = [...drinks, e];
        break;
      default:
        main = [...main, e];
        break;
    }
  });
  console.log(main);
  console.log(drinks);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}></div>
      <Row sm={1} xs={1} md={2} lg={2}>
        <Col>
          <MenuList data={main} header="main dish" />
        </Col>
        <Col>
          <MenuList data={drinks} header="drink" />
        </Col>
        <Col>
          <MenuList data={dessert} header="dessert" />
        </Col>
      </Row>
    </div>
  );
};

export default MenuPage;
