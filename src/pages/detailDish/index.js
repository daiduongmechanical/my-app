import classNames from "classnames/bind";
import style from "./detaildish.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyButton from "../pageComponents/myButton";
import cartURL from "../../config/cartURL";
import { AccountDetailContext, StatusLoginContext } from "../../route";
import rateURL from "../../config/rateURL";
import HidenNotice from "../pageComponents/noticeHidden";
import "./slick.css";

import "tippy.js/dist/tippy.css"; // optional
import { useState, useEffect, useContext, useRef, Fragment } from "react";
import Comment from "../pageComponents/comment";
import dishURL from "../../config/dishURL";
import discountURL from "../../config/discountURL";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const DetailDishPage = () => {
  const cx = classNames.bind(style);
  const [info, setInfo] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [loginNotice, setLoginNotice] = useState(false);
  const [number, setNumber] = useState(1);
  const [comment, setComment] = useState([]);
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [sale, setSale] = useState([]);
  const { dishID } = useParams();
  const formRef = useRef();

  //get status login context
  const getStatusLoginContext = useContext(StatusLoginContext);
  let statusLogin = getStatusLoginContext[0];

  //get account details context
  const getAccountDetailContext = useContext(AccountDetailContext);
  const accountDetail = getAccountDetailContext[0];

  const renderPaging = (i) => (
    <div>
      <img src={data[i].imageURL} alt={`image-${i}`} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    appendDots: (dots) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: (i) => renderPaging(i),
  };

  // get detail dish
  useEffect(() => {
    dishURL
      .get("/" + dishID)
      .then((response) => {
        if (response.data.length !== 0) {
          setData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //get sale data
  useEffect(() => {
    discountURL
      .get(`/${dishID}`)
      .then((response) => {
        if (response.data.length !== 0) {
          setSale(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //get comment list
  useEffect(() => {
    rateURL
      .get(`/${dishID}`)
      .then((response) => {
        setComment(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [list]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (statusLogin) {
      let datasend = new FormData(formRef.current);
      datasend.append("userid", accountDetail.id);
      datasend.append("dishid", dishID);
      if (sale.length === 0) {
        datasend.append("discount", 0);
      } else {
        datasend.append("discount", Number(sale[0].DiscountID));
      }

      cartURL
        .post("/", datasend, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          setHidden(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setLoginNotice(true);
      setHidden(true);
    }
  };

  const resetNotice = (x) => {
    setHidden(x);
  };

  return (
    <div className={cx("wrapper")}>
      {hidden && (
        <Fragment>
          {loginNotice ? (
            <HidenNotice
              nt1="you need to sign in to add dish to your cart"
              time={3000}
              notify
              reset={resetNotice}
            />
          ) : (
            <HidenNotice
              nt2={"dish is added successfully"}
              bt1="Back To Menu"
              l1="/menu"
            />
          )}
        </Fragment>
      )}
      <Row sm={1} xs={1} md={2} lg={2}>
        <Col lg={5}>
          <div className={cx("dish__cover")}>
            <div className={cx("slider__cover")}>
              <Slider {...settings}>
                {data.map((e, index) => (
                  <div key={index}>
                    <img className="slick__main--image" src={e.imageURL} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className={cx("action")}>
              <h3 className={cx("action__name")}>
                <span> {list.dishname}</span>
                {sale.length !== 0 && (
                  <span className={cx("discount__info")}>
                    <span className={cx("discount__info--name")}>
                      {sale[0].DiscountName}
                    </span>
                    <span>sale {Number(sale[0].DiscountAmount)}%</span>
                  </span>
                )}
              </h3>
              <form className={cx("action__form")} ref={formRef}>
                <h5 className={cx("action__name")}>{`${
                  data.length === 0 ? "" : data[0].dishname
                }`}</h5>
                <h5 className={cx("action__price")}>
                  $
                  {sale.length === 0
                    ? parseFloat(
                        data.length === 0 ? "" : Number(data[0].dishprice)
                      ).toFixed(2)
                    : parseFloat(
                        Number(data[0].dishprice) -
                          Number(data[0].dishprice) *
                            Number(sale[0].DiscountAmount / 100)
                      ).toFixed(2)}
                </h5>

                <div className={cx("action__input")}>
                  <h5>Number : </h5>
                  <input
                    type="number"
                    name="quantity"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
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
                <p className={cx("description")}>
                  {data.length === 0 ? "" : data[0].description}
                </p>
              ) : (
                <Comment data={comment} />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailDishPage;
