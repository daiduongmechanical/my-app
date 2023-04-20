import classNames from "classnames/bind";
import style from "./salePage.module.scss";
import { useEffect, useRef, useState, Fragment } from "react";
import adminURL from "../../config/adminURL";
import discountURL from "../../config/discountURL";
import { Cookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCirclePlus,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import MyButton from "../pageComponents/myButton";
import { motion } from "framer-motion";

const SalePage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState([]);
  const cookies = new Cookies();

  const showVariants = {
    start: { width: 0 },
    visible: { width: "50%", transition: { duration: 1 } },
  };
  //get list sale
  useEffect(() => {
    adminURL
      .get("/allsale", {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        if (response.statusText === "OK") {
          setList(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const showDetail = (e) => {
    discountURL
      .get(`/${e.DiscountID}`)
      .then((response) => {
        if (response.statusText === "OK") {
          setDetail(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div className={cx("header")}>
        <h4>Discount Management</h4>

        <div className={cx("header__btn")}>
          <div>
            <MyButton fit red to="/admin/manager-discount/new-discount">
              <FontAwesomeIcon
                className={cx("header__icon")}
                icon={faCirclePlus}
              />
              <span>Add new discount</span>
            </MyButton>
          </div>
        </div>
      </div>
      <div className={cx("wrapper")}>
        <table className={cx("table__cover", { half: detail.legnth !== 0 })}>
          <tbody>
            <tr className={cx("row__head")}>
              <th>DiscountID</th>
              <th>DiscountName</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Object</th>
              <th>DiscountAmount</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tfoot>
            {list.map((e, index) => (
              <tr
                onClick={() => showDetail(e)}
                key={index}
                className={cx("row__type", {
                  color: index % 2 !== 0 ? true : false,
                })}
              >
                <td>{e.DiscountID}</td>
                <td>{e.DiscountName}</td>
                <td>{e.StartDate}</td>
                <td>{e.EndDate}</td>
                <td>{e.object}</td>
                <td>{Number(e.DiscountAmount)}%</td>
                <td>
                  <span className={cx("action")}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <Link
                    to={`/admin/manager-discount/update/${e.DiscountID}`}
                    className={cx("action")}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </td>
              </tr>
            ))}
          </tfoot>
        </table>
        {detail.length !== 0 && (
          <motion.div
            variants={showVariants}
            initial="start"
            animate="visible"
            exit={{ x: -20 }}
            className={cx("detail__animation")}
          >
            <div className={cx("detail__dish")}>
              <div className={cx("detail__dish--header")}>
                <h3>{`Detail Discount : ${detail[0].DiscountID} `}</h3>
                <FontAwesomeIcon
                  onClick={() => setDetail([])}
                  className={cx("header__icon")}
                  icon={faXmark}
                />
              </div>

              <table>
                <tbody>
                  <tr>
                    <th>Dish ID</th>
                    <th>Dish name</th>
                  </tr>
                </tbody>
                <tfoot>
                  {detail.map((e, index) => (
                    <tr key={index}>
                      <td>{e.DishID}</td>
                      <td>{e.dishname}</td>
                    </tr>
                  ))}
                </tfoot>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </Fragment>
  );
};

export default SalePage;
