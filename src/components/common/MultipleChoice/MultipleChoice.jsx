"use client";

import React from "react";
import { Text } from "@/components/common";
import classes from "./MultipleChoice.module.css";

const MultipleChoice = ({
  options,
  label,
  selected = [], // Default to an empty array for multiple selection
  setSelected,
  allowMultiple = false,
  name,
}) => {
  const handleOptionChange = (event) => {
    const { value, checked } = event.target;

    if (allowMultiple) {
      if (!Array.isArray(selected)) {
        console.error(
          "Selected value must be an array when allowMultiple is true."
        );
        return;
      }

      // Add or remove value from the array based on checked state
      if (checked) {
        setSelected((prevSelected) => [...prevSelected, value]);
      } else {
        setSelected((prevSelected) =>
          prevSelected.filter((option) => option !== value)
        );
      }
    } else {
      // Single selection
      setSelected(value);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Text className={classes.label}>{label}</Text>
      <div className={classes.options}>
        {options.map((option, index) => (
          <div key={index} className={classes.option}>
            <label className={classes.label}>
              <input
                type={allowMultiple ? "checkbox" : "radio"}
                name={name} // Unique name for radio group
                value={option}
                checked={
                  allowMultiple
                    ? Array.isArray(selected) && selected.includes(option)
                    : String(selected).toLowerCase() === option.toLowerCase()
                }
                onChange={handleOptionChange}
                className={classes.input}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
