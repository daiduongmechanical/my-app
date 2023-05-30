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
import { useTranslation } from "react-i18next";

const DetailOrder = ({ action, data, changeData, tiny, specical }) => {
  const cx = classNames.bind(style);
  const componentRef = useRef();
  const cookies = new Cookies();
  const typeData = specical ? data.order_dishes : data.orderdishes;
  let location = useLocation().pathname;
  const { t } = useTranslation();

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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h3>{`${t("detailorder.id")} : ${data.orderid}`}</h3>

        <FontAwesomeIcon
          icon={faXmark}
          onClick={handleClose}
          className={cx("icon__close")}
        />
      </div>
      <div className={cx("header__more")}>
        <p>
          {t("detailorder.date")} : <TimeType time={data.created_at} />
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
                  {t("detailorder.print")}
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
          {typeData.map((e, index) => (
            <div key={index} className={cx("detail__dish")}>
              <img src={e.dish.dishimages[0].imageurl} alt="error" />
              <div className={cx("detail__info")}>
                <div className={cx("location")}>
                  <p className={cx("detail__name")}>{e.dish.dishname}</p>
                  <p className={cx("detail__require")}>
                    {t("detailorder.specialty")}
                    {e.require === "null" ? "no require" : e.dish.require}
                  </p>
                </div>
                <div className={cx("location")}>
                  {e.discount && (
                    <h3>
                      <span className={cx("discount__info")}>
                        <span className={cx("discount__info--name")}>
                          {e.discountdata.discountname}
                        </span>
                        <span>
                          <b>{`Sale : ${e.discountdata.discountamount}%`}</b>
                        </span>
                      </span>
                    </h3>
                  )}
                  <p className={cx("detail__price")}>
                    {e.discount
                      ? `$${parseFloat(
                          (e.dish.dishprice -
                            (e.dish.dishprice * e.discountdata.discountamount) /
                              100) *
                            e.quantity
                        ).toFixed(2)}`
                      : `$${parseFloat(e.dish.dishprice * e.quantity).toFixed(
                          2
                        )}`}
                  </p>
                  <span className={cx("detail__qty")}>{`${t(
                    "detailorder.qty"
                  )} : ${e.quantity}`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={cx("bill__detail")} ref={componentRef}>
          <h4>{t("detailorder.info")}</h4>
          <div className={cx("cost__sub")}>
            <p className={cx("title")}>{t("detailorder.name")}</p>
            <p>{data.user.name}</p>
          </div>

          <div className={cx("cost__sub")}>
            <p className={cx("title")}>{t("detailorder.phone")}</p>
            <p>{data.user.phone}</p>
          </div>
          <div className={cx("cost__sub")}>
            <p className={cx("title")}>{t("detailorder.address")}</p>
            <p> {data.user.manage === 0 ? `${data.detail}` : "In store"}</p>
          </div>

          <hr></hr>
          <h4>{t("detailorder.summary")}</h4>
          {typeData.map((e, index) => (
            <Fragment key={index}>
              <div className={cx("cost__more")}>
                <p className={cx("cost__more--name")}>
                  {e.dish.dishname} x{e.quantity}
                </p>
                <p>
                  {e.discount
                    ? `$${parseFloat(
                        (e.dish.dishprice -
                          (e.dish.dishprice * e.discountdata.discountamount) /
                            100) *
                          e.quantity
                      ).toFixed(2)}`
                    : `$${parseFloat(e.dish.dishprice * e.quantity).toFixed(
                        2
                      )}`}
                </p>
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
            <p>{t("detailorder.sub")}</p>
            <p>${parseFloat(data.totalcost).toFixed(2)}</p>
          </div>
          {data.type === "delivery" && (
            <div className={cx("cost__more")}>
              <p>{t("detailorder.delivery")}</p>
              <p>${parseFloat(2).toFixed(2)}</p>
            </div>
          )}

          <hr></hr>
          <div className={cx("cost__total")}>
            <p>{t("detailorder.total")}</p>
            <p>${parseFloat(data.totalcost).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
