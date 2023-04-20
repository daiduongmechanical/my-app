import classNames from "classnames/bind";
import { useState, useContext, useEffect, Fragment } from "react";
import style from "./previousorder.module.scss";
import MyButton from "../pageComponents/myButton";
import { AccountDetailContext } from "../../route";
import orderURL from "../../config/orderURL";
import DetailOrder from "../pageComponents/detailOrder/detailOrder";
import RateDish from "../pageComponents/rateDishes/index.js";
const PreviousOderPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);
  const [detail, setDetail] = useState([]);
  const [showRate, setShowRate] = useState(false);

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
          console.log(response.data);
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

  const handleRate = (e) => {
    setDetail(e);
    setShowRate(true);
  };
  const handleDetail = (e) => {
    setDetail(e);
    setShowRate(false);
  };

  //render
  return (
    <div className={cx("wrapper")}>
      {detail.length === 0 ? (
        <Fragment>
          {list.map((e, index) => (
            <div key={index} className={cx("order__item")}>
              <div className={cx("dish__detail")}>
                <h4>OrderID : #{e[0].OrderID}</h4>
                <p className={cx("order__status")}>
                  status :<b className={cx("status__field")}>{e[0].status}</b>
                </p>

                <p className={cx("total__cost")}>
                  Total Cost : <b>${e[0].TotalCost}</b>
                </p>
              </div>
              <div className={cx("bill__detail")}>
                <MyButton golden>
                  <span onClick={() => handleRate(e)}> Rate Dishes </span>
                </MyButton>
                <MyButton golden>
                  <span onClick={() => handleDetail(e)}>Detail Order</span>
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
