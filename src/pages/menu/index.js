import classNames from "classnames/bind";
import style from "./menu.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import viewURL from "../../config/viewURL";

import { useState, useEffect, useContext, Fragment } from "react";
import discountURL from "../../config/discountURL";
import { Link } from "react-router-dom";
import { AccountDetailContext } from "../../route";
import dishURL from "../../config/dishURL";

const MenuPage = () => {
  const cx = classNames.bind(style);
  const [listSale, setListSale] = useState([]);
  const [menu, setMenu] = useState([]);
  const [sortValue, setSortValue] = useState("all");
  const [sortType, setSortType] = useState("asc");

  // get account detai context
  let getAttributeContext = useContext(AccountDetailContext);
  let account = getAttributeContext[0];

  //get list menu
  useEffect(() => {
    dishURL
      .get(`/?value=${sortValue}&type=${sortType}`)
      .then((response) => {
        if (response.statusText === "OK") {
          setMenu(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, [sortType, sortValue]);

  const addView = (e) => {
    let dishIDView = e.target.getAttribute("data-dishid");
    viewURL
      .post("/new", { dishID: dishIDView, userID: account.id })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  // get list discount
  useEffect(() => {
    discountURL
      .get("/")
      .then((response) => {
        setListSale(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={cx("wrapper")}>
      <form className={cx("sortbar")}>
        <div className={cx("sortbar__category")}>
          <span>Category : </span>
          <select
            name="sortvalue"
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="all">All</option>
            <option value="donut">Donut</option>
            <option value="rollcake">Roll cake</option>
            <option value="cupcake">Cup cake</option>
            <option value="tiramisu">Tiramisu</option>
          </select>
        </div>
        <div className={cx("sortbar__sorting")}>
          <div className={cx("sortbar__category")}>
            <span>Sorting By : </span>
            <select name="sortby" onChange={(e) => setSortType(e.target.value)}>
              <option value="asc">default</option>
              <option value="desc">z-a</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </form>
      <Row sm={2} xs={2} md={2} lg={4}>
        {menu.map((e) => (
          <Fragment key={e.dishid}>
            <Col sm={6} xs={6} md={6} lg={3}>
              <Link
                onClick={addView}
                className={cx("item__cover")}
                to={`/detail-dish/${e.dishid}`}
                data-dishid={e.dishid}
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
                      <img
                        src={e.dishimages[1].imageurl}
                        alt="error"
                        data-dishid={e.dishid}
                      />
                    </div>
                    <div className={cx("item__type")}>
                      <span>{e.type}</span>
                    </div>
                    <div className={cx("item__info")}>
                      <h4>{e.dishname}</h4>

                      <h4>
                        {listSale.length !== 0 &&
                        listSale.filter((dish) => dish.dishid === e.dishid)
                          .length !== 0
                          ? `$${parseFloat(
                              (e.dishprice *
                                (100 -
                                  listSale[
                                    listSale.findIndex(
                                      (i) => i.dishid === e.dishid
                                    )
                                  ].discountamount)) /
                                100
                            ).toFixed(2)}`
                          : `$${parseFloat(e.dishprice).toFixed(2)}`}
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          </Fragment>
        ))}
      </Row>
    </div>
  );
};

export default MenuPage;
