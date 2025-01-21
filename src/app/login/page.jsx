import React from "react";
import classes from "./Login.module.css";
import clsx from "clsx";

import { authenticationImg } from "@/images";
import LoginForm from "@/components/Athentication/LoginForm/LoginForm";

const Login = () => {
  return (
    <section className={classes.wrapper}>
      <div className={clsx(classes.container, "container")}>
        <img src={authenticationImg.src} alt="#" className={classes.img} />
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
