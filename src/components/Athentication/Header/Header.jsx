import React from "react";
import classes from "./Header.module.css";
import { Heading, Text } from "@/components/common";
import clsx from "clsx";

const Header = ({ heading, info, codeSentOn, xl2 }) => {
  const maskMiddle = (str) => {
    if (str.length <= 4) {
      return str;
    }

    const start = str.slice(0, Math.floor((str.length - 4) / 2));
    const end = str.slice(Math.ceil((str.length + 4) / 2));

    return `${start}****${end}`;
  };
  return (
    <div className={clsx(classes.header, xl2 && classes.xl2)}>
      <Heading xl3={!xl2} xl2={xl2} primitive950 bold>
        {heading}
      </Heading>
      <Text primitive700 lg={!xl2} base={xl2} className={classes.info}>
        {info} <br />
        {codeSentOn && (
          <span className={classes.bold}>{maskMiddle(codeSentOn)}</span>
        )}
      </Text>
    </div>
  );
};

export default Header;
