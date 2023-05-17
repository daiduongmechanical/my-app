import classNames from "classnames/bind";
import style from "./detaildish.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyButton from "../pageComponents/myButton";
import cartURL from "../../config/cartURL";
import {
  AccountDetailContext,
  StatusLoginContext,
  CartContext,
} from "../../route";
import rateURL from "../../config/rateURL";
import HidenNotice from "../pageComponents/noticeHidden";
import "./slick.css";
import { Rating } from "react-simple-star-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import "tippy.js/dist/tippy.css"; // optional
import { useState, useEffect, useContext, useRef, Fragment } from "react";
import dishURL from "../../config/dishURL";
import discountURL from "../../config/discountURL";
import { useParams, useLocation } from "react-router-dom";
import Slider from "react-slick";
import ShowInfo from "../pageComponents/showInfo/ShowInfo";
import Comment from "../pageComponents/comment";

const DetailDishPage = () => {
  const cx = classNames.bind(style);
  const [hidden, setHidden] = useState(false);
  const [loginNotice, setLoginNotice] = useState(false);
  const [comment, setComment] = useState([]);
  const [data, setData] = useState([]);
  const [sale, setSale] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { dishID } = useParams();
  const [showDescription, setShowDescription] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const formRef = useRef();
  const location = useLocation();

  //get status login context
  const getStatusLoginContext = useContext(StatusLoginContext);
  let statusLogin = getStatusLoginContext[0];

  //get account details context
  const getAccountDetailContext = useContext(AccountDetailContext);
  const accountDetail = getAccountDetailContext[0];
  const reviewRef = useRef("");

  //get cart context
  const getCartContext = useContext(CartContext);
  const updateStatusCart = getCartContext[1];

  const renderPaging = (i) => (
    <div>
      <img src={data.dishimages[i].imageurl} alt={`image-${i}`} />
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

  const handleMinus = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity((pre) => (pre -= 1));
    }
  };

  // get detail dish
  useEffect(() => {
    dishURL
      .get(`/${dishID}?dish=true`)
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
      .get(`/${dishID}?dish=true`)
      .then((response) => {
        console.log(response);
        setComment(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

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
          if (response.statusText === "Created") {
            setHidden(true);
            updateStatusCart((pre) => !pre);
          }
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
  if (data.length === 0) {
    return <div className={cx("wrapper")}></div>;
  }

  const showReviews = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
    setShowComment(true);
  };

  const calAverageRate = () => {
    if (comment.length === 0) {
      return 0;
    } else {
      let total = comment.reduce((x, obj) => x + Number(obj.mark), 0);
      return total / comment.length;
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidemap")}>
        {/* <p>
          {path.map((e) => (
            <Link></Link>
          ))}
        </p> */}
      </div>
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
      <Row sm={1} xs={2} md={2} lg={2}>
        <Col sm={12} xs={6} md={6} lg={6}>
          <div className={cx("dish__cover")}>
            <div className={cx("slider__cover")}>
              <Slider {...settings}>
                {data.dishimages.map((e, index) => (
                  <div key={index}>
                    <img className="slick__main--image" src={e.imageurl} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </Col>
        <Col sm={12} xs={6} md={6} lg={6}>
          <div className={cx("action")}>
            {/* <h3 className={cx("action__name")}>
              {sale.length !== 0 && (
                <span className={cx("discount__info")}>
                  <span className={cx("discount__info--name")}>
                    {sale[0].DiscountName}
                  </span>
                  <span>sale {Number(sale[0].DiscountAmount)}%</span>
                </span>
              )}
            </h3> */}
            <form className={cx("action__form")} ref={formRef}>
              <h1 className={cx("action__name")}>{`${
                data.length === 0 ? "" : data.dishname
              }`}</h1>
              <span className={cx("action__price")}>
                $
                {sale.length === 0
                  ? parseFloat(
                      data.length === 0 ? "" : Number(data.dishprice)
                    ).toFixed(2)
                  : parseFloat(
                      Number(data[0].dishprice) -
                        Number(data[0].dishprice) *
                          Number(sale[0].DiscountAmount / 100)
                    ).toFixed(2)}
              </span>
              <div onClick={showReviews} className={cx("action__rating")}>
                <Rating
                  allowFraction={true}
                  size={20}
                  initialValue={calAverageRate()}
                  readonly={true}
                  allowHover={false}
                />
                <h5>{`${comment.length} reviews`}</h5>
              </div>

              <div className={cx("action--quantity")}>
                <div className={cx("action--quantity__main")}>
                  <FontAwesomeIcon
                    className={cx("quantity__icon")}
                    icon={faMinus}
                    onClick={handleMinus}
                  />
                  <input
                    type="number"
                    name="quantity"
                    readOnly
                    value={quantity}
                    min={1}
                  />

                  <FontAwesomeIcon
                    className={cx("quantity__icon")}
                    icon={faPlus}
                    onClick={() => setQuantity((quantity) => (quantity += 1))}
                  />
                </div>
                <MyButton action={handleAdd} red>
                  Add to cart
                </MyButton>
              </div>
            </form>
            <div className={cx("description")}>
              <span>description</span>
              <FontAwesomeIcon
                className={cx("description__icon")}
                onClick={() => setShowDescription((pre) => !pre)}
                icon={showDescription ? faMinus : faPlus}
              />
            </div>
            <ShowInfo show={showDescription}>
              <span className={cx("description__text")}>
                {data.description}
                <h3>What’s Included</h3>

                <ul>
                  <li>25-30cm Strawberry donut cake with rainbow sprinkles</li>
                  <li>Filled with musk sticks and sour straps</li>
                </ul>
              </span>
            </ShowInfo>
            <div ref={reviewRef} className={cx("description")}>
              <span>Reviews</span>
              <FontAwesomeIcon
                className={cx("description__icon")}
                onClick={() => setShowComment((pre) => !pre)}
                icon={faPlus}
              />
            </div>
            <ShowInfo show={showComment}>
              <div className={cx("comment__text")}>
                <Comment data={comment}></Comment>
              </div>
            </ShowInfo>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailDishPage;
