import classNames from "classnames/bind";
import MyButton from "../myButton";
import style from "./comment.module.scss";

const Comment = ({ data }) => {
  const cx = classNames.bind(style);

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
              <h4 className={cx("item__content--name")}>vainho123</h4>
            </div>

            <p className={cx("item__content--text")}>
              it makes the meal feel special. This recipe is one of our favorite
              ways to prepare a rack of lamb because it's simple but has
              wonderfully complex flavors from the marinade. You simply rub the
              lamb with plenty of garlic, rosemary, olive oil, and salt before
            </p>
          </div>
        ))}
      </div>
      <div className={cx("action")}>
        <input className={cx("action__input")} type="text" />
        <MyButton goldenfit golden>
          send
        </MyButton>
      </div>
    </div>
  );
};

export default Comment;
