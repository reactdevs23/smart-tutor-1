"use client";
import Successfull from "@/src/components/Modal/Successfull/Successfull";
import React, { useState } from "react";

export default function page() {
  const [isActive, setIsActive] = useState(true);
  return (
    <Successfull
      heading="Account Verified!"
      info="We’ve successfully verified your account. Enjoy your experience with Smart-Tutor."
      isActive={isActive}
      onClose={() => setIsActive(false)}
      backToText="Back To Login Page"
      to="/login"
    />
  );
}
