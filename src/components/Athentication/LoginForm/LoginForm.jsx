"use client";
import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import { Button, Dropdown, Heading, Input, Text } from "@/components/common";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import { ROLES } from "../../../../lib/constant";
import { post } from "../../../../lib/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Teacher");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the sign-in process

    try {
      const response = await post(
        `/api/${selectedRole.toLowerCase()}/auth/signin`,
        {
          email,
          password,
        }
      );

      if (response.data.status === 200) {
        console.log("Sign in successful:", response.data.data);

        // Save the token, role, and name to localStorage
        localStorage.setItem("userData", JSON.stringify(response.data.data));

        // Redirect the user
        window.location.href = "/";
      } else {
        console.error("Unexpected response:", response);
        alert("Sign-in unsuccessful! Please check your email or password.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);

      // Handle specific error for "email not found"
      if (error.response?.data?.message?.toLowerCase().includes("email")) {
        alert("Email not found. Please check your email and try again.");
      } else {
        alert(
          error.response?.data?.message ||
            "Error occurred during sign-in. Please try again."
        );
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.header}>
        <Heading xl3 primitive950 bold>
          Sign In
        </Heading>
        <Text base semiBold primitive600 className={classes.needAnAccount}>
          Access your SmartTutors account with your email and passcode.
        </Text>
      </div>
      <form className={classes.inputWrapper} onSubmit={handleSignIn}>
        <Input
          type="email"
          label="Email"
          value={email}
          setValue={setEmail}
          placeholder="Email"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
        />
        <Dropdown
          label="Select Category"
          items={Object.values(ROLES)}
          isActive={showDropdown}
          setIsActive={setShowDropdown}
          selectedValue={selectedRole}
          onSelect={(val) => setSelectedRole(val)}
        />
        <Button
          transparent
          className={classes.forgotPasword}
          to="/forgot-password"
        >
          Forgot Password
        </Button>
        <Button
          btnPrimary
          base
          type="submit"
          className={classes.submitButton}
          loading={loading}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Signing In..." : "Sign In"} {/* Show loading text */}
        </Button>
      </form>
      <Text primitive600 sm className={classes.or} textCenter>
        or
      </Text>
      <div className={classes.buttonContainer}>
        <Button primitive50 base>
          <FcGoogle className={classes.logo} /> Use Google
        </Button>
        <Button primitive50 base>
          <FaApple className={clsx(classes.logo, classes.appleLogo)} /> Use
          Apple
        </Button>
        <Button primitive50 base className={classes.fbButton}>
          <FaFacebook className={clsx(classes.logo, classes.fbLogo)} /> Use
          Facebook
        </Button>
      </div>
      <Text xs primitive600 className={classes.needAnAccount}>
        Don't have an account?
        <Link className={classes.link} href="/sign-up">
          Sign Up
        </Link>
      </Text>
    </div>
  );
};

export default LoginForm;
