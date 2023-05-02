import classNames from "classnames/bind";
import { useState, useContext, useEffect, Fragment } from "react";
import style from "./currentOrderPage.module.scss";
import MyButton from "../pageComponents/myButton";
import { AccountDetailContext } from "../../route";
import orderURL from "../../config/orderURL";
import DetailOrder from "../pageComponents/detailOrder/detailOrder";
const CurrentOrderPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);
  const [detail, setDetail] = useState([]);

  //get account details context
  const getContext = useContext(AccountDetailContext);
  const userData = getContext[0];
  const closeDetail = () => {
    setDetail([]);
  };

  // get order by user
  useEffect(() => {
    if (userData !== undefined) {
      orderURL
        .get(`/${userData.id}?all=1`)
        .then((response) => {
          console.log(response);
          let recive = response.data;
          if (recive.length !== 0) {
            const groupedByAge = recive.reduce((result, person) => {
              if (!result[person.OrderID]) {
                result[person.OrderID] = [];
              }
              result[person.OrderID].push(person);
              return result;
            }, {});
            const resultArray = Object.values(groupedByAge);
            setList(resultArray);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData, changeStatus]);

  const cancelOrder = (orderID, status) => {
    let valueUpdate = status === "delivery" ? "finished" : "cancel";
    orderURL
      .post(`/${orderID}`, { type: valueUpdate, _method: "PUT" })
      .then((response) => {
        if (response.data === 1) {
          setChangeStatus((pre) => !pre);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cx("wrapper")}>
      {detail.length === 0 ? (
        <Fragment>
          {list.map((e, index) => (
            <div key={index} className={cx("order__item")}>
              <div className={cx("dish__detail")}>
                <h4>OrderID : #{e[0].orderid}</h4>
                <p className={cx("order__status")}>
                  status :
                  <b
                    className={cx("status__field", {
                      accept: e[0].status === "accept",
                      waiting: e[0].status === "waiting",
                      delivery: e[0].status === "delivery",
                    })}
                  >
                    {e[0].status}
                  </b>
                </p>

                <p className={cx("total__cost")}>
                  Total Cost : <b>${parseFloat(e[0].totalcost).toFixed(2)}</b>
                </p>
              </div>
              <div className={cx("bill__detail")}>
                <MyButton
                  red={e[0].status !== "delivery"}
                  green={e[0].status === "delivery"}
                >
                  <span onClick={() => cancelOrder(e[0].OrderID, e[0].status)}>
                    {e[0].status === "delivery"
                      ? "conirm recieved"
                      : "Cancel Order"}
                  </span>
                </MyButton>
                <MyButton golden>
                  <span onClick={() => setDetail(e)}>Detail Order</span>
                </MyButton>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <div className={cx("wrapper__detail")}>
          <DetailOrder data={detail} action={closeDetail} tiny />
        </div>
      )}
    </div>
  );
};

export default CurrentOrderPage;
