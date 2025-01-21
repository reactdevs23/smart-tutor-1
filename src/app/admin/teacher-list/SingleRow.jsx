"use client";
import { useState } from "react";
import classes from "./TeacherList.module.css";
import clsx from "clsx";
import { Dropdown, Text } from "@/components/common";
import { IoIosMore } from "react-icons/io";
import Modal from "@/components/common/Modal/Modal";
import AreYouSure from "@/components/Modal/AreYouSure/AreYouSure";
import Successfull from "@/components/Modal/Successfull/Successfull";
import { remove } from "../../../../lib/api"; // API call for deletion
import { banner } from "@/images";
import EditingModal from "@/components/Modal/Teacher/EditingModal/EditingModal";

const actionsName = ["edit", "delete"];

const SingleRow = ({
  id,
  name,
  img,
  email,
  salary,
  availibility,
  medium,
  subjects,
  classes: classList,
  description,
  curriculum_type,
  onDeleteSuccess, // Callback function to update parent list
  onEdit,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [actionName, setActionName] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Handle deletion logic
  const handleDelete = async () => {
    try {
      setDeleting(true); // Show loading state
      const response = await remove(`/api/teacher/${id}`); // API call to delete teacher
      if (response.status === 200) {
        setDeleted(true); // Show success modal
        onDeleteSuccess(id); // Notify parent to remove teacher from the list
        setActionName(null); // Close dropdown
      } else {
        throw new Error("Failed to delete teacher");
      }
    } catch (err) {
      console.error("Error deleting teacher:", err);
      alert("Error deleting teacher. Please try again."); // Show error notification
    } finally {
      setDeleting(false); // Reset loading state
    }
  };

  return (
    <>
      <tr>
        <td>
          <div className={classes.item}>
            <img
              src={img || banner.src} // Default avatar if no image
              alt={name}
              className={classes.profileImg}
            />
            <Text sm bold>
              {name || "N/A"}
            </Text>
          </div>
        </td>
        <td>
          <div className={classes.item}>
            <Text sm semiBold>
              <a href={`mailto:${email}`}>{email || "N/A"}</a>
            </Text>
          </div>
        </td>
        <td>
          <Text sm semiBold>
            {salary ? `${salary} TK` : "N/A"}
          </Text>
        </td>
        <td>
          <Text
            xs
            bold
            className={clsx(
              availibility ? classes.available : classes.notAvailable
            )}
          >
            {availibility ? "Available" : "Not Available"}
          </Text>
        </td>
        <td>
          <Text sm semiBold>
            {curriculum_type || "N/A"}
          </Text>
        </td>
        <td>
          <div className={classes.list}>
            {subjects?.length ? (
              subjects.map((item, id) => (
                <Text sm semiBold key={id}>
                  {item} {id < subjects.length - 1 && ", "}
                </Text>
              ))
            ) : (
              <Text sm semiBold>
                N/A
              </Text>
            )}
          </div>
        </td>
        <td>
          <div className={classes.list}>
            {classList?.length ? (
              classList.map((item, id) => (
                <Text sm semiBold key={id} className={classes.myClass}>
                  {item}
                  {id < classList.length - 1 && ", "}
                </Text>
              ))
            ) : (
              <Text sm semiBold>
                N/A
              </Text>
            )}
          </div>
        </td>
        <td>
          <Dropdown
            type2
            items={actionsName}
            isActive={showDropdown}
            setIsActive={setShowDropdown}
            selectedValue={actionName}
            onSelect={(val) => setActionName(val)}
          >
            <IoIosMore className={classes.moreButton} />
          </Dropdown>

          {/* Modal for Editing */}
          <Modal
            isActive={actionName === "edit"}
            onClose={() => setActionName(null)}
            heading="Editing Modal"
          >
            <EditingModal
              onEdit={(data) => {
                setActionName(null);
                onEdit(data);
              }}
              id={id}
              currentName={name}
              img={img}
              currentSallary={salary}
              currentSubjects={subjects}
              currentDescription={description}
              currentClassList={classList}
              currentEmail={email}
              currentAvailability={availibility}
              currentMedium={medium}
              currentCurriculumType={curriculum_type}
            />
          </Modal>

          {/* Modal for Delete Confirmation */}
          <AreYouSure
            isActive={actionName === "delete"}
            onDelete={handleDelete} // Trigger delete logic
            onClose={() => setActionName(null)}
            heading="Delete"
            title="Are you sure you want to delete this teacher?"
          />

          {/* Success Modal */}
          <Successfull
            isActive={deleted}
            onClose={() => setDeleted(false)}
            heading="Successfully Deleted"
          />
        </td>
      </tr>
    </>
  );
};

export default SingleRow;
