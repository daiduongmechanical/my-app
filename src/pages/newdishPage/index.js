import classNames from "classnames/bind";
import style from "./newdish.module.scss";
import InputField from "../pageComponents/inputField";
import { useRef, useState, Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormData from "form-data";
import MyButton from "../pageComponents/myButton";
import adminURL from "../../config/adminURL";
import { Cookies } from "react-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const NewdishPage = () => {
  const cx = classNames.bind(style);
  const [load, setLoad] = useState("");
  const formRef = useRef();
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(0);
  const [inputBox, setInputBox] = useState([1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    adminURL
      .postForm("/add-dish", data, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        if (response.statusText === "Created") {
          setShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const moveUp = () => {
    if (position === load.length - 1) {
      return;
    } else {
      setPosition((pre) => pre + 1);
    }
  };

  const moveDown = () => {
    if (position === 0) {
      return;
    } else {
      setPosition((pre) => pre - 1);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h4>Add new dish to menu</h4>
      </div>

      {show && (
        <div className={cx("hidden__notice")}>
          <p className={cx("hidden__notice--text")}>Add sucessfelly</p>
          <MyButton full golden to={"/admin/manager-menu/newdish"}>
            Add more
          </MyButton>
          <MyButton full golden to={"/admin/manager-menu"}>
            Go to management page
          </MyButton>
        </div>
      )}

      <form className={cx("form")} encType="multipart/form-data" ref={formRef}>
        <Row sm={1} xs={1} md={3} lg={3}>
          <Col sm={12} xs={12} md={4} lg={4}>
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
              ></textarea>
            </div>
          </Col>
          <Col sm={12} xs={12} md={4} lg={4}>
            <div className={cx("form__material")}>
              {inputBox.map((e, index) => (
                <div key={index} className={cx("form__material--cover")}>
                  <div className={cx("material__cover--big")}>
                    <InputField
                      content="enter material"
                      name="materialname[]"
                      type="text"
                    />
                  </div>
                  <div className={cx("material__cover--small")}>
                    <InputField
                      content="mass"
                      name="materialmass[]"
                      type="number"
                    />
                  </div>
                </div>
              ))}

              <span onClick={() => setInputBox((pre) => [...pre, 1])}>
                <FontAwesomeIcon
                  className={cx("material__icon")}
                  icon={faPlusCircle}
                />{" "}
                Add more
              </span>
            </div>
          </Col>
          <Col sm={12} xs={12} md={4} lg={4}>
            <div className={cx("form__img")}>
              <div className={cx("img__cover")}>
                <div className={cx("img__cover--hide")}>
                  {load === "" ? (
                    <p> Chose or drag image of dish in here</p>
                  ) : (
                    <div className={cx("img__cover--btn")}>
                      <FontAwesomeIcon
                        className={cx("img__btn")}
                        icon={faChevronLeft}
                        onClick={moveDown}
                      />
                      <div className={cx("img__group")}>
                        <span>{`${position + 1} of ${load.length}`}</span>
                        <img
                          src={URL.createObjectURL(load[position])}
                          alt="error"
                        />
                      </div>
                      <FontAwesomeIcon
                        className={cx("img__btn")}
                        icon={faChevronRight}
                        onClick={moveUp}
                      />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setLoad(e.target.files)}
                  name="dishimg[]"
                  className={cx("input__img")}
                />
              </div>
              <div className={cx("btn__cover")}>
                <MyButton>
                  <span onClick={handleSubmit}>Add new dish</span>
                </MyButton>
              </div>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default NewdishPage;
