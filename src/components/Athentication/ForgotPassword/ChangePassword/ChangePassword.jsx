"use client";
import React, { useState } from "react";
import classes from "./ChangePassword.module.css";
import Header from "@/components/Athentication/Header/Header";
import { Button, Input } from "@/components/common";
import { post } from "../../../../../lib/api"; // Import post API utility

const ChangePassword = ({
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,

  setStep,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Check if newPassword and confirmNewPassword match
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    // Retrieve token and role from localStorage
    const tokenEmailRole = JSON.parse(localStorage.getItem("tokenEmailRole"));
    const token = tokenEmailRole?.token;
    const role = tokenEmailRole?.role;

    if (!role || !token) {
      alert("Error: Role or token not found.");
      setLoading(false);
      return;
    }

    try {
      // Send the request to reset the password
      const response = await post("/api/forgot", {
        token,
        role,
        password: newPassword,
      });

      if (response.data.status === 200) {
        setStep((prev) => prev + 1);
      } else {
        alert("Failed to reset the password. Please try again.");
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
      <Header
        heading="Change Password"
        info="Enter your new password. Ensure your password is strong enough."
      />
      <div className={classes.inputWrapper}>
        <Input
          type="password"
          value={newPassword}
          setValue={setNewPassword}
          placeholder="New password"
        />
        <Input
          type="password"
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
          placeholder="Confirm new password"
        />
        <Button
          wFull
          onClick={handlePasswordReset}
          disabled={loading}
          loading={loading}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
