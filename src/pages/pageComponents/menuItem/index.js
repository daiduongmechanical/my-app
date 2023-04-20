import classNames from "classnames/bind";
import style from "./menuitem.module.scss";
import UpAnimation from "../upAnimation";
import { Link } from "react-router-dom";
import { AccountDetailContext } from "../../../route";
import { useContext } from "react";
import viewURL from "../../../config/viewURL";
const MenuItem = ({ data, sale }) => {
  const cx = classNames.bind(style);
  let arr = [];

  if (sale.length !== 0) {
    sale.forEach((e) => {
      arr = [...arr, Number(e.DishID)];
    });
  }

  //get account details context
  const getContext = useContext(AccountDetailContext);
  let account = getContext[0];

  const addView = () => {
    viewURL
      .post("/new", { dishID: data.dishid, userID: account.id })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <UpAnimation>
      <Link onClick={addView} to={`/detail-dish/${data.dishid}`}>
        <div className={cx("item")}>
          <div>
            <img className={cx("item__img")} src={data.dishimage} alt="error" />

            {arr.includes(data.dishid) && (
              <div className={cx("item__notice")}>
                <span>
                  {Number(sale[arr.indexOf(data.dishid)].DiscountAmount)}%
                </span>
              </div>
            )}
          </div>

          <div className={cx("item__content")}>
            <div className={cx("item__content--info")}>
              <h3 className={cx("name__dish")}>{data.dishname}</h3>

              <div className={cx("price")}>
                <span
                  className={cx("price__normal", {
                    price__sale: arr.includes(data.dishid),
                  })}
                >
                  ${parseFloat(data.dishprice).toFixed(2)}
                </span>
                {arr.includes(data.dishid) && (
                  <span>
                    $
                    {parseFloat(
                      data.dishprice -
                        (data.dishprice *
                          Number(
                            sale[arr.indexOf(data.dishid)].DiscountAmount
                          )) /
                          100
                    ).toFixed(2)}
                  </span>
                )}
              </div>
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
