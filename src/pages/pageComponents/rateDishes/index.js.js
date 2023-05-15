import classNames from "classnames/bind";
import RatingItem from "../ratingItem";
import style from "./rateDish.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import rateURL from "../../../config/rateURL";
const RateDish = ({ data, action }) => {
  const cx = classNames.bind(style);
  const [dataShow, setDataSHow] = useState([]);
  const closeModal = () => {
    action(false);
  };

  useEffect(() => {
    rateURL
      .get(`/${data.orderid}`)
      .then((response) => {
        if (response.statusText === "OK") {
          let dataCompare = response.data;
          data.forEach((e) => {
            let check = 0;
            dataCompare.forEach((item) => {
              if (e.dishid === item.dishid) {
                check++;
              }
            });
            if (check === 0) {
              setDataSHow((pre) => [...pre, e]);
              check = 0;
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h4>Rating dish</h4>
        <FontAwesomeIcon
          onClick={closeModal}
          className={cx("header__icon")}
          icon={faXmark}
        />
      </div>
      {dataShow.length === 0 ? (
        <div className={cx("finish__notice")}>
          <img src="http://localhost:8000/images/thankyou.png" alt="error" />
        </div>
      ) : (
        <Fragment>
          {dataShow.map((e, index) => (
            <RatingItem data={e} key={index} />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default RateDish;
