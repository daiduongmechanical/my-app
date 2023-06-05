import classNames from "classnames/bind";
import { useState, useContext, useEffect, Fragment, useRef } from "react";
import style from "./previousorder.module.scss";
import MyButton from "../pageComponents/myButton";
import { AccountDetailContext } from "../../route";
import orderURL from "../../config/orderURL";
import DetailOrder from "../pageComponents/detailOrder/detailOrder";
import RateDish from "../pageComponents/rateDishes/index.js";
import { useTranslation } from "react-i18next";
const PreviousOderPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);
  const [detail, setDetail] = useState([]);
  const [showRate, setShowRate] = useState(false);
  const { t } = useTranslation();

  //get account details context
  const getContext = useContext(AccountDetailContext);
  const userData = getContext[0];
  const closeDetail = () => {
    setDetail([]);
  };
  // get list order
  useEffect(() => {
    if (userData !== undefined) {
      orderURL
        .get(`/${userData.id}?all=0`)
        .then((response) => {
          setList(response.data);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData, changeStatus]);

  const handleRate = (e) => {
    setDetail(e);
    setShowRate(true);
  };
  const handleDetail = (e) => {
    setDetail(e);
    setShowRate(false);
  };

  if (list === undefined) {
    return;
  }
  //render
  return (
    <div className={cx("wrapper")}>
      {detail.length === 0 ? (
        <Fragment>
          {list.map((e, index) => (
            <div key={index} className={cx("order__item")}>
              <div className={cx("dish__detail")}>
                <h4>{`${t("order.id")} : #${e.orderid}`}</h4>
                <p className={cx("order__status")}>
                  {`${t("order.status")} :`}
                  <b className={cx("status__field")}>{e.status}</b>
                </p>

                <p className={cx("total__cost")}>
                  {`${t("order.total")} : `}
                  <b>{`$ ${parseFloat(e.totalcost).toFixed(2)}`}</b>
                </p>
              </div>
              <div className={cx("bill__detail")}>
                <MyButton golden>
                  <span onClick={() => handleRate(e)}> {t("order.rate")} </span>
                </MyButton>
                <MyButton golden>
                  <span onClick={() => handleDetail(e)}>
                    {t("order.detail")}
                  </span>
                </MyButton>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <div className={cx("wrapper__detail")}>
          {showRate ? (
            <RateDish data={detail} action={closeDetail} />
          ) : (
            <DetailOrder data={detail} action={closeDetail} tiny />
          )}
        </div>
      )}
    </div>
  );
};

export default PreviousOderPage;
