"use client";
import Successfull from "@/src/components/Modal/Successfull/Successfull";
import { errorImg } from "@/src/images";
import React, { useState } from "react";

export default function page() {
  const [isActive, setIsActive] = useState(true);
  return (
    <Successfull
      mainHeading="Verification Unsuccessful"
      heading="Action Required"
      info="Your verification attempt didn’t succeed. Kindly verify your information and submit it again"
      isActive={isActive}
      onClose={() => setIsActive(false)}
      backToText="Back To Login Page"
      img={errorImg}
      to="/login"
    />
  );
}
