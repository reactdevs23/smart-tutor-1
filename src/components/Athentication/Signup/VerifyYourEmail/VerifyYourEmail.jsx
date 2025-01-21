import React from "react";
import classes from "./VerifyYourEmail.module.css";
import { checkEmailImg } from "@/images";
import { Button, Heading, Text } from "@/components/common";
const VerifyYourEmail = () => {
  return (
    <div className={classes.wrapper}>
      <img src={checkEmailImg.src} alt="#" className={classes.img} />
      <div className={classes.infoContainer}>
        <Heading xl3 font600>
          Verify your email
        </Heading>
        <Text lg primitive700>
          Your registration was completed successfully. We sent a verification
          link to your email. Please verify your email.
        </Text>
      </div>
      <Button to="/login">Return to Login</Button>
    </div>
  );
};

export default VerifyYourEmail;
