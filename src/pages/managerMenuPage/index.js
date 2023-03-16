import classNames from "classnames/bind";
import style from "./managermenupage.module.scss";
import { useState, useEffect, useContext } from "react";
import dishURL from "../../config/dishURL";
import adminURL from "../../config/adminURL";
import { Cookies } from "react-cookie";
import MyButton from "../pageComponents/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DishContext } from "../../route";

const ManagerMenuPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  //get dish context
  const getDishContext = useContext(DishContext);
  const hanleDish = getDishContext[1];

  const cookies = new Cookies();

  useEffect(() => {
    dishURL
      .get("/")
      .then((response) => {
        console.log(response);
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const handleEdit = (e) => {
    hanleDish(e);
    localStorage.setItem("dishid", e.dishid);
  };

  const prepareDelete = (e) => {
    setShow(true);
    localStorage.setItem("dishid", e.dishid);
  };

  return (
    <div className={cx("wrapper")}>
      {show && (
        <div className={cx("hidden__modal")}>
          <div className={cx("hidden__notice")}>
            <p className={cx("hidden__notice--text")}>
              do you really want de this dish??
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

      <div className={cx("header")}>
        <h4>Menu management</h4>
        <MyButton fit red to={"/admin/manager-menu/newdish"}>
          <FontAwesomeIcon className={cx("header__icon")} icon={faCirclePlus} />
          <span className={cx("header__add")}> Add new dish</span>
        </MyButton>
      </div>
      <table className={cx("table__cover")}>
        <tbody>
          <tr className={cx("row__head")}>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
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
              <td>{e.dishid}</td>
              <td>{e.dishname}</td>
              <td>${parseFloat(e.dishprice).toFixed(2)}</td>
              <td>
                <span onClick={() => prepareDelete(e)} className={cx("action")}>
                  delete
                </span>
                <Link
                  to={"/admin/manager-menu/updatedish"}
                  onClick={() => {
                    handleEdit(e);
                  }}
                  className={cx("action")}
                >
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default ManagerMenuPage;
