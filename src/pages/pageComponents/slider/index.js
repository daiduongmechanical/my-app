import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./forslick.css";

import classNames from "classnames/bind";
import style from "./sliderproduct.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ProductSlider = ({ data }) => {
  const cx = classNames.bind(style);

  let settings = {
    dots: true,
    customPaging: function (i) {
      return <div className="dot"></div>;
    },
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    arrows: false,
    className: "slides",
    nextArrow: <FontAwesomeIcon icon={faAngleRight} />,
    prevArrow: <FontAwesomeIcon icon={faAngleLeft} />,
  };

  return (
    <div className={cx("wrapper")}>
      <Slider {...settings}>
        {data.map((e, index) => (
          <div key={index} className={cx("item__cover")}>
            <img className={cx("item")} src={e} key={index} alt="error" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
