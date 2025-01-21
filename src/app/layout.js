"use client";
import Navbar from "@/src/Layouts/Navbar/Navbar";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Successfull from "../components/Modal/Successfull/Successfull";
import { checkEmailImg as successImg } from "../images";

export default function RootLayout({ children }) {
  const path = usePathname();
  const router = useRouter();
  // const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   if (userData && userData.role) {
  //     setUserRole(userData.role); // Set user role if found
  //   } else {
  //     // If no role exists in localStorage, redirect to home page
  //     router.push("/");
  //   }
  // }, [router]);

  // useEffect(() => {
  //   if (userRole) {
  //     // Define restricted paths for each role
  //     const roleRestrictions = {
  //       STUDENT: ["/student-list", "/admin"],
  //       TEACHER: ["/teacher-list", "/admin"],
  //       ADMIN: ["/student-list", "/teacher-list"],
  //     };

  //     // Check if the current path is restricted for the user role
  //     if (
  //       roleRestrictions[userRole] &&
  //       roleRestrictions[userRole].includes(path)
  //     ) {
  //       router.push("/"); // Redirect to home page or any other default page
  //     }
  //   }
  // }, [path, userRole, router]);

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        {/* {showConfirmationModal && (
          <Successfull
            isActive={showConfirmationModal}
            onClose={() => setShowConfirmationModal((prev) => !prev)}
            heading="Email Verification Successful"
            to="/"
            img={successImg}
          />
        )} */}
      </body>
    </html>
  );
}
