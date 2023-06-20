import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ShowList from "../pageComponents/showlist";
import userURL from "../../config/userURL";
import ProductSlider from "../pageComponents/slider";
import style from "./homePage.module.scss";
import dishURL from "../../config/dishURL";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const [newDishList, setNewDishList] = useState([]);
  const [rateList, setRateList] = useState([]);
  const { t } = useTranslation();
  const [banner, setBanner] = useState([]);

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

  useEffect(() => {
    userURL
      .get("/banner/all")
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setBanner(res.data);
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
        <ProductSlider data={banner} />
      </div>
      <ShowList header={t("home.newdishes")} data={newDishList} />
      <ShowList header={t("home.bestrate")} data={rateList} />
    </div>
  );
};
export default HomePage;
