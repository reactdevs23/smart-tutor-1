"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import classes from "./StudentList.module.css";
import { banner } from "@/images";
import { ROLES } from "../../../../lib/constant"; // Assuming you have a constant for roles

import SingleRow from "./SingleRow";
import Header from "@/components/Athentication/Header/Header";
import { get } from "../../../../lib/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data on component mount
  const fetchStudents = async () => {
    try {
      const response = await get(`/api/list/${ROLES.STUDENT}`);
      if (response?.status === 200) {
        setStudents(response.data.data); // Assuming the response contains students in `data`
      } else {
        throw new Error(`Error: ${response?.statusText || "Failed to fetch"}`);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student by id
  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  // Edit student details (update student data)
  const handleEditStudent = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  return (
    <section className={clsx(classes.wrapper, "container")}>
      <Header heading="Student List" info="All the Students" />

      {/* Display loading indicator */}
      {loading && <p>Loading students...</p>}

      {/* Display error message */}
      {error && <p>Error: {error}</p>}

      {/* Display student table only if data is available */}
      {!loading && !error && (
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Medium</th>
                <th>Description</th>
                <th>Subjects</th>
                <th>Classes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <SingleRow
                    key={student.id}
                    {...student}
                    onDelete={handleDeleteStudent} // Pass delete handler to the child
                    onEdit={handleEditStudent} // Pass edit handler to the child
                    fetchStudents={fetchStudents} // Pass fetchStudents to SingleRow
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default StudentList;
