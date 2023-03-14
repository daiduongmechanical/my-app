import classNames from "classnames/bind";
import style from "./detaildish.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyButton from "../pageComponents/myButton";
import cartURL from "../../config/cartURL";
import { DishContext } from "../../route";
import { AccountDetailContext, StatusLoginContext } from "../../route";

import "tippy.js/dist/tippy.css"; // optional
import { useState, useEffect, useContext, useRef, Fragment } from "react";
import Comment from "../pageComponents/comment";
import dishURL from "../../config/dishURL";

const DetailDishPage = () => {
  const cx = classNames.bind(style);
  const [info, setInfo] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [loginNotice, setLoginNotice] = useState(false);

  //get dish context
  const getDishContext = useContext(DishContext);
  let handleContext = getDishContext[1];
  let dishDetail = getDishContext[0];

  //get status login context
  const getStatusLoginContext = useContext(StatusLoginContext);
  let statusLogin = getStatusLoginContext[0];

  //get account details context
  const getAccountDetailContext = useContext(AccountDetailContext);
  const accountDetail = getAccountDetailContext[0];

  let arr = [1, 2, 3, 4];
  const formRef = useRef();
  let currentDish = JSON.parse(window.localStorage.getItem("dishid"));

  useEffect(() => {
    dishURL
      .get("/" + currentDish)
      .then((response) => {
        handleContext(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(accountDetail.id);
    if (statusLogin) {
      let datasend = new FormData(formRef.current);
      datasend.append("userid", accountDetail.id);
      datasend.append("dishid", dishDetail.dishid);

      await cartURL
        .post("/", datasend, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          setHidden(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setLoginNotice(true);
      setHidden(true);
      let showtime = setInterval(() => {
        setHidden(false);
        setLoginNotice(false);
        clearInterval(showtime);
      }, 2000);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {hidden && (
        <div className={cx("hidden__notice")}>
          {loginNotice ? (
            <h4>You need login to continue add this dish to your cart</h4>
          ) : (
            <Fragment>
              <p className={cx("hidden__notice--text")}>
                This dish is added to cart
              </p>
              <MyButton full golden to={"/menu"}>
                Back to menu
              </MyButton>
              <MyButton full golden to={"/cart"}>
                Go to cart
              </MyButton>
            </Fragment>
          )}
        </div>
      )}
      <Row sm={1} xs={1} md={2} lg={2}>
        <Col lg={5}>
          <div className={cx("dish__cover")}>
            <img
              className={cx("dish")}
              src={dishDetail.dishimage}
              alt="error"
            />

            <div className={cx("action")}>
              <h3 className={cx("action__name")}>{dishDetail.dishname}</h3>
              <h5 className={cx("action__price")}>
                Price : ${parseFloat(dishDetail.dishprice).toFixed(2)}
              </h5>

              <form className={cx("action__form")} ref={formRef}>
                <div className={cx("action__input")}>
                  <h5>Number : </h5>
                  <input type="number" name="quantity" />
                </div>
                <div className={cx("action__cart")}>
                  <MyButton action={handleAdd} golden>
                    Add to cart
                  </MyButton>
                  <MyButton golden>Add to your favorite</MyButton>
                </div>
              </form>
            </div>
          </div>
        </Col>
        <Col lg={7}>
          <div className={cx("infomation")}>
            <div className={cx("header")}>
              <div
                onClick={() => setInfo(true)}
                className={cx("header__item", { active: info })}
              >
                <span> Descriptiion</span>
              </div>
              <div
                onClick={() => setInfo(false)}
                className={cx("header__item", { active: !info })}
              >
                <span> Comment</span>
              </div>
            </div>
            <div className={cx("infomation__show")}>
              {info ? (
                <p className={cx("description")}>{dishDetail.description}</p>
              ) : (
                <Comment data={arr} />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailDishPage;
