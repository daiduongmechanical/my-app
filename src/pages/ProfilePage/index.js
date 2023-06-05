import classNames from "classnames/bind";
import style from "./profilepage.module.scss";
import InputField from "../pageComponents/inputField";
import { AccountDetailContext } from "../../route";
import { useContext, useEffect, useRef, useState } from "react";
import MyButton from "../pageComponents/myButton";
import userURL from "../../config/userURL";
import { Cookies } from "react-cookie";
import HidenNotice from "../pageComponents/noticeHidden";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const ProfilePage = () => {
  const cx = classNames.bind(style);
  //get account details context
  const getContext = useContext(AccountDetailContext);
  const profile = getContext[0];
  const setProfile = getContext[1];
  const formRef = useRef();
  const [showNotice, setShowNotice] = useState(false);
  const [listDistrict, setListDistrict] = useState([]);
  const [districtCode, setDistrictCode] = useState();
  const [wardCode, setWardCode] = useState();
  const [listWard, setListWard] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const streetRef = useRef();
  const [addressInput, setAddressInput] = useState("");
  let dob;
  const cookies = new Cookies();
  const { t } = useTranslation();

  //get list disteict code

  useEffect(() => {
    axios
      .get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=202",
        { headers: { token: "ec515217-011b-11ee-82fc-92443ce24152" } }
      )
      .then((response) => {
        if (response.status === 200) {
          setListDistrict(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  //get list ward

  useEffect(() => {
    if (profile !== undefined) {
      axios
        .get(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${
            districtCode === undefined
              ? profile.addresscode.split(",")[1]
              : districtCode
          }`,
          { headers: { token: "ec515217-011b-11ee-82fc-92443ce24152" } }
        )
        .then((response) => {
          if (response.status === 200) {
            setListWard(response.data.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [districtCode, profile]);

  const handleUpdate = (e) => {
    e.preventDefault();
    let address = `${streetRef.current.value},${selectedWard},${selectedDistrict},TP HCM`;
    let addresscode = `202,${districtCode},${wardCode}`;
    const data = new FormData(formRef.current);
    data.append("userID", profile.id);
    data.append("address", address);
    data.append("addresscode", addresscode);
    userURL
      .postForm("/update", data, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        if (response.data.length !== 0) {
          setShowNotice(true);
          setProfile(response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const action = (x) => setShowNotice(x);

  //handle selected ware
  const handleWare = (element) => {
    let x = listWard.filter((e) => e.WardCode === element.target.value);
    setSelectedWard(x[0].WardName);
    setWardCode(element.target.value);
  };
  //handle selected district

  const handleDistrict = (element) => {
    let x = listDistrict.filter(
      (e) => e.DistrictID === Number(element.target.value)
    );

    setSelectedDistrict(x[0].DistrictName);
    setDistrictCode(element.target.value);
  };

  if (profile === undefined) {
    return;
  }

  if (profile.dob !== null) {
    dob = profile.dob.split(" ")[0];
  }
  //RENDER
  return (
    <div className={cx("wrapper")}>
      <h3>{t("profile.head")}</h3>
      {showNotice && (
        <HidenNotice
          nt1={"your profile updated"}
          time={2000}
          notify
          reset={action}
        />
      )}
      <form className={cx("main__form")} onSubmit={handleUpdate} ref={formRef}>
        <p>{t("profile.name")}</p>
        <InputField value={profile.name} type="tetx" name={"name"} />
        <p>{t("profile.email")}</p>
        <InputField value={profile.email} type="tetx" name={"email"} readOnly />
        <p>{t("profile.phone")}</p>
        <InputField value={profile.phone} type="number" name={"phone"} />

        <p>{t("profile.dob")}</p>
        <InputField
          type="date"
          name={"dob"}
          value={dob}
          pattern="\d{2}/\d{2}/\d{4}"
        />
        <p className="mb-3">{t("profile.address")}</p>
        <div className="d-flex">
          <Form.Select className="pr-1" name="city">
            <option>Select City</option>
            <option selected name="ProvinceID" value={202}>
              Hồ Chí Minh
            </option>
          </Form.Select>
          <Form.Select
            name="district"
            className="mr-2"
            onChange={handleDistrict}
          >
            <option>Select District</option>
            {listDistrict.map((e) => (
              <option
                selected={
                  Number(profile.addresscode.split(",")[1]) ===
                  Number(e.DistrictID)
                }
                value={e.DistrictID}
                key={e.DistrictID}
              >
                {e.DistrictName}
              </option>
            ))}
          </Form.Select>
          <Form.Select name="ward" onChange={handleWare} className="mr-2">
            <option>Select ward</option>
            {listWard.map((e) => (
              <option
                selected={
                  Number(profile.addresscode.split(",")[2]) ===
                  Number(e.WardCode)
                }
                value={e.WardCode}
                key={e.WardName}
              >
                {e.WardName}
              </option>
            ))}
          </Form.Select>
        </div>
        <InputGroup className="mt-2">
          <InputGroup.Text id="basic-addon1">street</InputGroup.Text>
          <Form.Control
            ref={streetRef}
            placeholder="Enter your street"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={
              addressInput === "" ? profile.address.split(",")[0] : addressInput
            }
            onChange={(e) => setAddressInput(e.target.value)}
          />
        </InputGroup>
        <MyButton red full>
          {t("profile.update")}
        </MyButton>
      </form>
    </div>
  );
};

export default ProfilePage;
