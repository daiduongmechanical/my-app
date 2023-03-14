import { Routes, Route, useLocation } from "react-router-dom";
import { PublicRoutes, AdminRoutes } from "./controllRoutes";
import { createContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import GoToTop from "../layout/components/gototop";
import userURL from "../config/userURL";

export const StatusLoginContext = createContext();
export const AccountTypeContext = createContext();
export const AccountDetailContext = createContext();
export const DishContext = createContext();

const WrapperRoutes = () => {
  const [statusLogin, setStatusLogins] = useState(false);
  const [type, setType] = useState(false);
  const [accountDetail, setAccountDetail] = useState();
  const [dish, setDish] = useState([]);
  let usingRoles = [...PublicRoutes];

  //get cockie
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //set cokie
  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  useEffect(() => {
    let jwt = getCookie("jwt");
    userURL
      .post("/refresh", [], {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setCookie("jwt", response.data.authorisation.token, 1);
          setStatusLogins(true);
          setAccountDetail(response.data.user);
          if (response.data.user.manage === "1") {
            setType(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (type) {
    usingRoles = [...usingRoles, ...AdminRoutes];
  }
  let location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <GoToTop>
        <Routes key={location.pathname} location={location}>
          {usingRoles.map((route, index) => {
            let Layout = route.layout;

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DishContext.Provider value={[dish, setDish]}>
                    <AccountTypeContext.Provider value={[type, setType]}>
                      <AccountDetailContext.Provider
                        value={[accountDetail, setAccountDetail]}
                      >
                        <StatusLoginContext.Provider
                          value={[statusLogin, setStatusLogins]}
                        >
                          <Layout>
                            <Page />
                          </Layout>
                        </StatusLoginContext.Provider>
                      </AccountDetailContext.Provider>
                    </AccountTypeContext.Provider>
                  </DishContext.Provider>
                }
              />
            );
          })}
        </Routes>
      </GoToTop>
    </AnimatePresence>
  );
};

export default WrapperRoutes;
