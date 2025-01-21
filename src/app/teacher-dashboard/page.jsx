"use client";

import Header from "@/components/Athentication/Header/Header";
import {
  Button,
  Input,
  MultipleChoice,
  Text,
  Input as TextArea,
} from "@/components/common";
import classes from "./TeacherDashboard.module.css";
import { useState, useEffect } from "react";
import { patch } from "../../../lib/api";
import { banner, errorImg, uploadImg } from "@/images";
import clsx from "clsx";
import Successfull from "@/components/Modal/Successfull/Successfull";

// Constants for available options
const availibility = ["Yes", "No"];
const mediums = ["Bangla", "English", "Religious Studies"];
const subjectList = ["Bangla", "English", "Physics", "Chemistry"];
const allclasses = ["class 8", "class 9", "class 10", "HSC-1st year"];

// Function to handle updating teacher data
const updateTeacherData = async (id, updatedData) => {
  try {
    if (updatedData?.availability === "No") {
      updatedData.availibility = false;
    }

    if (updatedData?.availability === "Yes") {
      updatedData.availibility = true;
    }
    delete updatedData["availability"];

    if (updatedData?.salary) {
      updatedData.salary = parseInt(updatedData?.salary);
    }

    console.log("Sending PATCH request with data:", updatedData);
    const response = await patch(`/api/teacher/${id}`, updatedData);

    console.log("Response from API:", response);

    if (response.status !== 200) {
      throw new Error(
        `Failed to update teacher data. Status: ${response.status}`
      );
    }

    return response?.data?.data;
  } catch (error) {
    console.error("Error updating teacher data:", error);
    throw error;
  }
};

const TeacherDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAvailable, setIsAvailable] = useState("");
  const [medium, setMedium] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [classLists, setClassLists] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTeacherId(parsedData.id || ""); // Get teacher ID from localStorage
      setName(parsedData.name || "");
      setEmail(parsedData.email || "");
      setSalary(parsedData.salary || "");
      setDescription(parsedData.description || "");
      setIsAvailable(parsedData.availability || "");
      setMedium(parsedData.curriculum_type || "");
      setSubjects(parsedData.subjects || []);
      setClassLists(parsedData.classes || []);
      setSelectedImage(parsedData.profile_picture || null); // Load image from localStorage
      setPreviewUrl(parsedData.profile_picture || null); // Set preview
    }
  }, []);

  // Convert image file to base64
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10485760) {
      alert("File size exceeds 10MB. Please select a smaller file.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      name,
      email,
      salary,
      description,
      availability: isAvailable,
      curriculum_type: medium,
      subjects,
      classes: classLists,
      profile_picture: selectedImage,
    };

    try {
      const updatedResponse = await updateTeacherData(teacherId, updatedData);

      // Update localStorage
      const updatedLocalStorageData = {
        ...JSON.parse(localStorage.getItem("teacherData") || "{}"),
        ...updatedResponse,
      };
      localStorage.setItem(
        "teacherData",
        JSON.stringify(updatedLocalStorageData)
      );

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating data:", error);
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
          info="Manage your profile and preferences"
        />
        <div className={classes.inputWrapper}>
          <Input
            name="name"
            type="text"
            label="Full Name"
            value={name}
            setValue={setName}
            placeholder="Enter your full name"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            value={email}
            setValue={setEmail}
            placeholder="Enter your Email"
          />
          <Input
            name="salary"
            type="number"
            label="Salary"
            value={salary}
            setValue={setSalary}
            placeholder="Enter your salary"
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
            options={availibility}
            selected={isAvailable}
            setSelected={setIsAvailable}
            label="Availability"
            name="availability"
          />
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
            selected={classLists}
            setSelected={setClassLists}
            label="Select Classes"
            allowMultiple
            name="classes"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <Successfull
        heading="Data Uploaded Succesfully"
        info="We’ve successfully Upload your Data. Enjoy your experience with Smart-Tutor."
        isActive={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
        }}
        backToText="Back"
        to="/teacher-dashboard"
      />{" "}
      <Successfull
        heading="Data Upload Failed!"
        info="We encountered an issue while uploading your data. Please try again ."
        isActive={showErrorModal}
        img={errorImg}
        onClose={() => {
          setShowErrorModal(false);
        }}
        backToText="Back"
        to="/teacher-dashboard"
      />
    </>
  );
};

export default TeacherDashboard;
