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
    let textUpdate;
    if (data.type === "store") {
      if (data.status === "cancel") {
        return;
      }
      textUpdate = "finished";
    } else {
      if (data.status === "cancel") {
        return;
      }
      textUpdate = "delivery";
    }
    orderURL
      .post(`/${data.orderid}`, { type: textUpdate, _method: "PUT" })
      .then((response) => {
        if (response.data === 1) {
          changeData((pre) => !pre);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h3>OrderID : {data.orderid}</h3>

        <FontAwesomeIcon
          icon={faXmark}
          onClick={handleClose}
          className={cx("icon__close")}
        />
      </div>
      <div className={cx("header__more")}>
        <p>
          Order date : <TimeType time={data.created_at} />{" "}
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
          {data.order_dishes.map((e, index) => (
            <div key={index} className={cx("detail__dish")}>
              <img src={e.dish.dishimages[0].imageurl} alt="error" />
              <div className={cx("detail__info")}>
                <div className={cx("location")}>
                  <p className={cx("detail__name")}>{e.dish.dishname}</p>
                  <p className={cx("detail__require")}>
                    special require :
                    {e.require === "null" ? "no require" : e.dish.require}
                  </p>
                </div>
                <div className={cx("location")}>
                  <p className={cx("detail__name")}>
                    {e.discountid !== null ? (
                      <span>
                        $
                        {parseFloat(
                          e.quantity *
                            ((e.dish.dishprice *
                              (100 - Number(e.DiscountAmount))) /
                              100)
                        ).toFixed(2)}
                      </span>
                    ) : (
                      <span>
                        $
                        {parseFloat(
                          Number(e.quantity) * Number(e.dish.dishprice)
                        ).toFixed(2)}
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
            <p>{data.user.name}</p>
          </div>

          <div className={cx("cost__sub")}>
            <p className={cx("title")}>Customer Phone</p>
            <p>{data.user.phone}</p>
          </div>
          <div className={cx("cost__sub")}>
            <p className={cx("title")}>Address</p>
            <p> {data.user.manage === 0 ? `${data.detail}` : "In store"}</p>
          </div>

          <hr></hr>
          <h4>Order Summary</h4>
          {data.order_dishes.map((e, index) => (
            <Fragment key={index}>
              <div className={cx("cost__more")}>
                <p className={cx("cost__more--name")}>
                  {e.dish.dishname} x{e.quantity}
                </p>
                <p>${parseFloat(e.quantity * e.dish.dishprice).toFixed(2)}</p>
              </div>
              {e.DiscountAmount && (
                <div className={cx("cost__more")}>
                  <p className={cx("cost__more--name")}>
                    {e.DiscountName} {`  __sale : ${Number(e.DiscountAmount)}%`}
                  </p>
                  <p>
                    - $
                    {parseFloat(
                      ((e.quantity * e.dish.dishprice) / 100) *
                        Number(e.DiscountAmount)
                    ).toFixed(2)}
                  </p>
                </div>
              )}
            </Fragment>
          ))}
          <div className={cx("cost__sub")}>
            <p>Subtotal</p>
            <p>${parseFloat(data.totalcost / 23000 / 100).toFixed(2)}</p>
          </div>
          {data.type === "delivery" && (
            <div className={cx("cost__more")}>
              <p>Delivery</p>
              <p>${parseFloat(2).toFixed(2)}</p>
            </div>
          )}

          <div className={cx("cost__more")}>
            <p>tax (10%)</p>
            <p>
              ${parseFloat((0.1 * data.totalcost) / 23000 / 100).toFixed(2)}
            </p>
          </div>
          <hr></hr>
          <div className={cx("cost__total")}>
            <p>Total</p>
            <p>
              ${parseFloat((1.1 * data.totalcost) / 23000 / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
