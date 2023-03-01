import classNames from "classnames/bind";
import { useState } from "react";
import style from "./inputfield.module.scss";

const InputField = ({ content, name, required, regex, notice, type }) => {
  const cx = classNames.bind(style);
  const [data, setData] = useState("");
  const [Check, setCheck] = useState(true);

  if (regex.test(data)) {
    if (!Check) setCheck(true);
  } else {
    if (Check && data !== "") {
      setCheck(false);
    }
  }

  return (
    <div className={cx("wrapper")}>
      <input
        onChange={(e) => setData(e.target.value)}
        value={data}
        name={name}
        className={cx("form__input")}
        type={type}
        required={required}
        placeholder={content}
      />

      <div
        className={cx("status__show", {
          error: !Check,
          success: Check && data !== "",
        })}
      >
        {!Check && <p className={cx("notice")}>{notice}</p>}
      </div>
    </div>
  );
};

export default InputField;
