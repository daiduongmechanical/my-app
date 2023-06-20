import classNames from "classnames/bind";
import style from "./aboutus.module.scss";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
  const cx = classNames.bind(style);
  const { t } = useTranslation();
  let x =
    "https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/h3-img-1.jpg";
  return (
    <div className={cx("wrapper")}>
      {/* story */}
      <div className={cx("story")}>
        <div className={cx("story__text")}>
          <h1>{t("about.story")}</h1>
          <p>{t("about.storydetails")}</p>
        </div>
        <img src={x} alt="error" />
      </div>
      {/* list */}
      <div className={cx("story")}>
        <img
          src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/p1-img-7.jpg"
          alt="error"
        />
        <div className={cx("story__text--list")}>
          <h1>{t("about.menu")}</h1>
          <p>
            <p>Tiramisu</p>
            <hr />
            <p>Cup cake </p>
            <hr />
            <p>Roll Cake</p>
            <hr />
            <p>Donough</p>
            <hr />
          </p>
        </div>
      </div>

      {/* product */}

      <div className={cx("story")}>
        <div className={cx("story__text")}>
          <h1>{t("about.product")}</h1>
          <p>{t("about.productdetail")}</p>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6wgL2DQ3JacFtRt3PfSO70gQ1JJdKX1IToQ&usqp=CAU"
          alt="error"
        />
      </div>

      <div className={cx("middle")}>
        <div className={cx("story__text")}>
          <h1>{t("about.ingredients")}</h1>
          <p>{t("about.ingredientsource")}</p>
        </div>
        <img
          src="https://food.unl.edu/newsletters/images/basic-ingredients-for-baking.png"
          alt="error"
        />

        <div className={cx("story__text")}>
          <h1>{t("about.ingredients")}</h1>
          <p>{t("about.save")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
