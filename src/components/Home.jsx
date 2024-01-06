import { useState } from "react";
import { useLocation } from "react-router-dom";

import { userData } from "../util/user";
import Header from "./Header";

function Home() {
  const location = useLocation();
  const studentData = location?.state ?? userData;

  const [data, setData] = useState(studentData);
  const [formErrors, setFormErrors] = useState(userData);

  const validateData = () => {
    let errors = {};
    for (const key in data) {
      if (!data[key]) {
        errors[key] = `${key} is required !!`;
      }
    }
    setFormErrors(errors);
  };
  const handleSubmit = () => {
    if (Object.keys(formErrors).length === 0) {
      switch (location.pathname) {
        case `/students/${location?.state?._id}`:
          fetch(
            `${import.meta.env.VITE_URL}/students/${location?.state?._id}`,
            {
              method: "PUT",
              body: JSON.stringify(data),
              headers: {
                "content-type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => console.log(data));
          break;
        case `/add`:
          fetch(`${import.meta.env.VITE_URL}/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
          break;

        default:
          throw Error("Something went wrong !!");
      }
    }
  };

  const onRegister = (e) => {
    e.preventDefault();
    validateData();
    handleSubmit();
    setData(userData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <>
      <Header />
      <form
        className="student-form"
        onSubmit={onRegister}
        onBlur={() => validateData(data)}
      >
        <label htmlFor="">Full Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={data?.name}
        />
        <span className="error-msg">{formErrors?.name}</span>

        <label htmlFor="">Father Name</label>
        <input
          type="text"
          name="father"
          onChange={handleChange}
          value={data?.father}
        />
        <span className="error-msg">{formErrors?.father}</span>

        <label htmlFor="">Mother Name</label>
        <input
          type="text"
          name="mother"
          onChange={handleChange}
          value={data?.mother}
        />
        <span className="error-msg">{formErrors?.mother}</span>

        <label htmlFor="">Mobile Number</label>
        <input
          type="number"
          name="phone"
          onChange={handleChange}
          value={data?.phone}
        />
        <span className="error-msg">{formErrors?.phone}</span>

        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={data?.email}
        />
        <span className="error-msg">{formErrors?.email}</span>

        <label htmlFor="">Address</label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={data?.address}
        />
        <span className="error-msg">{formErrors?.address}</span>

        <button type="submit" className="register">
          Register
        </button>
      </form>
    </>
  );
}

export default Home;
