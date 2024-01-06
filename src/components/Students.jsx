import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "./Header";

const Students = () => {
  const [allStudents, setAllStudents] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/students/`);
    const data = await response.json();
    setAllStudents(data);
  };
  useEffect(() => {
    fetchData();
  }, [allStudents]);

  const editHandler = (student) => {
    const { _id, name, father, mother, phone, email, address } = student;
    navigate(`/students/${_id}`, {
      state: { _id, name, father, mother, phone, email, address },
    });
  };
  const deleteHandler = async (student) => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/students/${student._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    fetchData();
  };
  return (
    <>
      <Header />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Father</TableCell>
              <TableCell>Mother</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allStudents?.map((student) => {
              return (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.father}</TableCell>
                  <TableCell>{student.mother}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell onClick={() => editHandler(student)}>
                    <ModeIcon />
                  </TableCell>
                  <TableCell onClick={() => deleteHandler(student)}>
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Students;
