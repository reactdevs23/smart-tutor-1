import { IoClose } from "react-icons/io5";
import { Heading } from "..";
import classes from "./Modal.module.css";
import clsx from "clsx";

const Modal = ({
  isActive,
  onClose,
  className,

  heading,
  children,
  sm,

  ...rest
}) => {
  return (
    <>
      {isActive && (
        <div
          className={clsx(isActive && classes.active, classes.modalOverlay)}
          onClick={onClose}
        />
      )}
      <div
        className={clsx(
          className,
          isActive && classes.active,

          classes.modal,
          sm && classes.sm,
          "overflow"
        )}
        {...rest}
      >
        <div className={classes.header}>
          <Heading primitive950 semiBold lg>
            {heading}
          </Heading>
          <button className={classes.closeButton} onClick={onClose}>
            <IoClose className={classes.closeIcon} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
