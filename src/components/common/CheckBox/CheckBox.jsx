import clsx from "clsx";
import classes from "./CheckBox.module.css";

import Text from "../Text/Text";

const Checkbox = ({ className, label, checked, setChecked, ...rest }) => {
  return (
    <label className={clsx(className, classes.container)}>
      <Text base300 base>
        {label}
      </Text>
      <input
        type="checkbox"
        {...rest}
        checked={checked}
        onChange={() => {
          setChecked((prev) => !prev);
          localStorage.setItem("agreeToTerms", !checked);
        }}
      />
      <span className={classes.checkmark}></span>
    </label>
  );
};

export default Checkbox;
