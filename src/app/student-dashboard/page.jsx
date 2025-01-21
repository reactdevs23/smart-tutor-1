"use client";

import Header from "@/components/Athentication/Header/Header";
import {
  Button,
  Input,
  MultipleChoice,
  Text,
  Input as TextArea,
} from "@/components/common";
import classes from "./StudentDashboard.module.css";
import { useState, useEffect } from "react";
import { patch } from "../../../lib/api";
import { banner, errorImg, uploadImg } from "@/images";
import clsx from "clsx";
import Successfull from "@/components/Modal/Successfull/Successfull";

// Constants for available options
const mediums = ["Bangla", "English", "Religious Studies"];
const subjectList = ["Bangla", "English", "Physics", "Chemistry"];
const allclasses = ["class 8", "class 9", "class 10", "HSC-1st year"];

// Function to handle updating student data
const updateStudentData = async (id, updatedData) => {
  try {
    console.log("Sending PATCH request with data:", updatedData);
    const response = await patch(`/api/student/${id}`, updatedData);

    console.log("Response from API:", response);

    if (response.status !== 200) {
      throw new Error(
        `Failed to update student data. Status: ${response.status}`
      );
    }

    return response?.data?.data;
  } catch (error) {
    console.error("Error updating student data:", error); // Log error
    throw error;
  }
};

const StudentDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [medium, setMedium] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [myClassName, setMyClassName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [profile_picture, setProfilePicture] = useState(null); // Use profile_picture
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  // Load data from localStorage on mount

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStudentId(parsedData.id || ""); // Get student ID from localStorage
      setName(parsedData.name || "");
      setEmail(parsedData.email || "");
      setDescription(parsedData.description || "");
      setMyClassName(parsedData.class || "");
      setMedium(parsedData.curriculum_type || "");
      setSubjects(parsedData.subjects || []);
      setProfilePicture(parsedData.profile_picture || null); // Load profile_picture from localStorage
    }
  }, []);

  // Convert image file to base64
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("Selected file:", file); // Debugging - check the file selected

    if (file.size > 10485760) {
      alert("File size exceeds 10MB. Please select a smaller file.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Convert to base64 string
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log("Image preview URL (base64):", reader.result); // Debugging - check base64 result
      setProfilePicture(reader.result); // Set base64 image string
      setPreviewUrl(reader.result); // Set image preview
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Profile Picture before submit:", profile_picture);
    const updatedData = {
      name,
      email,
      description,
      curriculum_type: medium,
      subjects,
      class: myClassName,
      profile_picture,
    };

    console.log("Updated Data (before submission):", updatedData); // Debugging

    try {
      // Make PATCH API call
      const updatedResponse = await updateStudentData(studentId, updatedData);
      console.log("Updated Response:", updatedResponse); // Check API response

      // Update localStorage with the new data
      const updatedLocalStorageData = {
        ...JSON.parse(localStorage.getItem("userData") || "{}"),
        ...updatedResponse, // Use response from API as the latest data
      };

      console.log("updated data", updatedLocalStorageData);
      localStorage.setItem("userData", JSON.stringify(updatedLocalStorageData));

      // Show success message
      alert("Student data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error); // Log the error
      alert("There was an error updating your data.");
    }
  };

  return (
    <>
      <form
        className={clsx(classes.wrapper, "container")}
        onSubmit={handleSubmit}
      >
        <div className={classes.bannerContainer}>
          <img src={banner.src} alt="#" className={classes.banner} />
        </div>
        <Header
          heading="Your Info"
          info="Find the right students in your areas"
        />
        <div className={classes.inputWrapper}>
          <Input
            name="name"
            type="text"
            label="Full Name"
            value={name}
            setValue={setName}
            placeholder="Enter your full name"
            readonly
          />
          <Input
            readonly
            name="email"
            type="email"
            label="Email"
            value={email}
            setValue={setEmail}
            placeholder="Enter your Email"
          />
          <TextArea
            textarea
            name="description"
            type="text"
            label="Description"
            value={description}
            setValue={setDescription}
            placeholder="Enter your Description"
          />
        </div>

        <div className={classes.uploadImgContainer}>
          {previewUrl && (
            <div className={classes.preview}>
              <img
                src={previewUrl}
                alt="Image Preview"
                className={classes.image}
              />
            </div>
          )}
          <img src={uploadImg.src} alt="#" className={classes.uploadImg} />
          <Text semiBold>
            <label htmlFor="uploadImg" className={classes.label}>
              Drag your file(s) or{" "}
              <span className={classes.highlight}>Browse</span>
            </label>
          </Text>
          <Text primitive700 textCenter>
            Max 10 MB files are allowed
          </Text>
          <input
            id="uploadImg"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={classes.imgInput}
          />
        </div>

        <div className={classes.multipleChoice}>
          <MultipleChoice
            options={mediums}
            selected={medium}
            setSelected={setMedium}
            label="Select Medium"
            name="medium"
          />
          <MultipleChoice
            options={subjectList}
            selected={subjects}
            setSelected={setSubjects}
            label="Select Subjects"
            allowMultiple
            name="subjects"
          />
          <MultipleChoice
            options={allclasses}
            selected={myClassName}
            setSelected={setMyClassName}
            label="Select Class"
            name="classes"
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>{" "}
      <Successfull
        heading="Data Uploaded Succesfully"
        info="We’ve successfully Upload your Data. Enjoy your experience with Smart-Tutor."
        isActive={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
        }}
        backToText="Back"
        to="/student-dashboard"
      />
      <Successfull
        heading="Data Upload Failed!"
        info="We encountered an issue while uploading your data. Please try again ."
        isActive={showErrorModal}
        img={errorImg}
        onClose={() => {
          setShowErrorModal(false);
        }}
        backToText="Back"
        to="/student-dashboard"
      />
    </>
  );
};

export default StudentDashboard;
