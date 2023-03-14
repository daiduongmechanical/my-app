import style from "./cartitem.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import MyButton from "../myButton";
import cartURL from "../../../config/cartURL";

const CartItem = ({ data, action }) => {
  const cx = classNames.bind(style);
  const [quantity, setQuantity] = useState(Number(data.quantity));
  const total = useRef(0);
  const formRef = useRef();
  const [change, setChange] = useState(1);
  let noaction = false;
  total.current = quantity * data.dishprice;

  const handleUpdate = (e) => {
    e.preventDefault();

    let datasend = new FormData(formRef.current);
    datasend.append("_method", "PUT");

    cartURL
      .post("/" + data.id, datasend, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        setChange((pre) => (pre += 1));
        action(change);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleMinus = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity((pre) => (pre -= 1));
    }
  };

  const handleDelete = () => {
    cartURL
      .delete("/" + data.id)
      .then((response) => {
        setChange((pre) => (pre += 1));
        action(change);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (quantity === 1) {
    noaction = true;
  }
  return (
    <div className={cx("wrapper")}>
      <form ref={formRef} onSubmit={handleUpdate} className={cx("form__item")}>
        <div className={cx("list-item--info")}>
          <img
            className={cx("list-item__img")}
            src={data.dishimage}
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
          <h4>${parseFloat(total.current).toFixed(2)}</h4>
        </div>
      </form>
    </div>
  );
};

export default CartItem;
