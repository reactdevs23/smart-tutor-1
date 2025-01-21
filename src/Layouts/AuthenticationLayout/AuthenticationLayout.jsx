import React from "react";
import classes from "./AuthenticationLayout.module.css";
import { Outlet } from "react-router-dom";

import CopyrightContainer from "Layouts/CopyrightContainer/CopyrightContainer";
import Navbar from "Layouts/Navbar/Navbar";

const AuthenticationLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main className={classes.wrapper}>
        <div className={classes.outlet}>
          <Outlet />
        </div>
        {/* <CopyrightContainer /> */}
      </main>
    </>
  );
};

export default AuthenticationLayout;
