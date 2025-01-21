import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Dropdown, Text } from "@/components/common";
import Modal from "@/components/common/Modal/Modal";
import AreYouSure from "@/components/Modal/AreYouSure/AreYouSure";
import Successfull from "@/components/Modal/Successfull/Successfull";
import classes from "./StudentList.module.css";
import { banner } from "@/images";
import { remove } from "../../../../lib/api";
import EditingModal from "@/components/Modal/Student/EditingModal/EditingModal";

// Define possible actions
const actionsName = ["edit", "delete"];

const SingleRow = ({
  id,
  name,
  email,
  description,
  curriculum_type,
  profile_picture,
  subjects = [],
  class: studentClass,
  onDelete, // Function passed from parent to delete student
  onEdit, // Function passed from parent to edit student
  fetchStudents, // Fetch function passed from parent to refetch data
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [actionName, setActionName] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true); // Set deleting state to true to show modal

      // Call API to delete student
      const response = await remove(`/api/student/${id}`); // DELETE request with student’s ID
      if (response.status === 200) {
        setDeleting(false); // Set deleted flag to true on success
        setActionName(null); // Close the dropdown

        // Trigger the parent's onDelete callback to remove the student from the list
        onDelete(id);
      } else {
        throw new Error("Failed to delete Student");
      }
    } catch (err) {
      console.error("Error deleting student:", err);
      setDeleting(false);
      // Optionally, show an error modal or message
    }
  };

  return (
    <>
      <tr>
        <td>
          <div className={classes.item}>
            <img
              src={profile_picture || banner.src} // Show default avatar if no profile picture
              alt={name}
              className={classes.profileImg}
            />
            <Text sm bold>
              {name}
            </Text>
          </div>
        </td>
        <td>
          <Text sm semiBold>
            <a href={`mailto:${email}`}>{email}</a>
          </Text>
        </td>
        <td>
          <Text sm semiBold>
            {curriculum_type || "N/A"}
          </Text>
        </td>
        <td>
          <Text sm semiBold>
            {description || "No description available"}
          </Text>
        </td>
        <td>
          <div className={classes.list}>
            {subjects?.length > 0 ? (
              subjects.map((item, id) => (
                <Text sm semiBold key={id}>
                  {item}
                </Text>
              ))
            ) : (
              <Text sm semiBold>
                No subjects listed
              </Text>
            )}
          </div>
        </td>
        <td>
          <Text sm semiBold>
            {studentClass || "No class assigned"}
          </Text>
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

          <Modal
            isActive={actionName === "edit"}
            onClose={() => setActionName(null)}
            heading="Editing Modal"
          >
            <EditingModal
              id={id}
              onEdit={(updatedData) => {
                setActionName(null);
                onEdit(updatedData); // Call the parent onEdit function
                fetchStudents(); // Refetch the student data after edit
              }}
              currentName={name}
              currentEmail={email}
              currentDescription={description}
              currentCurriculumType={curriculum_type}
              currentSubjects={subjects}
              currentClass={studentClass}
              currentProfilePicture={profile_picture}
              fetchStudents={fetchStudents} // Pass fetchStudents to the modal
            />
          </Modal>

          <AreYouSure
            isActive={actionName === "delete"}
            onDelete={handleDelete} // Call delete function
            onClose={() => setActionName(null)}
            heading="Delete"
            title="Are you sure you want to delete?"
          />

          <Successfull
            isActive={deleting}
            onClose={() => setDeleting(false)}
            heading="Successfully Deleted"
          />
        </td>
      </tr>
    </>
  );
};

export default SingleRow;
