import classNames from "classnames/bind";
import MyButton from "../myButton";
import style from "./comment.module.scss";
import { Rating } from "react-simple-star-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrown,
  faFaceMeh,
  faFaceSmile,
  faFaceSmileBeam,
  faFaceSmileWink,
} from "@fortawesome/free-solid-svg-icons";
const Comment = ({ data }) => {
  const cx = classNames.bind(style);

  if (data.length === 0) {
    return;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {data.map((e, index) => (
          <div key={index} className={cx("item")}>
            <div className={cx("item__user")}>
              <img
                className={cx("item__img")}
                src="https://i.pinimg.com/280x280_RS/86/4b/70/864b70ac3cf273c2a2ded0a420d5ec21.jpg"
                alt="error"
              />
              <h4 className={cx("item__content--name")}>{e.name}</h4>

              <div className={cx("item__rate--star")}>
                <Rating size={20} initialValue={e.mark} allowHover={false} />

                <div className={cx("btn__cover")}>
                  {Number(e.mark) === 1 && (
                    <span style={{ color: "#f50b06" }}>
                      <FontAwesomeIcon
                        className={cx("btn__cover--icon")}
                        icon={faFaceFrown}
                      />
                      bad
                    </span>
                  )}
                  {Number(e.mark) === 2 && (
                    <span style={{ color: "#fd902e" }}>
                      <FontAwesomeIcon
                        className={cx("btn__cover--icon")}
                        icon={faFaceMeh}
                      />
                      normal
                    </span>
                  )}
                  {Number(e.mark) === 3 && (
                    <span style={{ color: "#ffe51d" }}>
                      <FontAwesomeIcon
                        className={cx("btn__cover--icon")}
                        icon={faFaceSmile}
                      />
                      good
                    </span>
                  )}
                  {Number(e.mark) === 4 && (
                    <span style={{ color: "#5de525" }}>
                      <FontAwesomeIcon
                        className={cx("btn__cover--icon")}
                        icon={faFaceSmileWink}
                      />
                      very good
                    </span>
                  )}
                  {Number(e.mark) === 5 && (
                    <span style={{ color: "#fe19ac" }}>
                      <FontAwesomeIcon
                        className={cx("btn__cover--icon")}
                        icon={faFaceSmileBeam}
                      />
                      excellent
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className={cx("item__content--text")}>{e.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
