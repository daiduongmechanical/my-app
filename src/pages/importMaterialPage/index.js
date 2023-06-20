import classNames from "classnames/bind";
import style from "./addMaterial.module.scss";
import { useState, useEffect, useRef, useContext } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MyButton from "../pageComponents/myButton";
import dishURL from "../../config/dishURL";
import HidenNotice from "../pageComponents/noticeHidden";
import warehouseURL from "../../config/warehouseURL";
import { AccountDetailContext } from "../../route";
import { useTranslation } from "react-i18next";
const AddMaterialPage = () => {
  const cx = classNames.bind(style);
  const [list, setList] = useState([1]);
  const [listDish, setListDish] = useState([]);
  const [action, setAction] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectValue, setSelectvalue] = useState([]);
  const formRef = useRef();
  const [hidden, setHidden] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  //get account details context
  const getContext = useContext(AccountDetailContext);
  const user = getContext[0];

  const handleAdd = (e) => {
    e.preventDefault();
    setAction((pre) => !pre);
    setList((pre) => [...pre, list.length + 1]);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    list.splice(e.target.getAttribute("position"), 1);
    const x = [...list];
    setList(x);
    setAction((pre) => !pre);
  };
  //handle disabled
  useEffect(() => {
    setSelectvalue([]);
    let select = document.querySelectorAll(".select__ingredient");
    let mass = document.querySelectorAll(".mass__ingredient");
    let checkSelect = 0;
    let checkMass = 0;
    select.forEach((e) => {
      setSelectvalue((pre) => [...pre, e.value]);

      if (e.value === "0") {
        checkSelect++;
      }
    });
    mass.forEach((e) => {
      if (e.value === "") {
        checkMass++;
      }
    });

    if (checkMass === 0 && checkSelect === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [action]);

  // getlist ingredient
  useEffect(() => {
    dishURL
      .get("/ingredient")
      .then((res) => {
        if (res.status === 200) {
          setListDish(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const resetNotice = (x) => {
    setHidden(x);
    setError(x);
  };

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(formRef.current);
    data.append("userid", user.id);
    selectValue.forEach((value) => {
      data.append("code[]", value);
    });
    warehouseURL
      .post("/import-material", data)
      .then((res) => {
        if (res.status === 201) {
          setHidden(true);
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          setError(true);
        }
      });
  };

  return (
    <div className={cx("wrapper")}>
      <h2>{t("importMaterial.header")}</h2>{" "}
      {hidden && (
        <HidenNotice
          notify
          error={error}
          time={error ? false : 3000}
          reset={resetNotice}
          nt1={t("importMaterial.success")}
        />
      )}
      <button onClick={handleAdd} className="btn btn-info ">
        {t("importMaterial.add")}
      </button>
      <form className={cx("form__cover")} ref={formRef} onSubmit={handleSubmit}>
        <div className={cx("wrapper__map")}>
          {list.map((e, index) => (
            <div key={e} className={cx("input__cover")}>
              <Form.Select
                onChange={() => setAction((pre) => !pre)}
                name="code[]"
                aria-label="Default select example"
                className="mr-4 select__ingredient"
              >
                <option value="0">{t("importMaterial.select")}</option>
                {listDish.map((e) => (
                  <option
                    disabled={selectValue.includes(e.ingredientcode)}
                    key={e.ingredientcode}
                    value={e.ingredientcode}
                  >
                    {`${e.ingredientcode} -    ${e.name}`}
                  </option>
                ))}
              </Form.Select>

              <InputGroup onChange={() => setAction((pre) => !pre)}>
                <Form.Control
                  name="mass[]"
                  className="mass__ingredient"
                  placeholder={t("importMaterial.mass")}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Text
                  position={index}
                  onClick={handleRemove}
                  id="basic-addon2"
                  className="btn btn-outline-danger text-dark"
                >
                  {t("importMaterial.delete")}
                </InputGroup.Text>
              </InputGroup>
            </div>
          ))}
        </div>
        <MyButton disabled={disabled} red full>
          {t("importMaterial.btn")}
        </MyButton>
      </form>
    </div>
  );
};

export default AddMaterialPage;
