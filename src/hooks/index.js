import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
export const handleKeyDown = (event) => {
  if (
    !(
      /[0-9]/.test(event.key) ||
      event.key === "Backspace" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "."
    )
  ) {
    event.preventDefault();
  }
};
export const nameInitial = (name) => {
  const parts = name.split(" ");
  if (parts.length < 2) return name; // return the original name if it's not in "Firstname Lastname" format

  const firstNameInitial = parts[0].charAt(0);
  const lastNameInitial = parts[1].charAt(0);

  return `${firstNameInitial}${lastNameInitial}`;
};
export const formatName = (name) => {
  const parts = name.split(" ");
  if (parts.length < 2) return name; // return the original name if it's not in "Firstname Lastname" format

  const firstName = parts[0];
  const lastNameInitial = parts[1].charAt(0);

  return `${firstName} ${lastNameInitial}.`;
};
