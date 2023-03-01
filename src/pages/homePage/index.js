import classNames from "classnames/bind";
import ShowList from "../pageComponents/showlist";

import ProductSlider from "../pageComponents/slider";
import style from "./homePage.module.scss";

const HomePage = () => {
  let arr = [
    "https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-10.JPG",
    "https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-10.JPG",
    "https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-10.JPG",
    "https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-10.JPG",
    "https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-10.JPG",
  ];

  let arr2 = [
    "https://www.restaurantware.com/media/wysiwyg/Top_10_Most_Luxurious_Foods_wagyu_-_Full_Width_1_2.png",
    "https://ideas.time.com/wp-content/uploads/sites/5/2012/08/146282871.jpg?w=720&h=480&crop=1",
    "https://www.immobilisantandrea.it/media2/news/IT/ristoranti_piu_costosi_al_mondo_cibi.jpg",
  ];
  const cx = classNames.bind(style);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("slide__cover")}>
        <ProductSlider data={arr} />
      </div>
      <ShowList header="new dishes" data={arr2} />
      <ShowList header="suggest for you" data={arr2} />
    </div>
  );
};
export default HomePage;
