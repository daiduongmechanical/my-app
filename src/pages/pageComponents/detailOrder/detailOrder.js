import classNames from "classnames/bind";
import style from "./detailorder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactToPrint from "react-to-print";
import { Fragment, useRef } from "react";
import orderURL from "../../../config/orderURL";
import { Cookies } from "react-cookie";
import TimeType from "../timeType";
import { useLocation } from "react-router-dom";

const DetailOrder = ({ action, data, changeData, tiny }) => {
  const cx = classNames.bind(style);
  const componentRef = useRef();
  const cookies = new Cookies();
  let location = useLocation().pathname;

  if (data.length === 0) {
    return;
  }
  const handleClose = () => action(false);

  const hanleStatus = () => {
    if (data[0].status === "waiting" || data[0].status === "cancel") {
      return;
    }
    let textUpdate = data[0].type === "delivery" ? "delivery" : "finished";
    orderURL
      .post(`/${data[0].OrderID}`, { type: textUpdate, _method: "PUT" })
      .then((response) => {
        if (response.data === 1) {
          changeData((pre) => !pre);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h3>OrderID : {data[0].OrderID}</h3>

        <FontAwesomeIcon
          icon={faXmark}
          onClick={handleClose}
          className={cx("icon__close")}
        />
      </div>
      <div className={cx("header__more")}>
        <p>
          Order date : <TimeType time={data[0].created_at} />{" "}
        </p>
        {location === "/admin/manager-order" && (
          <div onClick={hanleStatus}>
            <ReactToPrint
              trigger={() => (
                <span>
                  <FontAwesomeIcon
                    className={cx("icon__print")}
                    icon={faPrint}
                  />
                  Print bill and delivery
                </span>
              )}
              content={() => componentRef.current}
            />
          </div>
        )}
      </div>
      <hr></hr>

      <div className={cx("bill", { bill__tiny: tiny })}>
        <div className={cx("bill__item")}>
          {data.map((e, index) => (
            <div key={index} className={cx("detail__dish")}>
              <img src={e.dishimage} alt="error" />
              <div className={cx("detail__info")}>
                <div className={cx("location")}>
                  <p className={cx("detail__name")}>{e.dishname}</p>
                  <p className={cx("detail__require")}>
                    special require :
                    {e.require === "null" ? "no require" : e.require}
                  </p>
                </div>
                <div className={cx("location")}>
                  <p className={cx("detail__name")}>
                    {e.discount !== null && e.discount !== "0" ? (
                      <span>
                        $
                        {parseFloat(
                          e.quantity *
                            ((e.dishprice * (100 - Number(e.DiscountAmount))) /
                              100)
                        ).toFixed(2)}
                      </span>
                    ) : (
                      <span>
                        ${parseFloat(e.quantity * e.dishprice).toFixed(2)}
                      </span>
                    )}
                  </p>
                  <span className={cx("detail__require")}>
                    Qty : {e.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={cx("bill__detail")} ref={componentRef}>
          <h4>Customer infomation</h4>
          <div className={cx("cost__sub")}>
            <p className={cx("title")}>Customer name</p>
            <p>{data[0].name}</p>
          </div>

          <div className={cx("cost__sub")}>
            <p className={cx("title")}>Customer Phone</p>
            <p>{data[0].phone}</p>
          </div>
          <h3 className={cx("title")}>
            {data[0].type === "delivery" ? "Delivery" : "in restaurant"}
          </h3>
          <p className={cx("contain")}>{data[0].detail}</p>
          <hr></hr>
          <h4>Order Summary</h4>
          {data.map((e, index) => (
            <Fragment key={index}>
              <div className={cx("cost__more")}>
                <p className={cx("cost__more--name")}>
                  {e.dishname} x{e.quantity}
                </p>
                <p>${parseFloat(e.quantity * e.dishprice).toFixed(2)}</p>
              </div>
              {e.DiscountAmount && (
                <div className={cx("cost__more")}>
                  <p className={cx("cost__more--name")}>
                    {e.DiscountName} {`  __sale : ${Number(e.DiscountAmount)}%`}
                  </p>
                  <p>
                    - $
                    {parseFloat(
                      ((e.quantity * e.dishprice) / 100) *
                        Number(e.DiscountAmount)
                    ).toFixed(2)}
                  </p>
                </div>
              )}
            </Fragment>
          ))}
          <div className={cx("cost__sub")}>
            <p>Subtotal</p>
            <p>${parseFloat(data[0].TotalCost).toFixed(2)}</p>
          </div>
          <div className={cx("cost__more")}>
            <p>Delivery</p>
            <p>${parseFloat(2).toFixed(2)}</p>
          </div>
          <div className={cx("cost__more")}>
            <p>Discount</p>
            <p>${parseFloat(-2).toFixed(2)}</p>
          </div>
          <div className={cx("cost__more")}>
            <p>tax (10%)</p>
            <p>${parseFloat(0.1 * data[0].TotalCost).toFixed(2)}</p>
          </div>
          <hr></hr>
          <div className={cx("cost__total")}>
            <p>Total</p>
            <p>${parseFloat(1.1 * data[0].TotalCost).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
