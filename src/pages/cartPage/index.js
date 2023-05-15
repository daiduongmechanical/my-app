import classNames from "classnames/bind";
import style from "./cartpage.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartItem from "../pageComponents/cartItem";
import { useRef, useEffect, useState, useContext, Fragment } from "react";
import MyButton from "../pageComponents/myButton";
import cartURL from "../../config/cartURL";
import orderURL from "../../config/orderURL";
import HidenNotice from "../pageComponents/noticeHidden";
import discountURL from "../../config/discountURL";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AccountDetailContext } from "../../route";
import axios from "axios";
import userURL from "../../config/userURL";

const CartPage = () => {
  const cx = classNames.bind(style);

  const location = useLocation();
  let history = useNavigate();
  let statusPayment = location.state;
  //get account detail context
  const getcontext = useContext(AccountDetailContext);
  let userAddress = getcontext[0];

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
  const addressRef = useRef("");

  let deliveryCost = delivery ? 2 : 0;
  let calArr = [];

  useEffect(() => {
    console.log(statusPayment);
    if (statusPayment === "ok") {
      setShow(true);
    }
  }, [statusPayment]);

  useEffect(() => {
    if (userAddress !== undefined) {
      setInfo(userAddress.address);
    }
  }, [delivery, userAddress]);
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

  // order pay when recieve

  const handleOrder = (e) => {
    let data = new FormData(FormRef.current);
    data.append("userid", userID);
    data.append("totalCost", bill);

    orderURL
      .post("/", data)
      .then((response) => {
        if (response.data.length !== 0) {
          setShow(true);
        }
      })
      .catch((error) => console.log(error));
  };

  //thanh toan bang vnpay
  const vnpayOrder = async (e) => {
    e.preventDefault();

    let data = new FormData(FormRef.current);
    data.append("userid", userID);
    data.append("totalCost", bill);

    axios
      .post("http://localhost:8000/api/vnpay-checkout", data)
      .then((response) => {
        window.location.replace(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  //after redirect vnpay order
  useEffect(() => {
    let dataOrder = new FormData(FormRef.current);
    let data = {};
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      data[pair[0]] = pair[1];
    }
    if (Object.keys(data).length > 1) {
      let addressUes = data.vnp_OrderInfo.replace(/\+/g, " ");
      dataOrder.append("userid", userID);
      dataOrder.append("totalCost", data.vnp_Amount);
      dataOrder.set("detail", addressUes);
      dataOrder.append("type", "delivery");

      orderURL
        .post("/", dataOrder)
        .then((response) => {
          if (response.data.length !== 0) {
            data["orderid"] = response.data.orderid;
            userURL
              .post("/bill/add", data)
              .then((response) => {
                console.log(response);
                if (response.status === 201) {
                  history(`/cart/${userID}`, { state: "ok" });
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  if (userAddress === undefined) {
    return;
  }

  // render
  return (
    <div className={cx("wrapper")}>
      {show && (
        <Fragment>
          {statusPayment === "ok" ? (
            <HidenNotice notify={true} nt1={"payment success"} time={1000} />
          ) : (
            <HidenNotice
              success
              nt2={"order successfully"}
              bt1={"check your order"}
              l1="/profile/current-orders"
              l2={location.pathname}
            />
          )}
        </Fragment>
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
            <form ref={FormRef}>
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
                  value={userAddress.manage === 0 ? "delivery" : "store"}
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
                  value={userAddress.manage === 0 ? "delivery" : "store"}
                  name={"type"}
                  onClick={() => setDelivery(true)}
                />
                Using another address
              </p>

              <div className={cx("more__infomation--cover")}>
                <div className={cx("more__infomation")}>
                  <p>Enter your address</p>
                  <input
                    type="text"
                    name="detail"
                    ref={addressRef}
                    value={delivery ? info : userAddress.address}
                    placeholder="Enter location delivery address"
                    required
                    onChange={(e) => setInfo(e.target.value)}
                  />
                </div>
              </div>
              <MyButton
                red
                full
                disabled={
                  addressRef.current.value === "" || listCart.length === 0
                }
              >
                <div className={cx("pay__btn")} onClick={handleOrder}>
                  <h5>Pay when recieve</h5>
                  <h5>${parseFloat(bill + 2).toFixed(2)}</h5>
                </div>
              </MyButton>
              <MyButton
                full
                disabled={
                  addressRef.current.value === "" || listCart.length === 0
                }
              >
                <div onClick={vnpayOrder} className={cx("pay__btn")}>
                  <h5>Pay with VNpay</h5>
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
