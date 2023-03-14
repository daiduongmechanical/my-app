import classNames from "classnames/bind";
import style from "./menuitem.module.scss";
import UpAnimation from "../upAnimation";
import { Link } from "react-router-dom";
import { DishContext } from "../../../route";
import { useContext } from "react";
const MenuItem = ({ data }) => {
  const cx = classNames.bind(style);

  //get dish context
  const getDishContext = useContext(DishContext);
  let handleContext = getDishContext[1];

  const handleDish = () => {
    handleContext(data);
    localStorage.setItem("dishid", data.dishid);
  };

  return (
    <UpAnimation>
      <Link onClick={handleDish} to={"detail-dish"}>
        <div className={cx("item")}>
          <img className={cx("item__img")} src={data.dishimage} alt="error" />

          <div className={cx("item__content")}>
            <div className={cx("item__content--info")}>
              <h3 className={cx("name__dish")}>{data.dishname}</h3>
              <span className={cx("price")}>
                ${parseFloat(data.dishprice).toFixed(2)}
              </span>
            </div>
            <p className={cx("item__content--description")}>
              A small river named Duden flows by their place and supplies
            </p>
          </div>
        </div>
      </Link>
    </UpAnimation>
  );
};

export default MenuItem;
