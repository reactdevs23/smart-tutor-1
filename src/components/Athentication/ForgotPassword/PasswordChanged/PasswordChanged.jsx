import React from "react";
import classes from "./PasswordChanged.module.css";
import { checkEmailImg } from "@/images";
import { Button, Heading, Text } from "@/components/common";
const PasswordChanged = () => {
  return (
    <div className={classes.wrapper}>
      <img src={checkEmailImg.src} alt="#" className={classes.img} />
      <div className={classes.infoContainer}>
        <Heading xl2 bold>
          Your password has been successfully reset!
        </Heading>
        <Text sm primitive700>
          You can now login with your new password, if you encounter any issues,
          please contact support.
        </Text>
      </div>
      <Button to="/login">Return to Login</Button>
    </div>
  );
};

export default PasswordChanged;
