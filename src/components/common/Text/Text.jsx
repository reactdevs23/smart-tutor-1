import React from "react";
import classes from "./Text.module.css";
import clsx from "clsx";
const Text = ({
  children,
  xs,
  sm,
  base,

  md,
  lg,
  xl,
  xl2,
  xl3,
  xl4,
  primitive0,
  primitive200,
  primitive300,
  primitive400,
  primitive500,
  primitiveError,
  primitive600,
  primitive700,
  primitive800,
  primitive900,
  primitive950,
  semiBold,
  secondary,
  bold,
  font600,
  textCenter,
  textRight,
  uppercase,
  textLeft,
  className,
  onClick,
}) => {
  return (
    <p
      onClick={onClick && onClick}
      className={clsx(
        classes.text,
        primitive0 && classes.primitive0,
        primitive200 && classes.primitive200,
        primitive300 && classes.primitive300,
        primitive400 && classes.primitive400,
        primitive500 && classes.primitive500,
        primitive600 && classes.primitive600,
        primitive700 && classes.primitive700,
        primitive900 && classes.primitive900,
        primitive800 && classes.primitive800,
        primitive950 && classes.primitive950,
        primitiveError && classes.primitiveError,
        secondary && classes.secondary,
        xs && classes.xs,
        sm && classes.sm,
        md && classes.md,
        base && classes.base,
        lg && classes.lg,
        xl && classes.xl,
        xl2 && classes.xl2,
        xl3 && classes.xl3,
        xl4 && classes.xl4,
        bold && classes.bold,
        font600 && classes.font600,
        semiBold && classes.semiBold,
        textCenter && classes.textCenter,
        uppercase && classes.uppercase,
        textLeft && classes.textLeft,
        textRight && classes.textRight,
        className
      )}
    >
      {children}
    </p>
  );
};

export default Text;
