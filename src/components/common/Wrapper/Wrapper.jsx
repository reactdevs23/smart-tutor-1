import React from "react";
import classes from "./Wrapper.module.css";
import clsx from "clsx";

const Wrapper = ({ className, children }) => {
  return (
    <section className={clsx(classes.wrapper, className)}>{children}</section>
  );
};

export default Wrapper;
