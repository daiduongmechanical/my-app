import classNames from "classnames/bind";
import style from "./footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import {
  faFacebook,
  faFacebookSquare,
  faInstagram,
  faTiktok,
  faTwitter,
  faTwitterSquare,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const cx = classNames.bind(style);
  const { t } = useTranslation();

  return (
    <div className={cx("wrapper")}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.263717423857!2d106.6806392435228!3d10.791102662940732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4a7c59c09%3A0x8e2f7cbc924be1db!2zMzkxYSDEkC4gTmFtIEvhu7MgS2jhu59pIE5naMSpYSwgUGjGsOG7nW5nIDE0LCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1684815292754!5m2!1svi!2s"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
        className={cx("map")}
      />
      <div className={cx("contact")}>
        <h2>{t("footer.info")}</h2>
        <p>
          <b>{t("footer.address")} :</b> 391A Nam Kì Khởi Nghĩa
        </p>
        <p>
          <b>{t("footer.phone")}:</b> +84 961-063-996
        </p>
        <p>
          <b>{t("footer.email")} :</b> shopcake@gmail.com
        </p>
        <p>
          <FontAwesomeIcon className={cx("contact__icon")} icon={faFacebook} />
          <FontAwesomeIcon className={cx("contact__icon")} icon={faYoutube} />
          <FontAwesomeIcon className={cx("contact__icon")} icon={faTiktok} />
          <FontAwesomeIcon className={cx("contact__icon")} icon={faInstagram} />
          <FontAwesomeIcon className={cx("contact__icon")} icon={faTwitter} />
        </p>
      </div>
      <div className={cx("share")}>
        <h2>{t("footer.share")}</h2>
        <div className={cx("share__icon--cover")}>
          <FontAwesomeIcon
            className={cx("share__icon")}
            icon={faFacebookSquare}
          />
          <FontAwesomeIcon
            className={cx("share__icon")}
            icon={faTwitterSquare}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
