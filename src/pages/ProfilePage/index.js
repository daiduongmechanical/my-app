import classNames from "classnames/bind";
import style from "./profilepage.module.scss";
import InputField from "../pageComponents/inputField";
import { AccountDetailContext } from "../../route";
import { useContext, useRef, useState } from "react";
import MyButton from "../pageComponents/myButton";
import userURL from "../../config/userURL";
import { Cookies } from "react-cookie";
import HidenNotice from "../pageComponents/noticeHidden";

const ProfilePage = () => {
  const cx = classNames.bind(style);
  //get account details context
  const getContext = useContext(AccountDetailContext);
  const profile = getContext[0];
  const setProfile = getContext[1];
  const formRef = useRef();
  const [showNotice, setShowNotice] = useState(false);
  let dob;
  const cookies = new Cookies();

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = new FormData(formRef.current);
    data.append("userID", profile.id);
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

  if (profile === undefined) {
    return;
  }
  if (profile.dob !== null) {
    dob = profile.dob.split(" ")[0];
  }

  return (
    <div className={cx("wrapper")}>
      <h3>Profile detail</h3>
      {showNotice && (
        <HidenNotice
          nt1={"your profile updated"}
          time={2000}
          notify
          reset={action}
        />
      )}
      <form className={cx("main__form")} onSubmit={handleUpdate} ref={formRef}>
        <p>your name</p>
        <InputField value={profile.name} type="tetx" name={"name"} />
        <p>email</p>
        <InputField value={profile.email} type="tetx" name={"email"} readOnly />
        <p>phone</p>
        <InputField value={profile.phone} type="number" name={"phone"} />
        <p>address</p>
        <InputField
          value={profile.address}
          type="tetx"
          name={"address"}
          content="Enter your address"
        />
        <p>date of birth</p>
        <InputField
          type="date"
          name={"dob"}
          value={dob}
          pattern="\d{2}/\d{2}/\d{4}"
        />

        <MyButton red full>
          Update your Profile
        </MyButton>
      </form>
    </div>
  );
};

export default ProfilePage;
