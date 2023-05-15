import classNames from "classnames/bind";
import style from "./hidenNotice.module.scss";
import MyButton from "../myButton";
import { Fragment, useEffect, useState } from "react";

const HidenNotice = ({
  nt1,
  nt2,
  bt1,
  notify,
  time,
  reset,
  l1,
  l2,
  success,
}) => {
  const cx = classNames.bind(style);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (time) {
      let visible = setInterval(() => {
        setHidden(false);
        reset(false);
        clearInterval(visible);
      }, time);
    }
  }, [time]);
  return (
    <Fragment>
      {hidden && (
        <div className={cx("hidden__notice", { success: success })}>
          {notify ? (
            <h4>{nt1}</h4>
          ) : (
            <Fragment>
              <p className={cx("hidden__notice--text")}>{nt2}</p>
              <MyButton full black to={l1}>
                {bt1}
              </MyButton>
              <MyButton full black to={l2}>
                <span onClick={() => setHidden(false)}> Close Notice</span>
              </MyButton>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default HidenNotice;
