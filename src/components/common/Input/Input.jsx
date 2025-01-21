"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

import classes from "./Input.module.css";
import clsx from "clsx";
// import { eyeIcon } from "../../../images";

const Input = ({
  value,
  setValue,
  search,
  placeholder,
  onKeyDown,
  type,
  className,
  readonly,
  noIcon,
  label,
  name,
  textarea,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={classes.wrapper}>
      {label && (
        <label htmlFor="input" className={classes.label}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          classes.inputContainer,

          className,

          search && classes.searchIconInputContainer
        )}
      >
        {textarea && (
          <textarea
            name={name}
            id=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={classes.input}
            placeholder={placeholder}
            required
            readOnly={readonly}
            rows={1}
            cols={10}
          ></textarea>
        )}
        {search && !noIcon && <CiSearch className={classes.searchIcon} />}
        {!textarea && (
          <input
            name={name}
            id="input"
            type={showPassword ? "text" : type ? type : "text"}
            onKeyDown={onKeyDown && onKeyDown}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={classes.input}
            placeholder={placeholder}
            required
            readOnly={readonly}
          />
        )}
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                className={classes.eye}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <FaRegEyeSlash
                className={classes.eye}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </>
        )}
        {search && value && (
          <MdClose className={classes.close} onClick={() => setValue("")} />
        )}
      </div>
    </div>
  );
};

export default Input;
