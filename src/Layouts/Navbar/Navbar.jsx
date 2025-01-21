"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowUp, IoIosArrowDown, IoMdClose } from "react-icons/io";
import { AiOutlineAlignRight } from "react-icons/ai";
import { Button, Dropdown, Text } from "@/src/components/common";
import { authenticationImg, logo } from "@/src/images";
import clsx from "clsx";
import classes from "./Navbar.module.css";
import { ROLES } from "@/lib/constant";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const pathname = usePathname();

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 90);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define navigation items for each user role
  const adminNavItems = [
    { navItem: "Teachers", to: "/admin/teacher-list" },
    { navItem: "Students", to: "/admin/student-list" },
  ];

  const studentNavItems = [
    { navItem: "Dashboard", to: "/student-dashboard" },
    { navItem: "Teachers", to: "/teacher-list" },
  ];

  const teachersNavItems = [
    { navItem: "Dashboard", to: "/teacher-dashboard" },
    { navItem: "Students", to: "/student-list" },
  ];

  // Dynamically set the nav items based on user role
  const navItems =
    userRole === ROLES.ADMIN
      ? adminNavItems
      : userRole === ROLES.STUDENT
      ? studentNavItems
      : userRole === ROLES.TEACHER
      ? teachersNavItems
      : [];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    console.log(`role ${userData}`);
    if (userData) {
      setIsLoggedIn(true);
      setUserRole(userData?.role);
      setUserName(userData?.name);
      setUserImg(userData?.propfile_picture);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");

    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <div
      className={clsx(
        classes.wrapper,
        isScrolled && classes.wrapperBg // Adding background on scroll
      )}
    >
      <header className={clsx(classes.header)}>
        {/* Logo Link */}
        <Link href="/" onClick={() => setSidebar((prev) => !prev)}>
          <img src={logo.src} alt="Logo" className={classes.logo} />
        </Link>

        {/* Navigation items */}
        <div className={clsx(classes.navItems, sidebar && classes.sidebar)}>
          {isLoggedIn &&
            navItems.map((el, i) => (
              <Link
                key={i}
                href={el.to}
                onClick={() => setSidebar(false)} // Close sidebar on navigation click
                className={clsx(
                  classes.navItem,
                  pathname === el.to && classes.navActive // Highlight active nav item
                )}
              >
                {el.navItem}
              </Link>
            ))}

          {/* User authentication section (login/logout) */}
          <div className={classes.buttonContainer}>
            {isLoggedIn ? (
              <Dropdown
                type2
                items={["Logout"]}
                isActive={showDropdown}
                setIsActive={setShowDropdown}
                onSelect={handleLogout} // Handle logout action
              >
                <div className={classes.userContainer}>
                  <img
                    src={userImg ? userImg : authenticationImg.src}
                    alt="User"
                    className={classes.userImg}
                  />
                  <div>
                    <Text sm font600>
                      {userName}
                    </Text>
                    <Text xs className={classes.loginAs}>
                      {userRole} {/* Display role (admin, student, etc.) */}
                    </Text>
                  </div>
                  {showDropdown ? (
                    <IoIosArrowUp className={classes.upArrow} />
                  ) : (
                    <IoIosArrowDown className={classes.downArrow} />
                  )}
                </div>
              </Dropdown>
            ) : (
              <>
                {/* Login and Signup buttons */}
                <Button
                  btnPrimary={pathname === "/login"}
                  primitive50={pathname !== "/login"}
                  className={clsx(classes.button)}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  primitive50={pathname !== "/sign-up" && pathname === "/login"}
                  btnPrimary={pathname !== "/login"}
                  className={classes.button}
                  to="/sign-up"
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Hamburger icon for mobile */}
        <div className={classes.iconContainer}>
          {sidebar ? (
            <IoMdClose
              className={classes.icon}
              onClick={() => setSidebar((prev) => !prev)} // Close sidebar
            />
          ) : (
            <AiOutlineAlignRight
              className={clsx(classes.icon, classes.hamburger)}
              onClick={() => setSidebar((prev) => !prev)} // Open sidebar
            />
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
