import React from "react";
import classes from "./Successfull.module.css";

import { Button, Heading, Text } from "@/components/common";
import { checkEmailImg } from "@/images";
import Modal from "../../common/Modal/Modal";
const Successfull = ({
  heading,
  info,
  onBack,
  isActive,
  onClose,
  to,
  img,
  backToText,
  mainHeading,
}) => {
  return (
    <Modal
      isActive={isActive}
      onClose={onClose}
      heading={mainHeading ? mainHeading : "Success"}
      sm
    >
      <div className={classes.wrapper}>
        <img
          src={img ? img.src : checkEmailImg.src}
          alt="#"
          className={classes.img}
        />
        <div className={classes.infoContainer}>
          <Heading xl2 semiBold textCenter>
            {heading}
          </Heading>
          <Text base primitive700 textCenter>
            {info}
          </Text>
        </div>
        {to ? (
          <Button to={to} onClick={onClose} base>
            {backToText ? backToText : "Back to Home"}
          </Button>
        ) : (
          <Button onClick={onClose} base>
            Back
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Successfull;
