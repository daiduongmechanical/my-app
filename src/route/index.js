import { Routes, Route, useLocation } from "react-router-dom";
import { PublicRoutes, AdminRoutes } from "./controllRoutes";
import { createContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import GoToTop from "../layout/components/gototop";
import userURL from "../config/userURL";
import { Cookies } from "react-cookie";
import adminURL from "../config/adminURL";
import useSound from "use-sound";
import boopSfx from "../asset/sound/Law And Order Sound.mp3";
import cartURL from "../config/cartURL";

export const StatusLoginContext = createContext();
export const AccountTypeContext = createContext();
export const AccountDetailContext = createContext();
export const CartContext = createContext();
export const CartQuantityContext = createContext();
export const NewOrderContext = createContext();

const WrapperRoutes = () => {
  const [statusLogin, setStatusLogins] = useState(false);
  const [type, setType] = useState(false);
  const [accountDetail, setAccountDetail] = useState();
  const [cart, setCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [newOrder, setNewOrder] = useState(false);

  let usingRoles = [...PublicRoutes];
  const cookies = new Cookies();
  let location = useLocation();

  //play sound
  const [play] = useSound(boopSfx);
  //set cokie
  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  //refresh token
  useEffect(() => {
    userURL
      .post("/refresh", [], {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setCookie("jwt", response.data.authorisation.token, 1);
          setStatusLogins(true);
          setAccountDetail(response.data.user);
          if (response.data.user.manage === 1) {
            setType(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get list cart
  useEffect(() => {
    if (accountDetail !== undefined) {
      cartURL
        .get(`/${accountDetail.id}`)
        .then((response) => {
          if (response.statusText === "OK")
            setCartQuantity(response.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [cart, accountDetail]);

  //get notice new order
  const getdata = () => {
    let currentTotal = localStorage.getItem("total");

    adminURL
      .get("/order/count", {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data !== Number(currentTotal)) {
            localStorage.setItem("total", response.data);
            setNewOrder(true);
            play();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reload = () =>
    setInterval(() => {
      getdata();
    }, 30000);

  useEffect(() => {
    if (type) {
      reload();
    }

    return clearInterval(reload);
  }, [type]);

  if (type) {
    usingRoles = [...usingRoles, ...AdminRoutes];
  }

  // giao dien

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
                  <CartQuantityContext.Provider
                    value={[cartQuantity, setCartQuantity]}
                  >
                    <CartContext.Provider value={[cart, setCart]}>
                      <AccountTypeContext.Provider value={[type, setType]}>
                        <AccountDetailContext.Provider
                          value={[accountDetail, setAccountDetail]}
                        >
                          <StatusLoginContext.Provider
                            value={[statusLogin, setStatusLogins]}
                          >
                            <NewOrderContext.Provider
                              value={[newOrder, setNewOrder]}
                            >
                              <Layout>
                                <Page />
                              </Layout>
                            </NewOrderContext.Provider>
                          </StatusLoginContext.Provider>
                        </AccountDetailContext.Provider>
                      </AccountTypeContext.Provider>
                    </CartContext.Provider>
                  </CartQuantityContext.Provider>
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
