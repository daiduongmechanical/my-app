import classNames from "classnames/bind";
import style from "./menu.module.scss";

import Slider from "react-slick";

const MenuPage = () => {
  const cx = classNames.bind(style);

  let arr = [
    "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/3.jpg",
    "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/4.jpg",
    "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/5.jpg",
    "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/6.jpg",
    "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/8.jpg",
  ];

  const settings = {
    customPaging: function (i) {
      return (
        <a href="/">
          <div className="dot"></div>
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={cx("wrapper")}>
      <h2>Custom Paging</h2>
      <Slider {...settings}>
        {arr.map((e, index) => (
          <div key={index}>
            <img src={e} alt="error" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MenuPage;
