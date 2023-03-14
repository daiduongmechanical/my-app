import classNames from "classnames/bind";
import style from "./cartpage.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartItem from "../pageComponents/cartItem";
import { useRef, useEffect, useState, useContext } from "react";
import MyButton from "../pageComponents/myButton";
import cartURL from "../../config/cartURL";
import { AccountDetailContext } from "../../route";

const CartPage = () => {
  const cx = classNames.bind(style);
  const [listCart, setListCart] = useState([]);
  const [emptyCart, setEmptyCart] = useState(false);
  const [action, setAction] = useState(0);
  const [bill, setBill] = useState(0);

  let delivery = 2;
  //get accounts details context
  const getAccountDetailContext = useContext(AccountDetailContext);
  const accountDetail = getAccountDetailContext[0];

  useEffect(() => {
    let x = listCart.reduce((total, x) => total + x.quantity * x.dishprice, 0);
    setBill(x);
  }, [listCart, action]);

  console.log(accountDetail);

  useEffect(() => {
    if (accountDetail === undefined) {
      return;
    }
    cartURL
      .get(`/${accountDetail.id}`)
      .then((response) => {
        console.log(response);
        if (response.data.length === 0) {
          setEmptyCart(true);
          delivery = 0;
        }
        setListCart(response.data);
      })
      .catch(function (error) {
        setEmptyCart(true);
        console.log(error);
      });
  }, [action, accountDetail]);

  const handleAction = (data) => setAction((pre) => (pre += data));

  return (
    <div className={cx("wrapper")}>
      <Row sm={1} xs={1} md={2} lg={2}>
        <Col sm={12} xs={12} md={8} lg={8}>
          {emptyCart ? (
            <div className={cx("empty__cart")}>
              <img
                src="https://www.99fashionbrands.com/wp-content/uploads/2020/12/empty_cart.png"
                alt="error"
              />
            </div>
          ) : (
            <div className={cx("list")}>
              {listCart.map((e) => (
                <div key={e.dishid}>
                  <CartItem action={handleAction} data={e}></CartItem>
                </div>
              ))}
            </div>
          )}
        </Col>
        <Col sm={12} xs={12} md={4} lg={4}>
          <div className={cx("bill")}>
            <h3>{listCart.length + " DISH "}</h3>
            <hr></hr>
            <h5>You have vouchers ?</h5>
            <form className={cx("voucher__form")}>
              <input
                type="text"
                placeholder="Enter your voucher "
                className={cx("bill__voucher")}
              />
              <MyButton goldenfit>USE</MyButton>
            </form>
            <hr></hr>
            <div className={cx("bill__pay")}>
              <div className={cx("total__bill")}>
                <span>Total bill</span>
                <span>${parseFloat(bill).toFixed(2)}</span>
              </div>
              <div className={cx("total__bill")}>
                <span>delivery</span>
                <span>${parseFloat(delivery).toFixed(2)}</span>
              </div>
              <div className={cx("total__bill")}>
                <h5>Total pay</h5>
                <h5>${parseFloat(bill + 2).toFixed(2)}</h5>
              </div>
            </div>
            <MyButton full red>
              <div className={cx("pay__btn")}>
                <h5>Pay</h5>
                <h5>${parseFloat(bill + 2).toFixed(2)}</h5>
              </div>
            </MyButton>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
