import classNames from "classnames/bind";
import style from "./overviewPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adminURL from "../../config/adminURL";
import {
  faBagShopping,
  faCoins,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState, Fragment, useEffect } from "react";
import { Cookies } from "react-cookie";

const OverViewPage = () => {
  const cx = classNames.bind(style);
  const d = new Date();
  const cookies = new Cookies();
  const [type, setType] = useState("month");
  const [show, setShow] = useState({});
  const [data, setData] = useState(
    `${d.getFullYear()}-${
      d.getMonth() + 1 > 9 ? d.getMonth() : "0" + (d.getMonth() + 1)
    }`
  );

  useEffect(() => {
    let timeType = "";
    if (type === "month") {
      timeType = "month";
    }
    if (type === "year") {
      timeType = "year";
    }
    if (type === "day") {
      timeType = "day";
    }
    adminURL
      .get(`/overview/total?${timeType}=${data}`, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        setShow(response.data);
      })
      .catch((err) => console.log(err));
  }, [type, data]);

  const covertTime = (typeData, timeConvert) => {
    if (typeData === "month") {
      console.log(timeConvert);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header__left")}>
          <h4>Overview by</h4>
          <select onChange={(e) => setType(e.target.value)}>
            <option value="month">month</option>
            <option value="year">year</option>
            <option value="day">day</option>
          </select>
        </div>
        {type === "month" && (
          <input
            onChange={(e) => setData(e.target.value)}
            type="month"
            defaultValue={`${d.getFullYear()}-${
              d.getMonth() + 1 > 9 ? d.getMonth() : "0" + (d.getMonth() + 1)
            }`}
          />
        )}
        {type === "year" && (
          <input
            onChange={(e) => setData(e.target.value)}
            type="number"
            max={d.getFullYear()}
            defaultValue={d.getFullYear()}
          />
        )}
        {type === "day" && (
          <input
            onChange={(e) => setData(e.target.value)}
            type="date"
            defaultValue={`${d.getFullYear()}-${
              d.getMonth() + 1 > 9 ? d.getMonth() : "0" + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : "0" + d.getDate()}`}
          />
        )}
      </div>

      <div className={cx("main")}>
        <div className={cx("main__item", "main__item--revenue")}>
          <div className={cx("income__icon")}>
            <FontAwesomeIcon icon={faCoins} />
          </div>
          <p>Total Revenue</p>
          <h4>{show.length === 0 ? "" : `$ ${show.cost}`}</h4>
        </div>

        <div className={cx("main__item", "main__item--order")}>
          <div className={cx("income__icon")}>
            <FontAwesomeIcon icon={faEye} />
          </div>
          <p>Total view</p>
          <h4>{show.length === 0 ? "" : `${show.view}`}</h4>
        </div>
        <div className={cx("main__item", "main__item--view")}>
          <div className={cx("income__icon")}>
            <FontAwesomeIcon icon={faBagShopping} />
          </div>
          <p>Total Order</p>
          <h4>{show.length === 0 ? "" : `${show.order}`}</h4>
        </div>
      </div>
      <div className={cx("detail")}>
        <h3>Detail</h3>
        <div className={cx("detail__item")}>
          <img src="http://localhost:8000/images/pasta.jpg" alt="errror" />
          <div className={cx("detail__item--detail")}>
            <p>name</p>
            <h5>grilled chicken with fresh cherry salsa</h5>
          </div>
          <div className={cx("detail__item--detail")}>
            <p>Total Views</p>
            <h5>40</h5>
          </div>
          <div className={cx("detail__item--detail")}>
            <p>Total Orders</p>
            <h5>30</h5>
          </div>
          <div className={cx("detail__item--detail")}>
            <p>Total Revenue</p>
            <h5>$100.00</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
