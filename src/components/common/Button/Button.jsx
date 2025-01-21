import React from "react";
import clsx from "clsx";
import classes from "./Button.module.css";

import { ImSpinner } from "react-icons/im";
import Link from "next/link";

const Button = ({
  children,
  onClick,
  href,
  transparent,
  btnPrimary,
  primaryBlue500,
  primitive50,

  wFull,
  className,
  to,
  loading,
  base,

  ...rest
}) => {
  return (
    <>
      {onClick ? (
        <button
          {...rest}
          className={clsx(
            className,
            classes.button,
            base && classes.base,
            transparent && classes.transparent,

            btnPrimary && classes.btnPrimary,
            primitive50 && classes.primitive50,

            wFull && classes.wFull,
            loading && classes.loading
          )}
          onClick={onClick}
          disabled={loading}
        >
          {loading ? (
            <>
              {children} <ImSpinner className={classes.spinner} />
            </>
          ) : (
            children
          )}
        </button>
      ) : href ? (
        <a
          {...rest}
          className={clsx(
            className,
            classes.button,
            base && classes.base,
            transparent && classes.transparent,

            btnPrimary && classes.btnPrimary,
            primitive50 && classes.primitive50,

            wFull && classes.wFull,
            loading && classes.loading
          )}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {loading ? (
            <>
              {children} <ImSpinner className={classes.spinner} />
            </>
          ) : (
            children
          )}
        </a>
      ) : to ? (
        <Link
          {...rest}
          className={clsx(
            className,
            classes.button,
            base && classes.base,
            transparent && classes.transparent,

            btnPrimary && classes.btnPrimary,
            primitive50 && classes.primitive50,

            wFull && classes.wFull,
            loading && classes.loading
          )}
          href={to}
        >
          {loading ? (
            <>
              {children} <ImSpinner className={classes.spinner} />
            </>
          ) : (
            children
          )}
        </Link>
      ) : (
        <button
          {...rest}
          className={clsx(
            className,
            classes.button,
            base && classes.base,
            transparent && classes.transparent,

            btnPrimary && classes.btnPrimary,
            primitive50 && classes.primitive50,

            wFull && classes.wFull,
            loading && classes.loading
          )}
        >
          {loading ? (
            <>
              {children} <ImSpinner className={classes.spinner} />
            </>
          ) : (
            children
          )}
        </button>
      )}
    </>
  );
};

export default Button;
