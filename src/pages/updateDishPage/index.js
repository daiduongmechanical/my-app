import classNames from "classnames/bind";
import style from "./newdish.module.scss";
import InputField from "../pageComponents/inputField";
import { useContext, useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormData from "form-data";
import MyButton from "../pageComponents/myButton";
import adminURL from "../../config/adminURL";
import { Cookies } from "react-cookie";

import dishURL from "../../config/dishURL";

const UpdateDishPage = () => {
  const cx = classNames.bind(style);
  const [load, setLoad] = useState();
  const formRef = useRef();
  const imgRef = useRef();
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const [textArea, setTextArea] = useState("");

  const handleImage = (e) => {
    let file = e.target.files[0];
    setLoad(URL.createObjectURL(file));
  };

  return (
    <div className={cx("wrapper")}>
      <h4>Update dish </h4>

      {show && (
        <div className={cx("hidden__modal")}>
          <p className={cx("hidden__notice--text")}>Updated sucessfelly</p>
          <MyButton full golden to={"/menu"}>
            Go to menu
          </MyButton>
          <MyButton full golden to={"/admin/manager-menu"}>
            Go to management page
          </MyButton>
        </div>
      )}

      <Row sm={1} xs={1} md={2} lg={2}>
        <Col sm={12} xs={12} md={5} lg={5}>
          <div className={cx("img__cover")}>
            <div className={cx("img__cover--hide")}>
              {load === "" ? (
                <p> Chose or drag image of dish in here</p>
              ) : (
                <img src={load} alt="error" />
              )}
            </div>
            <input
              type="file"
              ref={imgRef}
              onChange={handleImage}
              name="dishimg"
              className={cx("input__img")}
            />
          </div>
          <div className={cx("btn__cover")}></div>
        </Col>

        <Col sm={12} xs={12} md={7} lg={7}>
          <form
            className={cx("form")}
            encType="multipart/form-data"
            ref={formRef}
          >
            <div className={cx("form__info")}>
              <InputField
                content="Enter name of dish"
                name="dishname"
                required
                type="text"
              />
              <InputField
                content="Enter price of dish"
                name="dishprice"
                required
                type="number"
              />
              <InputField
                content="Enter type of dish"
                name="dishtype"
                required
                type="text"
              />
              <textarea
                className={cx("form_textarea")}
                placeholder="Enter description of this dish"
                name="description"
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
              ></textarea>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateDishPage;
