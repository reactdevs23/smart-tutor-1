import React from "react";
import classes from "./Heading.module.css";
import clsx from "clsx";

const Heading = ({
  children,
  xs,
  md,
  sm,
  base,
  lg,
  xl,
  xl2,
  xl3,
  xl4,
  xl5,
  xl6,
  xl7,
  primitive0,
  primitiveBlue500,
  primitive200,
  primitive300,
  primitive500,
  primitive400,
  primitive600,
  primitive700,
  primitive800,
  primitive900,
  primitive950,

  textPrimitive,
  textWhite,
  semiBold,
  bold,
  font600,
  textCenter,
  textRight,
  className,
  regular,
  uppercase,
}) => {
  return (
    <h2
      className={clsx(
        classes.heading,
        primitive0 && classes.primitive0,
        primitiveBlue500 && classes.primitiveBlue500,
        primitive200 && classes.primitive200,
        primitive300 && classes.primitive300,
        primitive400 && classes.primitive400,
        primitive500 && classes.primitive500,
        primitive600 && classes.primitive600,
        primitive700 && classes.primitive700,
        primitive900 && classes.primitive900,
        primitive800 && classes.primitive800,
        primitive950 && classes.primitive950,
        textPrimitive && classes.textPrimitive,
        textWhite && classes.textWhite,
        xs && classes.xs,
        sm && classes.sm,
        md && classes.md,
        base && classes.base,
        lg && classes.lg,
        xl && classes.xl,
        xl2 && classes.xl2,
        xl3 && classes.xl3,
        xl4 && classes.xl4,
        xl5 && classes.xl5,
        xl6 && classes.xl6,
        xl7 && classes.xl7,
        bold && classes.bold,
        font600 && classes.font600,
        semiBold && classes.semiBold,
        regular && classes.regular,
        textCenter && classes.textCenter,
        textRight && classes.textRight,
        uppercase && classes.uppercase,
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
