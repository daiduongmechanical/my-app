import classNames from "classnames/bind";
import style from "./cartpage.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartItem from "../pageComponents/cartItem";
import { useRef, useEffect, useState, useContext } from "react";
import MyButton from "../pageComponents/myButton";
import cartURL from "../../config/cartURL";
import orderURL from "../../config/orderURL";
import HidenNotice from "../pageComponents/noticeHidden";
import discountURL from "../../config/discountURL";
import { useParams, useLocation } from "react-router-dom";
import { AccountDetailContext } from "../../route";

const CartPage = () => {
  const cx = classNames.bind(style);
  const [listCart, setListCart] = useState([]);
  const [emptyCart, setEmptyCart] = useState(false);
  const [action, setAction] = useState(0);
  const [bill, setBill] = useState(0);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [delivery, setDelivery] = useState(true);
  const FormRef = useRef();
  const [sale, setSale] = useState([]);
  const { userID } = useParams();
  const location = useLocation();

  //get account detail context
  const getcontext = useContext(AccountDetailContext);
  let userAddress = getcontext[0].address;

  let deliveryCost = delivery ? 2 : 0;
  let calArr = [];
  // calculate total cost for bill
  useEffect(() => {
    listCart.forEach((e) => {
      let check = 0;
      sale.forEach((s) => {
        if (s.DishID === e.dishid) {
          calArr = [
            ...calArr,
            {
              quantity: e.carts[0].quantity,
              price:
                e.dishprice - (e.dishprice * Number(s.DiscountAmount)) / 100,
            },
          ];
          check++;
        }
      });
      if (check === 0) {
        calArr = [
          ...calArr,
          { quantity: e.carts[0].quantity, price: e.dishprice },
        ];
      }
    });

    let x = calArr.reduce((total, x) => total + x.quantity * x.price, 0);
    setBill(x);
  }, [listCart, action]);

  //get list cart
  useEffect(() => {
    cartURL
      .get(`/${userID}`)
      .then((response) => {
        console.log(response);
        if (response.data.length === 0) {
          setEmptyCart(true);
        }
        setListCart(response.data);
      })
      .catch(function (error) {
        setEmptyCart(true);
        console.log(error);
      });
  }, [action, show]);

  //get list sale
  useEffect(() => {
    discountURL
      .get("/")
      .then((response) => {
        if (response.data.length !== 0) {
          setSale(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAction = (data) => setAction((pre) => (pre += data));

  const handleOrder = (e) => {
    e.preventDefault();

    let data = new FormData(FormRef.current);
    data.append("userid", userID);
    data.append("totalCost", bill);

    if (bill === 0 || (bill === 2 && delivery)) {
      return;
    }

    orderURL
      .post("/", data)
      .then((response) => {
        if (response.data.length !== 0) {
          setShow(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // render
  return (
    <div className={cx("wrapper")}>
      {show && (
        <HidenNotice
          nt2={"your order was send"}
          bt1={"check your order"}
          l1="/profile/current-orders"
          l2={location.pathname}
        />
      )}
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
                  <CartItem sale={sale} action={handleAction} data={e} />
                </div>
              ))}
            </div>
          )}
        </Col>
        <Col sm={12} xs={12} md={4} lg={4}>
          <div className={cx("bill")}>
            <form ref={FormRef} onSubmit={handleOrder}>
              <h3>{listCart.length + " DISH "}</h3>

              <hr></hr>
              <div className={cx("bill__pay")}>
                <div className={cx("total__bill")}>
                  <span>Total bill</span>
                  <span>${parseFloat(bill).toFixed(2)}</span>
                </div>
                <div className={cx("total__bill")}>
                  <span>delivery</span>
                  <span>${parseFloat(deliveryCost).toFixed(2)}</span>
                </div>
                <div className={cx("total__bill")}>
                  <h5>Total pay</h5>
                  <h5>${parseFloat(bill + deliveryCost).toFixed(2)}</h5>
                </div>
              </div>
              <p className={cx("select__type")}>
                <input
                  required
                  type="radio"
                  value={"table"}
                  name={"type"}
                  onClick={() => setDelivery(false)}
                  defaultChecked
                />
                Using your address
              </p>
              <p className={cx("select__type")}>
                <input
                  required
                  type="radio"
                  value={"delivery"}
                  name={"type"}
                  onClick={() => setDelivery(true)}
                />
                Using another address
              </p>

              <div className={cx("more__infomation--cover")}>
                <div className={cx("more__infomation")}>
                  <p>Enter your day you place</p>
                  <input
                    name="detail"
                    type="text"
                    placeholder="Enter location delivery address"
                    required
                    value={delivery ? info : userAddress}
                    onChange={(e) => setInfo(e.target.value)}
                  />
                </div>
              </div>
              <MyButton full red disabled={info.trim() === ""}>
                <div className={cx("pay__btn")}>
                  <h5>Pay</h5>
                  <h5>${parseFloat(bill + 2).toFixed(2)}</h5>
                </div>
              </MyButton>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
