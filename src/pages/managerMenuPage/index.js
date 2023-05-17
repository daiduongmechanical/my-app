import classNames from "classnames/bind";
import style from "./managermenupage.module.scss";
import { useState, useEffect, useContext, Fragment, useRef } from "react";
import dishURL from "../../config/dishURL";
import adminURL from "../../config/adminURL";
import { Cookies } from "react-cookie";
import MyButton from "../pageComponents/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import {
  faCirclePlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import InputField from "../pageComponents/inputField";
import { useLocation } from "react-router-dom";
import discountURL from "../../config/discountURL";
import HidenNotice from "../pageComponents/noticeHidden";

const ManagerMenuPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [notice, setNotice] = useState(false);
  const [detailDiscount, setDetailDiscount] = useState([]);

  const [selected, setSelected] = useState([]);
  let mapRef = document.getElementsByClassName("select__box");
  const formRef = useRef();
  const selectRef = useRef();
  let location = useLocation();
  let checkLocation = "/admin/manager-discount/new-discount";
  const { discountID } = useParams();
  if (discountID) {
    checkLocation = `/admin/manager-discount/update/${discountID}`;
  }

  const [sale, setSale] = useState(
    checkLocation === location.pathname ? true : false
  );

  const cookies = new Cookies();

  const compare = (x) => {
    list.forEach((e) => {
      if (e.type === x) {
        setSelected([]);
        setSelected((pre) => [...pre, e.dishid]);
      }
    });
    for (let i = 0; i < mapRef.length; i++) {
      mapRef[i].checked = false;

      if (mapRef[i].getAttribute("dishtype") === x) {
        mapRef[i].checked = true;
      }
    }
  };

  //get list dishes
  useEffect(() => {
    dishURL
      .get("/")
      .then((response) => {
        let recive = response.data;
        const groupedByDishID = recive.reduce((result, dish) => {
          if (!result[dish.dishid]) {
            result[dish.dishid] = [];
          }
          result[dish.dishid].push(dish);
          return result;
        }, {});
        const resultArray = Object.values(groupedByDishID);
        setList(resultArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get info of discount for update

  useEffect(() => {
    if (discountID) {
      discountURL
        .get(`/${discountID}`)
        .then((response) => {
          if (response.data.length !== 0) {
            setDetailDiscount(response.data);
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  // update table selected
  useEffect(() => {
    if (detailDiscount.length !== 0) {
      detailDiscount.forEach((e) => {
        setSelected((pre) => [...pre, Number(e.dishid)]);
        for (let i = 0; i < mapRef.length; i++) {
          if (mapRef[i].value === e.dishid) {
            mapRef[i].checked = true;
          }
        }
      });
    }
  }, [detailDiscount]);

  const handleDelete = () => {
    let currentDish = JSON.parse(window.localStorage.getItem("dishid"));
    adminURL
      .delete(`/delete-dish/${currentDish}`, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // handle edit dish infomation
  const handleEdit = (e) => {
    localStorage.setItem("dishid", e.dishid);
  };

  const prepareDelete = (e) => {
    setShow(true);
    localStorage.setItem("dishid", e.dishid);
  };

  //handle change  select dish for discount
  const handleChange = (e) => {
    switch (e.target.value) {
      case "all":
        setSelected([]);
        list.forEach((e) => setSelected((pre) => [...pre, e.dishid]));
        for (let i = 0; i < mapRef.length; i++) {
          mapRef[i].checked = true;
        }
        break;
      case "specific":
        setSelected([]);
        for (let i = 0; i < mapRef.length; i++) {
          mapRef[i].checked = false;
        }
        break;
      case "starter":
        compare("start");
        break;

      case "main":
        compare("main");
        break;

      case "dessert":
        compare("dessert");
        break;
      case "drink":
        compare("drink");
        break;
    }
  };

  //reset notice
  const resetNotice = (x) => setNotice(x);
  const handleSelect = (e) => {
    if (e.target.checked === true) {
      setSelected((pre) => [...pre, Number(e.target.value)]);
    } else {
      let position = selected.indexOf(Number(e.target.value));
      selected.splice(position, 1);
      let y = selected;
      setSelected(y);
    }
  };
  // update discount value
  const handleUpdateDiscount = (e) => {
    e.preventDefault();
    let data = new FormData(formRef.current);
    data.append("dishID", selected);
    data.append("object", selectRef.current.value);
    data.append("_method", "PUT");
    adminURL
      .post(`/updatediscount/${discountID}`, data, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        if (response.data === 1) {
          setNotice(true);
        }
      });
  };

  //handle app new  discount

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(formRef.current);
    data.append("dishID", selected);
    data.append("object", selectRef.current.value);

    adminURL
      .postForm("/newsale", data, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  //RENDER
  return (
    <div className={cx("wrapper")}>
      {show && (
        <div className={cx("hidden__modal")}>
          <div className={cx("hidden__notice")}>
            <p className={cx("hidden__notice--text")}>
              do you really want delete this dish??
            </p>
            <MyButton full golden>
              <p onClick={handleDelete}> YES</p>
            </MyButton>
            <MyButton full golden>
              <p onClick={() => setShow(false)}> NO</p>
            </MyButton>
          </div>
        </div>
      )}
      {notice && (
        <HidenNotice
          notify
          time={3000}
          reset={resetNotice}
          nt1={"updated successfully"}
        />
      )}

      <div className={cx("header")}>
        <h4>
          {checkLocation === location.pathname
            ? "Add New Discount"
            : "Menu Management"}
        </h4>

        <div className={cx("header__btn")}>
          <div>
            {!sale && (
              <MyButton fit red to={"/admin/manager-menu/newdish"}>
                <FontAwesomeIcon
                  className={cx("header__icon")}
                  icon={faCirclePlus}
                />
                <span className={cx("header__add")}> Add new dish</span>
              </MyButton>
            )}
          </div>
          <div></div>
        </div>
      </div>
      {sale ? (
        <div className={cx("select__zone")}>
          <div className={cx("select__zone--left")}>
            <span>select :</span>
            <select ref={selectRef} onChange={handleChange}>
              <option value="specific">none</option>
              <option value="all">all</option>
              <option value="starter">starter</option>
              <option value="main">main dish</option>
              <option value="dessert">dessert</option>
              <option value="drink">drink</option>
            </select>
          </div>
        </div>
      ) : (
        <div className={cx("select__zone")}></div>
      )}
      <div className={cx("main__cover")}>
        <table className={cx("table__cover", { half: sale })}>
          <tbody>
            <tr className={cx("row__head")}>
              {sale && <th>Select</th>}
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              {!sale && (
                <Fragment>
                  <th>Action</th>
                </Fragment>
              )}
            </tr>
          </tbody>
          <tfoot>
            {list.map((e, index) => (
              <tr
                key={index}
                className={cx("row__type", {
                  color: index % 2 !== 0 ? true : false,
                })}
              >
                {sale && (
                  <td>
                    <input
                      type="checkbox"
                      value={e[0].dishid}
                      dishtype={e[0].type}
                      onChange={handleSelect}
                      className="select__box"
                    />
                  </td>
                )}
                <td>{e[0].dishid}</td>
                <td>{e[0].dishname}</td>
                <td>{e[0].type}</td>
                <td>${parseFloat(e[0].dishprice).toFixed(2)}</td>

                {!sale && (
                  <td>
                    <span
                      onClick={() => prepareDelete(e)}
                      className={cx("action")}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <Link
                      to={"/admin/manager-menu/updatedish"}
                      onClick={() => {
                        handleEdit(e);
                      }}
                      className={cx("action")}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tfoot>
        </table>

        {sale && (
          <div className={cx("sale__form")}>
            <form
              className={cx("form")}
              ref={formRef}
              onSubmit={
                detailDiscount.length !== 0
                  ? handleUpdateDiscount
                  : handleSubmit
              }
            >
              <div className={cx("input__cover")}>
                <p>discount percent</p>
                <InputField
                  content="Enter percent discount"
                  name="DiscountAmount"
                  required
                  type="number"
                  value={
                    detailDiscount.length !== 0
                      ? Number(detailDiscount[0].DiscountAmount)
                      : 0
                  }
                />
              </div>

              <div className={cx("input__cover")}>
                <p>start sale date</p>
                <InputField
                  content="Enter start sale date"
                  name="StartDate"
                  value={
                    detailDiscount.length !== 0
                      ? detailDiscount[0].StartDate
                      : 0
                  }
                  required
                  type="date"
                />
              </div>
              <div className={cx("input__cover")}>
                <p>end sale date</p>
                <InputField
                  content="Enter end sale date"
                  name="EndDate"
                  required
                  type="date"
                  value={
                    detailDiscount.length !== 0 ? detailDiscount[0].EndDate : 0
                  }
                />
              </div>
              <div className={cx("input__cover")}>
                <p>sale content</p>
                <InputField
                  content="Enter sale content"
                  name="DiscountName"
                  required
                  type="text"
                  value={
                    detailDiscount.length !== 0
                      ? detailDiscount[0].DiscountName
                      : ""
                  }
                />
              </div>
              <div className={cx("btn__cover")}>
                <MyButton golden disabled={selected.length === 0}>
                  <span>
                    {selected.length === 0
                      ? "Add new discount"
                      : "Update Discount"}
                  </span>
                </MyButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerMenuPage;
