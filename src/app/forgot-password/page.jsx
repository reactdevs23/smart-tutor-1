"use client";

import React, { useState } from "react";
import classes from "./ForgotPassword.module.css";
import clsx from "clsx";
import Form from "../../components/Athentication/ForgotPassword/Form/Form";
import { authenticationImg } from "../../images";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  return (
    <section className={classes.wrapper}>
      <div className={clsx(classes.container, "container")}>
        <img src={authenticationImg.src} alt="#" className={classes.img} />
        <Form step={step} setStep={setStep} />
      </div>
    </section>
  );
};

export default ForgotPassword;
