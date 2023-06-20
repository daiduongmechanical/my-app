import classNames from "classnames/bind";
import style from "./importMaterial.module.scss";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import MyButton from "../pageComponents/myButton";
import { useRef, useState, useEffect, useContext } from "react";
import dishURL from "../../config/dishURL";
import { AccountDetailContext } from "../../route";
import HidenNotice from "../pageComponents/noticeHidden";
import warehouseURL from "../../config/warehouseURL";
import { useTranslation } from "react-i18next";

const ImportMaterialPage = () => {
  const cx = classNames.bind(style);
  const formRef = useRef();
  const [status, setStatus] = useState(false);
  const [dishList, setDishList] = useState([]);
  const [quantityVale, setQuantityVale] = useState();
  const [hidden, setHidden] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const selectRef = useRef();
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  //get accounnt detail context
  const getContext = useContext(AccountDetailContext);
  const userData = getContext[0];

  useEffect(() => {
    dishURL
      .get(`?value=all&type=asc`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setDishList(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handle = (e) => {
    e.preventDefault();
    let data = new FormData(formRef.current);
    warehouseURL
      .post("/make-dish", data)
      .then((res) => {
        if (res.status === 201) {
          setHidden(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
        setError(true);
        setHidden(true);
      });
  };

  const resetNotice = (x) => {
    setHidden(x);
    setError(x);
  };

  console.log(status, quantityVale, description);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main")}>
        <form onSubmit={handle} ref={formRef}>
          {hidden && (
            <HidenNotice
              notify
              nt1={error ? errorMessage : t("newDish.success")}
              time={error ? false : 3000}
              reset={resetNotice}
              error={error}
            />
          )}
          <Card style={{ width: "100%" }} className="mt-5 ">
            <Card.Body>
              <h2>{t("newDish.header")}</h2>
              <Form.Select
                required
                ref={selectRef}
                name="dishid"
                onChange={() => setStatus(true)}
                aria-label="Default select example"
                className="mb-3"
              >
                <option disabled={status}>{t("newDish.select")}</option>

                {dishList.map((e) => (
                  <option key={e.dishid} value={e.dishid}>
                    {e.dishname}
                  </option>
                ))}
              </Form.Select>

              <InputGroup
                onChange={(e) => setQuantityVale(e.target.value)}
                className="mb-5 "
                value={quantityVale}
              >
                <InputGroup.Text id="inputGroup-sizing-default">
                  {t("newDish.quantity")}
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  type="number"
                  name="quantity"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>

              <InputGroup className="mb-5">
                <InputGroup.Text id="inputGroup-sizing-default">
                  {t("newDish.id")}
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  type="text"
                  readOnly="true"
                  name="userid"
                  value={userData.id}
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  {t("newDish.description")}
                </InputGroup.Text>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  aria-label="Default"
                  type="text"
                  name="description"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </Card.Body>

            <MyButton
              disabled={!status || quantityVale === "" || description === ""}
              red
              full
            >
              {t("newDish.btn")}
            </MyButton>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ImportMaterialPage;
