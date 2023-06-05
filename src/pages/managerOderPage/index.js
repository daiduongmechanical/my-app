import classNames from "classnames/bind";
import style from "./manageroderpage.module.scss";

import { Fragment, useEffect, useRef, useState } from "react";
import MyButton from "../pageComponents/myButton";
import adminURL from "../../config/adminURL";
import { Cookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faEye,
  faSearch,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import DetailOrder from "../pageComponents/detailOrder/detailOrder";
import TimeType from "../pageComponents/timeType";
import orderURL from "../../config/orderURL";

const ManagerOrderPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [detail, showDetail] = useState(false);
  const [detailOrder, setDetailOrder] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [typeSearch, setTypeSearch] = useState("");
  const [daySearch, setDaySearch] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const [refresh, setRefresh] = useState(true);
  const searchRef = useRef();
  const [page, setPage] = useState(1);
  const [pageCover, setPageCover] = useState({});
  const pageItem = [];

  const cookies = new Cookies();

  //get list order
  useEffect(() => {
    let query = `/order?page=${page} ${
      typeSearch === "" ? "" : "&sort=" + typeSearch
    } ${daySearch === "" ? "" : "&day=" + daySearch}
  ${idSearch === "" ? "" : "&search=" + idSearch}
  `;
    adminURL
      .get(query, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        if (response.data.length !== 0) {
          setList(response.data.data);
          setPageCover(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateStatus, daySearch, typeSearch, page, idSearch, refresh]);

  //accept order
  const handleAccept = (id, status) => {
    if (status === "cancel" || status === "accept" || status === "finished") {
      return;
    }
    let action = status === "waiting" ? "accept" : "finished";
    orderURL
      .post(`/${id}`, { type: action, _method: "PUT" })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setUpdateStatus((pre) => !pre);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleView = (data) => {
    setDetailOrder(data);
    showDetail(true);
  };

  const closeDetail = (x) => {
    showDetail(x);
  };

  if (Object.keys(pageCover).length !== 0) {
    for (let i = 0; i < pageCover.last_page; i++) {
      pageItem.push(i + 1);
    }
  }

  const handleNextPage = () => {
    if (pageCover.next_page_url === null) {
    } else {
      let position = pageCover.next_page_url.split("page=")[1];
      setPage(position);
    }
  };
  const handlePreviousPage = () => {
    if (pageCover.prev_page_url === null) {
    } else {
      let position = pageCover.prev_page_url.split("page=")[1];
      setPage(position);
    }
  };

  const clearSort = () => {
    setDaySearch("");
    setIdSearch("");
    setTypeSearch("");
    setPage(1);
    searchRef.current.value = "";
    setRefresh(!refresh);
  };

  //render
  return (
    <div className={cx("wrapper")}>
      {show && (
        <div className={cx("hidden__modal")}>
          <div className={cx("hidden__notice")}>
            <p className={cx("hidden__notice--text")}>
              do you really want delete this dish??
            </p>
            <MyButton full golden>
              <p> YES</p>
            </MyButton>
            <MyButton full golden>
              <p onClick={() => setShow(false)}> NO</p>
            </MyButton>
          </div>
        </div>
      )}

      <div className={cx("header")}>
        <h4>Orders management</h4>
      </div>
      {!detail && (
        <div className={cx("sort__bar")}>
          <select
            value={typeSearch}
            onChange={(e) => setTypeSearch(e.target.value)}
            className={cx("sort__item")}
          >
            <option value="">All</option>
            <option value="finished">Finished</option>
            <option value="waiting">Waiting</option>
            <option value="cancel">Cancel</option>
            <option value="delivery">Delivery</option>
          </select>

          <input
            className={cx("sort__item")}
            type="date"
            value={daySearch}
            max={new Date().toISOString().split("T")[0]}
            placeholder="select by date"
            onChange={(e) => setDaySearch(e.target.value)}
          />

          <input
            ref={searchRef}
            className={cx("item__search")}
            type="text"
            placeholder="search OrderID"
          />
          <span
            className={cx("search__icon")}
            onClick={() => setIdSearch(searchRef.current.value)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>

          <div onClick={clearSort} className={cx("refresh__button")}>
            <span>refresh page</span>
            <span className={cx("refresh__icon")}>
              <FontAwesomeIcon icon={faArrowsRotate} />
            </span>
          </div>
        </div>
      )}

      <div className={cx("main__cover")}>
        {!detail && (
          <div className={cx("wrapper__table")}>
            <div className={cx("table__cover")}>
              <table>
                <tbody>
                  <tr className={cx("row__head")}>
                    <th>OrderID</th>
                    <th>UserName</th>
                    <th>Order date</th>
                    {!detail && (
                      <Fragment>
                        <th>Type </th>
                        <th>Detail </th>
                        <th>Status </th>
                        <th>TotalCost</th>
                        <th>Action</th>
                      </Fragment>
                    )}
                  </tr>
                </tbody>
                <tfoot>
                  {list.map((e, index) => (
                    <tr
                      key={index}
                      className={cx("row__type", {
                        color: index % 2 !== 0 ? true : false,
                      })}
                    >
                      <td>{e.orderid}</td>
                      <td>{e.user.name}</td>
                      <td>
                        <TimeType time={e.created_at} />
                      </td>

                      {!detail && (
                        <Fragment>
                          <td>{e.type}</td>
                          <td>{e.detail}</td>
                          <td className={cx("status__cover")}>
                            <div
                              className={cx("status", {
                                waiting: e.status === "waiting",
                                cancel: e.status === "cancel",
                                finish: e.status === "finished",
                                delivery: e.status === "delivery",
                                accept: e.status === "accept",
                              })}
                            >
                              <span>{e.status}</span>
                            </div>
                          </td>
                          <td>{`$ ${parseFloat(e.totalcost).toFixed(2)}`}</td>

                          <td>
                            <Tippy
                              placement="bottom"
                              content={
                                e.status === "delivery"
                                  ? "check to finished"
                                  : "accept order"
                              }
                            >
                              <span className={cx("action")}>
                                <FontAwesomeIcon
                                  className={cx("icon", {
                                    disable: !(
                                      e.status === "waiting" ||
                                      e.status === "delivery"
                                    ),
                                    toaccept: e.status === "delivery",
                                  })}
                                  icon={faSquareCheck}
                                  onClick={() =>
                                    handleAccept(e.orderid, e.status)
                                  }
                                />
                              </span>
                            </Tippy>

                            <Tippy placement="bottom" content={"See order"}>
                              <span className={cx("action")}>
                                <FontAwesomeIcon
                                  className={cx("icon")}
                                  onClick={() => handleView(e)}
                                  icon={faEye}
                                />
                              </span>
                            </Tippy>
                          </td>
                        </Fragment>
                      )}
                    </tr>
                  ))}
                </tfoot>
              </table>
            </div>

            <div className={cx("pagination")}>
              <div
                className={cx("pagination__special")}
                onClick={handlePreviousPage}
              >
                <span> previous page</span>
              </div>
              <div className={cx("pagination__sub")}>
                {pageItem.map((e, index) => (
                  <div
                    key={index}
                    onClick={() => setPage(e)}
                    className={cx("pagination__item", {
                      active: e === pageCover.current_page,
                    })}
                  >
                    <span>{e}</span>
                  </div>
                ))}
              </div>
              <div
                className={cx("pagination__special")}
                onClick={handleNextPage}
              >
                <span> next page</span>
              </div>
            </div>
          </div>
        )}
        {detail && (
          <div className={cx("detail__dish")}>
            <DetailOrder
              data={detailOrder}
              specical
              action={closeDetail}
              changeData={setUpdateStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerOrderPage;
