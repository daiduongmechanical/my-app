import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ShowList from "../pageComponents/showlist";

import ProductSlider from "../pageComponents/slider";
import style from "./homePage.module.scss";
import dishURL from "../../config/dishURL";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [newDishList, setNewDishList] = useState([]);
  const [rateList, setRateList] = useState([]);
  let arr = [
    "https://as2.ftcdn.net/v2/jpg/03/77/46/33/1000_F_377463381_M6m89l4h2Ke8ImqNgZKYB1jcR3Tas4X4.jpg",
    "https://img.freepik.com/premium-photo/tiramisu-dessert-with-strawberries-banner-menu-recipe-place-text-top-view_114941-165.jpg",
    "https://www.loveandoliveoil.com/wp-content/uploads/2019/05/strawberry-cake-roll-FEAT-1200x799.jpg",
    "https://windsorbakery.in/wp-content/themes/windsorbakery/assets/img/banner-pic2.jpg",
    "https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-10.JPG",
  ];

  const cx = classNames.bind(style);
  //get rate list

  useEffect(() => {
    dishURL
      .get("/bestrate-list")
      .then((response) => {
        console.log(response);
        if (response.statusText === "OK") {
          setRateList(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //get list new dish
  useEffect(() => {
    dishURL
      .get("/newdish-list")
      .then((response) => {
        if (response.statusText === "OK") {
          setNewDishList(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("slide__cover")}>
        <ProductSlider data={arr} />
      </div>
      <ShowList header="new dishes" data={newDishList} />
      <ShowList header="Best rate dishes" data={rateList} />
    </div>
  );
};
export default HomePage;
