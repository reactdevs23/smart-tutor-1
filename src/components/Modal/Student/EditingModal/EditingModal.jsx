"use client";

import Header from "@/components/Athentication/Header/Header";
import {
  Button,
  Input,
  MultipleChoice,
  Text,
  Input as TextArea,
} from "@/components/common";
import classes from "./EditingModal.module.css";
import { useState } from "react";
import { banner, uploadImg } from "@/images";
import clsx from "clsx";
import { patch } from "../../../../../lib/api";

const mediums = ["Bangla", "English", "Religious Studies"];
const subjectList = ["Bangla", "English", "Physics", "Chemistry"];
const allclasses = ["class 8", "class 9", "class 10", "HSC-1st year"];

const EditingModal = ({
  id,
  currentName,
  currentEmail,
  currentSallary,
  currentDescription,
  currentImg,
  currentAvailability,
  currentMedium,
  currentSubjects,
  currentClass,
  onEdit,
  multipleClass,
}) => {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [sallary, setSallary] = useState(currentSallary);
  const [description, setDescription] = useState(currentDescription);
  const [selectedImage, setSelectedImage] = useState(currentImg);
  const [previewUrl, setPreviewUrl] = useState();
  const [medium, setMedium] = useState(currentMedium);
  const [subjects, setSubjects] = useState(currentSubjects || []);
  const [myClassName, setMyClassName] = useState(currentClass);
  const [loading, setLoading] = useState(false); // Add loading state

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
      setPreviewUrl(reader.result);
      setSelectedImage(reader.result); // Set the selected image base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true during submission

    const updatedData = {
      name,
      email,
      sallary,
      description,
      profile_picture: selectedImage,
      curriculum_type: medium,
      subjects,
      class: myClassName,
    };

    try {
      const response = await patch(`/api/student/${id}`, updatedData);

      if (response.status === 200) {
        alert("Profile updated successfully!");
        onEdit(updatedData);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    } finally {
      setLoading(false); // Reset loading to false after submission
    }
  };

  return (
    <section className={clsx(classes.wrapper)}>
      <div className={classes.bannerContainer}>
        <img src={banner.src} alt="#" className={classes.banner} />
      </div>
      <Header
        heading="Your Info"
        info="Find the right students in your areas"
      />
      <form className={classes.inputWrapper} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          label="Full Name"
          value={name}
          setValue={setName}
          placeholder="Enter your full name "
        />
        <Input
          name="email"
          type="email"
          label="Email"
          value={email}
          setValue={setEmail}
          placeholder="Enter your Email "
        />
        <TextArea
          textarea
          name="description"
          type="text"
          label="Description"
          value={description || ""}
          setValue={setDescription}
          placeholder="Enter your Description "
        />
      </form>
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
          name="medium-selection"
        />
        <MultipleChoice
          options={subjectList}
          selected={subjects}
          setSelected={setSubjects}
          label="Select Subjects"
          allowMultiple={true}
          name="subject-selection"
        />
        <MultipleChoice
          options={allclasses}
          selected={myClassName}
          setSelected={setMyClassName}
          label="Select Class"
          name="class-selection"
        />
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        loading={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </section>
  );
};

export default EditingModal;
