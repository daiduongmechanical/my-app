import { Routes, Route, useLocation } from "react-router-dom";
import { PublicRoutes, AdminRoutes } from "./controllRoutes";
import { createContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import GoToTop from "../layout/components/gototop";

export const StatusLoginContext = createContext();
export const AccountTypeContext = createContext();

const WrapperRoutes = () => {
  const [statusLogin, setStatusLogins] = useState(false);
  const [type, setType] = useState(false);
  let usingRoles = [...PublicRoutes];
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
                  <AccountTypeContext.Provider value={[type, setType]}>
                    <StatusLoginContext.Provider
                      value={[statusLogin, setStatusLogins]}
                    >
                      <Layout>
                        <Page />
                      </Layout>
                    </StatusLoginContext.Provider>
                  </AccountTypeContext.Provider>
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
