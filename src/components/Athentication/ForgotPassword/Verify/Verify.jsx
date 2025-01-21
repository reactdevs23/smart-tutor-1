import React, { useState, useEffect } from "react";
import classes from "./Verify.module.css";
import clsx from "clsx";
import { Button } from "@/components/common";
import Header from "@/components/Athentication/Header/Header";
import { get, post } from "../../../../../lib/api"; // Assuming you're using a helper for API calls

const Verify = ({
  codeSentOn,
  xl2,

  noResend,
  heading,
  info,
  setStep,
}) => {
  const [OTP, setOTP] = useState("");
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [OtpInput, setOtpInput] = useState(null); // Lazy load OTPInput
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Lazy load OTPInput on client side
  useEffect(() => {
    const loadOtpInput = async () => {
      const { default: OTPInput } = await import("otp-input-react");
      setOtpInput(() => OTPInput);
    };
    loadOtpInput();
  }, []);

  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setOtpInvalid(false);

    // Fetch token and role from localStorage
    const tokenAndRole = JSON.parse(localStorage.getItem("tokenEmailRole"));
    const token = tokenAndRole?.token;
    const role = tokenAndRole?.role;

    if (!token || !role) {
      alert("Error: Token or role not found .");
      return;
    }

    try {
      const response = await get(
        `/api/forgot?token=${token}mqr&code=${OTP}&role=${role}`
      );

      if (response.data.status === 200) {
        // Verification successful
        console.log("Verification successful:", response.data);
        setStep((prev) => prev + 1);
      } else {
        // Verification failed
        console.log("Verification failed:", response);
        setOtpInvalid(true);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setOtpInvalid(true);
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();
    setResendLoading(true);

    setRemainingTime(30);
    setCanResend(false);
    const tokenEmailRole = JSON.parse(localStorage.getItem("tokenEmailRole"));
    const email = tokenEmailRole?.email;
    const role = tokenEmailRole?.role;

    if (!role || !email) {
      alert("Error: Role or email not found.");
      return;
    }
    try {
      const response = await post("/api/forgot", {
        email,
        role,
      });

      if (response.data.status === 200) {
        console.log("Code Resend SuccesFully");
      } else {
        alert("Failed to send the password reset email. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      alert(
        "An error occurred during the password reset process. Please try again."
      );
    } finally {
      setResendLoading(false); // Set loading to false after the request completes
    }
  };
  return (
    <div className={classes.wrapper}>
      <Header
        xl2={xl2}
        heading={heading}
        info={info}
        codeSentOn={codeSentOn && codeSentOn}
      />
      <div className={classes.container}>
        <div className={clsx(classes.inputs, classes.noResendInputs)}>
          {OtpInput && (
            <OtpInput
              inputClassName={clsx(
                classes.input,
                otpInvalid && classes.hasError
              )}
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
            />
          )}
        </div>

        {otpInvalid && (
          <div className={classes.helperError}>
            Please enter a valid verification code.
          </div>
        )}

        <div className={clsx(classes.actions, noResend && classes.noResend)}>
          <Button
            onClick={handleVerify}
            size="md"
            btnPrimary
            loading={loading}
            disabled={loading}
          >
            Verify
          </Button>

          {!noResend && (
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={clsx(classes.resend, !canResend && classes.notAllowed)}
            >
              {canResend ? "Resend Code" : `Resend Code (${remainingTime}s)`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
