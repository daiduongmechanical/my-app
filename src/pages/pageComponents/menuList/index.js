import classNames from "classnames/bind";
import style from "./menulist.module.scss";
import UpAnimation from "../upAnimation";
import { Link } from "react-router-dom";

const MenuList = ({ data, header }) => {
  const cx = classNames.bind(style);

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("header")}>{header}</h3>

      {data.map((e, index) => (
        <UpAnimation>
          <Link to={"detail-dish"}>
            <div key={index} className={cx("item")}>
              <img
                className={cx("item__img")}
                src="https://www.restaurantware.com/media/wysiwyg/Top_10_Most_Luxurious_Foods_wagyu_-_Full_Width_1_2.png"
                alt="error"
              />

              <div className={cx("item__content")}>
                <div className={cx("item__content--info")}>
                  <h3 className={cx("name__dish")}>{e.name}</h3>
                  <span className={cx("price")}>$20.00</span>
                </div>
                <p className={cx("item__content--description")}>
                  A small river named Duden flows by their place and supplies
                </p>
              </div>
            </div>
          </Link>
        </UpAnimation>
      ))}
      {/* end item */}
    </div>
  );
};

export default MenuList;
