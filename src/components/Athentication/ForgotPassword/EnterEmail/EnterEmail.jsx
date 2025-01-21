"use client";
import { Button, Dropdown, Heading, Input, Text } from "@/components/common";
import React, { useState } from "react";
import classes from "./EnterEmail.module.css";
import { post } from "../../../../../lib/api";

const EnterEmail = ({ onEnterEmail, email, setEmail }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);

  const handleVerificationCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await post("/api/forgot", {
        email,
        role: selectedRole,
      });

      if (response.data.status === 200) {
        // Save the token to localStorage
        const tokenEmailRole = {
          email: email,
          token: response?.data?.data?.token,
          role: selectedRole,
        };

        // Save the object to localStorage
        localStorage.setItem("tokenEmailRole", JSON.stringify(tokenEmailRole));

        // Call onEnterEmail or handle the next step
        onEnterEmail();
      } else {
        alert("Failed to send the password reset email. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      alert(
        "An error occurred during the password reset process. Please try again."
      );
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Heading xl3 primitive950 bold>
          Forgot Password
        </Heading>
        <Text base semiBold primitive600 className={classes.needAnAccount}>
          To reset your password, please enter the email address associated with
          your account
        </Text>
      </div>
      <div className={classes.inputWrapper}>
        <Input
          label="Email"
          value={email}
          setValue={setEmail}
          placeholder="Email address"
        />
        <Dropdown
          label="Select Role"
          items={["STUDENT", "TEACHER"]}
          isActive={showDropdown}
          setIsActive={setShowDropdown}
          selectedValue={selectedRole}
          onSelect={(val) => setSelectedRole(val)}
        />
        <Button
          wFull
          onClick={handleVerificationCode}
          disabled={loading}
          loading={loading}
        >
          {loading ? "Processing..." : "Reset Password"}
        </Button>
      </div>
    </div>
  );
};

export default EnterEmail;
