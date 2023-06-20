import classNames from "classnames/bind";
import style from "./menu.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import viewURL from "../../config/viewURL";

import { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { AccountDetailContext } from "../../route";
import dishURL from "../../config/dishURL";
import { useTranslation } from "react-i18next";

const MenuPage = () => {
  const cx = classNames.bind(style);
  const [menu, setMenu] = useState([]);
  const [sortValue, setSortValue] = useState("all");
  const [sortType, setSortType] = useState("asc");
  const { t } = useTranslation();

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

  return (
    <div className={cx("wrapper")}>
      <form className={cx("sortbar")}>
        <div className={cx("sortbar__category")}>
          <span>{`${t("menu.category")} :`}</span>
          <select
            name="sortvalue"
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="all">{t("menu.all")}</option>
            <option value="donut">Donut</option>
            <option value="roll cake">Roll cake</option>
            <option value="cup cake">Cup cake</option>
            <option value="tiramisu">Tiramisu</option>
          </select>
        </div>
        <div className={cx("sortbar__sorting")}>
          <div className={cx("sortbar__category")}>
            <span>{`${t("menu.groupby")} :`}</span>
            <select name="sortby" onChange={(e) => setSortType(e.target.value)}>
              <option value="asc">{t("menu.default")}</option>
              <option value="desc">z-a</option>
              <option value="price">{t("menu.upprice")}</option>
              <option value="downprice">{t("menu.downprice")}</option>
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
                    {e.discount && (
                      <span className={cx("ribbon6")}>
                        {`Sale : ${e.discountdata.discountamount}%`}
                      </span>
                    )}

                    <div className={cx("item__img")}>
                      <img
                        src={
                          e.dishimages[
                            Math.floor(
                              Math.random() * (e.dishimages.length - 0) + 0
                            )
                          ].imageurl
                        }
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
                        $
                        {parseFloat(
                          e.discount
                            ? e.dishprice -
                                (e.dishprice *
                                  Number(e.discountdata.discountamount)) /
                                  100
                            : e.dishprice
                        ).toFixed(2)}
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
