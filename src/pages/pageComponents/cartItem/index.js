import style from "./cartitem.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import MyButton from "../myButton";
import cartURL from "../../../config/cartURL";
import useDebounce from "../../../hook/useDebouse";

const CartItem = ({ data, action, sale, status }) => {
  const cx = classNames.bind(style);
  const [quantity, setQuantity] = useState(Number(data.carts[0].quantity));
  const total = useRef(0);
  const formRef = useRef();
  const [change, setChange] = useState(1);
  const [rdata, setRdata] = useState("");
  let noaction = false;
  total.current = quantity * data.dishprice;
  let debouceValue = useDebounce(rdata, 1200);
  let changeDebounce = useDebounce(quantity, 500);
  let arr = [];
  const handleUpdate = (e) => {
    e.preventDefault();
  };

  if (sale.length !== 0) {
    sale.forEach((e) => {
      arr = [...arr, Number(e.DishID)];
    });
  }

  //update data cart
  useEffect(() => {
    let datasend = new FormData(formRef.current);
    datasend.append("_method", "PUT");
    cartURL
      .post(`/${data.carts[0].cartid}`, datasend, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        setChange((pre) => (pre += 1));
        action(change);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [debouceValue, changeDebounce]);

  const handleMinus = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity((pre) => (pre -= 1));
    }
  };

  const handleDelete = () => {
    cartURL
      .delete("/" + data.carts[0].cartid)
      .then((response) => {
        setChange((pre) => (pre += 1));
        action(change);
        status((pre) => !pre);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (quantity === 1) {
    noaction = true;
  }

  // render
  return (
    <div className={cx("wrapper")}>
      <form ref={formRef} onSubmit={handleUpdate} className={cx("form__item")}>
        <div className={cx("list-item--info")}>
          <img
            className={cx("list-item__img")}
            src={data.dishimages[0].imageurl}
            alt="error"
          />
          <div className={cx("list-item__name")}>
            <h4>{data.dishname}</h4>
            <input
              className={cx("list-item__id")}
              type="text"
              value={data.dishid}
              name="dishid"
              readOnly
            />
            <div onClick={handleDelete}>Delete</div>
          </div>
        </div>
        <div>
          <div className={cx("list-item--quantity")}>
            <MyButton icon>
              <FontAwesomeIcon
                className={cx("quantity__icon", { noaction })}
                icon={faCircleMinus}
                onClick={handleMinus}
              />
            </MyButton>
            <input
              type="number"
              name="quantity"
              readOnly
              value={quantity}
              min={1}
            />
            <MyButton icon>
              <FontAwesomeIcon
                className={cx("quantity__icon")}
                icon={faCirclePlus}
                onClick={() => setQuantity((quantity) => (quantity += 1))}
              />
            </MyButton>
            <h4>
              {arr.includes(Number(data.dishid)) ? (
                <span>
                  $
                  {parseFloat(
                    data.dishprice -
                      (data.dishprice *
                        Number(
                          sale[arr.indexOf(Number(data.dishid))].DiscountAmount
                        )) /
                        100
                  ).toFixed(2)}
                </span>
              ) : (
                <span> ${parseFloat(Number(data.dishprice)).toFixed(2)} </span>
              )}
            </h4>
          </div>

          <input
            className={cx("special__require")}
            type="text"
            value={rdata}
            onChange={(e) => setRdata(e.target.value)}
            name="require"
            placeholder="Special require"
          />
        </div>
      </form>
    </div>
  );
};

export default CartItem;
