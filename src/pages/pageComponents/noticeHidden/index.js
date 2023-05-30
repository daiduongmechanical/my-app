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
  error,
}) => {
  const cx = classNames.bind(style);
  const [hidden, setHidden] = useState(true);
  const [resetStament, setResetStament] = useState(false);
  useEffect(() => {
    if (time || error) {
      let visible = setInterval(
        () => {
          if (time) {
            setHidden(false);
            reset(false);
          }

          clearInterval(visible);
        },
        time ? time : 2000
      );
    }
  }, [time, resetStament]);

  const error_btn = () => {
    setResetStament((pre) => !pre);
    setHidden(false);
    reset(false);
  };
  return (
    <Fragment>
      {hidden && (
        <div className={cx("hidden__notice", { success: success })}>
          {notify ? (
            error ? (
              <Fragment>
                <h4>{nt1}</h4>
                <MyButton full black>
                  <span onClick={error_btn}> Close Notice</span>
                </MyButton>
              </Fragment>
            ) : (
              <h4>{nt1}</h4>
            )
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
