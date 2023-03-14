import classNames from "classnames/bind";
import style from "./managermenupage.module.scss";
import { useState, useEffect } from "react";
import dishURL from "../../config/dishURL";
import axios from "axios";
import adminURL from "../../config/adminURL";
import { Cookies } from "react-cookie";

const ManagerMenuPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    dishURL
      .get("/")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = () => {
    adminURL
      .post("/add-dish", [], {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cx("wrapper")}>
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
                <span onClick={handleDelete} className={cx("action")}>
                  delete
                </span>
                <span className={cx("action")}>edit</span>
              </td>
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default ManagerMenuPage;
