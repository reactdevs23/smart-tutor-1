"use client";
import React, { useState } from "react";
import classes from "./SignupForm.module.css";

import { Button, Dropdown, Heading, Input, Text } from "@/components/common";
import { post } from "@/lib/api";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import { ROLES } from "../../../../../lib/constant";

const SignupForm = ({ setStep }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Student"); // Default role
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when fetching data

    try {
      const response = await post(
        `api/${selectedRole.toLowerCase()}/auth/signup`,
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log("Signup successful");
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.header}>
        <Heading xl3 primitive950 bold>
          Sign Up
        </Heading>
        <Text base semiBold primitive600 className={classes.needAnAccount}>
          To access the SmartTutors admin panel, register with the following
          information.
        </Text>
      </div>
      <form className={classes.inputWrapper} onSubmit={handleSignup}>
        <Input
          type="text"
          label="Name"
          value={name}
          setValue={setName}
          placeholder="Name"
        />
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
          label="Select Role"
          items={["STUDENT", "TEACHER"]}
          isActive={showDropdown}
          setIsActive={setShowDropdown}
          selectedValue={selectedRole}
          onSelect={(val) => setSelectedRole(val)}
        />

        <Button
          wFull
          base
          type="submit"
          className={classes.submitButton}
          disabled={loading}
          loading={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
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
        Already have an account?
        <Link className={classes.link} href="/login">
          Login
        </Link>
      </Text>
    </div>
  );
};

export default SignupForm;
