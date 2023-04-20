import classNames from "classnames/bind";
import style from "./ratingItem.module.scss";
import { Rating } from "react-simple-star-rating";
import { useContext, useRef, useState, Fragment } from "react";
import MyButton from "../myButton";
import { AccountDetailContext } from "../../../route";
import rateURL from "../../../config/rateURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrown,
  faFaceMeh,
  faFaceSmile,
  faFaceSmileBeam,
  faFaceSmileWink,
} from "@fortawesome/free-solid-svg-icons";

const RatingItem = ({ data }) => {
  const cx = classNames.bind(style);
  const [rating, setRating] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [hideAll, setHideAll] = useState(false);
  const formRef = useRef();
  //get account details context
  const getContext = useContext(AccountDetailContext);
  const user = getContext[0];

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let datasend = new FormData(formRef.current);
    datasend.append("userID", user.id);
    datasend.append("raiting", rating);
    datasend.append("dishID", data.dishid);
    datasend.append("orderID", data.OrderID);

    rateURL
      .post("/", datasend)
      .then((response) => {
        console.log(response);
        if (response.statusText === "Created") {
          setShowResult(true);
          let dissappear = setInterval(() => {
            setHideAll(true);
            clearInterval(dissappear);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {!hideAll && (
        <div className={cx("wrapper")}>
          {showResult ? (
            <div className={cx("thank__you")}>
              Thank you so much for the rating ❤️
            </div>
          ) : (
            <div className={cx("item")}>
              <div className={cx("item__info")}>
                <img
                  className={cx("item__info--img")}
                  src={data.dishimage}
                  alt="error"
                />
                <h5>{data.dishname}</h5>
                <p>Price : ${parseFloat(data.dishprice).toFixed(2)}</p>
              </div>
              <div className={cx("item__rate")}>
                <form
                  onSubmit={handleUpdate}
                  className={cx("item__rate--form")}
                  ref={formRef}
                >
                  <div className={cx("item__rate--star")}>
                    <b>Rate</b>
                    <Rating size={25} onClick={handleRating} />
                    <div className={cx("btn__cover")}>
                      {rating === 1 && (
                        <span style={{ color: "#f50b06" }}>
                          <FontAwesomeIcon
                            className={cx("btn__cover--icon")}
                            icon={faFaceFrown}
                          />
                          bad
                        </span>
                      )}
                      {rating === 2 && (
                        <span style={{ color: "#fd902e" }}>
                          <FontAwesomeIcon
                            className={cx("btn__cover--icon")}
                            icon={faFaceMeh}
                          />
                          normal
                        </span>
                      )}
                      {rating === 3 && (
                        <span style={{ color: "#ffe51d" }}>
                          <FontAwesomeIcon
                            className={cx("btn__cover--icon")}
                            icon={faFaceSmile}
                          />
                          good
                        </span>
                      )}
                      {rating === 4 && (
                        <span style={{ color: "#5de525" }}>
                          <FontAwesomeIcon
                            className={cx("btn__cover--icon")}
                            icon={faFaceSmileWink}
                          />
                          very good
                        </span>
                      )}
                      {rating === 5 && (
                        <span style={{ color: "#fe19ac" }}>
                          <FontAwesomeIcon
                            className={cx("btn__cover--icon")}
                            icon={faFaceSmileBeam}
                          />
                          excellent
                        </span>
                      )}
                      <MyButton golden>send</MyButton>
                    </div>
                  </div>

                  <textarea
                    name="comment"
                    placeholder="share your fell"
                  ></textarea>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default RatingItem;
