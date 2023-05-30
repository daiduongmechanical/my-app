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
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AccountDetailContext, CartContext } from "../../route";
import axios from "axios";
import userURL from "../../config/userURL";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const cx = classNames.bind(style);

  const location = useLocation();
  let history = useNavigate();
  let statusPayment = location.state;
  //get account detail context
  const getcontext = useContext(AccountDetailContext);
  let userAddress = getcontext[0];

  //get cart context
  const getCartContext = useContext(CartContext);
  const updateCart = getCartContext[1];

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
  const { t } = useTranslation();

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
    let total = listCart.reduce(
      (cur, e) =>
        cur +
        (e.discount
          ? (e.dish.dishprice -
              (e.dish.dishprice * e.discountdata.discountamount) / 100) *
            e.quantity
          : e.dish.dishprice * e.quantity),
      0
    );
    setBill(total);
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

  const handleAction = (data) => setAction((pre) => (pre += data));

  // order pay when recieve

  const handleOrder = (e) => {
    e.preventDefault();
    let data = new FormData(FormRef.current);
    if (userAddress.manage === 0) {
      data.append("userid", userID);
      data.append("totalCost", bill + 2);
    } else {
      data.append("userid", userID);
      data.append("totalCost", bill);
      data.append("detail", "in store");
      data.append("type", "store");
      data.append("status", "finished");
    }

    orderURL
      .post("/", data)
      .then((response) => {
        if (response.data.length !== 0) {
          setShow(true);
          updateCart((pre) => !pre);
        }
      })
      .catch((error) => console.log(error));
  };

  //thanh toan bang vnpay
  const vnpayOrder = async (e) => {
    e.preventDefault();

    let data = new FormData(FormRef.current);
    data.append("userid", userID);
    data.append("totalCost", bill + 2);

    axios
      .post("http://localhost:8000/api/vnpay-checkout", data)
      .then((response) => {
        window.location.replace(
          response.data.data,
          "_blank",
          "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
        );
        window.location.open(response.data.data);
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
      dataOrder.append("totalCost", data.vnp_Amount / 23000 / 100);
      dataOrder.set("detail", addressUes);
      dataOrder.append("type", "delivery");

      orderURL
        .post("/", dataOrder)
        .then((response) => {
          if (response.data.length !== 0) {
            data["orderid"] = response.data.orderid;
            updateCart((pre) => !pre);
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
            <HidenNotice notify={true} nt1={t("cart.success")} time={1000} />
          ) : (
            <HidenNotice
              success
              nt2={t("cart.order")}
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
                  <CartItem
                    status={updateCart}
                    sale={sale}
                    action={handleAction}
                    data={e}
                  />
                </div>
              ))}
            </div>
          )}
        </Col>
        <Col sm={12} xs={12} md={4} lg={4}>
          <div className={cx("bill")}>
            <form ref={FormRef}>
              <h3>{`${listCart.length} ${t("cart.dish")} `}</h3>

              <hr></hr>
              <div className={cx("bill__pay")}>
                <div className={cx("total__bill")}>
                  <span>{t("cart.totalbill")}</span>
                  <span>${parseFloat(bill).toFixed(2)}</span>
                </div>

                {userAddress.manage === 0 && (
                  <div className={cx("total__bill")}>
                    <span>{t("cart.delivery")}</span>
                    <span>${parseFloat(2).toFixed(2)}</span>
                  </div>
                )}

                <div className={cx("total__bill")}>
                  <h5>{t("cart.totalpay")}</h5>
                  <h5>
                    $
                    {parseFloat(
                      userAddress.manage === 0 ? bill + 2 : bill
                    ).toFixed(2)}
                  </h5>
                </div>
              </div>

              {userAddress.manage === 0 && (
                <Fragment>
                  <p className={cx("select__type")}>
                    <input
                      required
                      type="radio"
                      value={userAddress.manage === 0 ? "delivery" : "store"}
                      name={"type"}
                      onClick={() => setDelivery(false)}
                      defaultChecked
                    />
                    {t("cart.youraddress")}
                  </p>
                  <p className={cx("select__type")}>
                    <input
                      required
                      type="radio"
                      name={"type"}
                      onClick={() => {
                        setDelivery(true);
                        setInfo("");
                      }}
                    />
                    {t("cart.otheraddress")}
                  </p>
                  <div className={cx("more__infomation--cover")}>
                    <div className={cx("more__infomation")}>
                      <p>
                        <b>{t("cart.enteraddress")}</b>
                      </p>
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
                </Fragment>
              )}
              <MyButton
                red
                full
                disabled={
                  addressRef.current.value === "" || listCart.length === 0
                }
              >
                <div className={cx("pay__btn")} onClick={handleOrder}>
                  <h5>{t("cart.recieve")}</h5>
                  <h5>
                    $
                    {parseFloat(
                      userAddress.manage === 0 ? bill + 2 : bill
                    ).toFixed(2)}
                  </h5>
                </div>
              </MyButton>
              {userAddress.manage === 0 && (
                <MyButton
                  full
                  disabled={
                    addressRef.current.value === "" || listCart.length === 0
                  }
                >
                  <div onClick={vnpayOrder} className={cx("pay__btn")}>
                    <h5>{t("cart.vnpay")}</h5>
                    <h5>
                      $
                      {parseFloat(
                        userAddress.manage === 0 ? bill + 2 : bill
                      ).toFixed(2)}
                    </h5>
                  </div>
                </MyButton>
              )}
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
