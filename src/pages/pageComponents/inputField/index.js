import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { Fragment, useState, useEffect } from "react";
import style from "./inputfield.module.scss";

const InputField = ({
  content,
  name,
  required,
  regex,
  notice,
  type,
  action,
}) => {
  const cx = classNames.bind(style);
  const [data, setData] = useState("");
  const [Check, setCheck] = useState(true);
  const [eyes, setEyes] = useState(true);
  const [target, setTarget] = useState(false);

  let show = eyes ? "password" : "text";
  const showpassword = () => {
    setEyes(!eyes);
  };

  //handel onchange
  const handleChange = (e) => {
    setData(e.target.value);

    //xu ly regex
    if (regex) {
      if (regex.test(e.target.value)) {
        setCheck(true, e.target.value);

        action(true);
      } else {
        setCheck(false);
        action(false);
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("input__cover")}>
        <input
          onBlur={() => setTarget(true)}
          onChange={handleChange}
          value={data}
          name={name}
          className={cx("form__input")}
          type={name === "password" ? show : type}
          required={required}
          placeholder={content}
        />
        {name === "password" && (
          <Fragment>
            {eyes ? (
              <FontAwesomeIcon
                onClick={showpassword}
                className={cx("input__icon")}
                icon={faEye}
              />
            ) : (
              <FontAwesomeIcon
                onClick={showpassword}
                className={cx("input__icon")}
                icon={faEyeSlash}
              />
            )}
          </Fragment>
        )}
      </div>
      <div
        className={cx("status__show", {
          error: !Check,
          success: Check && data !== "",
        })}
      >
        {!Check && data !== "" && <p className={cx("notice")}>{notice}</p>}
        {required && data === "" && target && (
          <p className={cx("notice")}>{name} can't blank</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
