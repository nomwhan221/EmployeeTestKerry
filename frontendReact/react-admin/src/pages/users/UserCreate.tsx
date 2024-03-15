import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import moment from "moment"; // Install moment.js
// import { Role } from "../../models/role";

const UserCreate = () => {
  const [fName_th, setfName_th] = useState("");
  const [lName_th, setlName_th] = useState("");
  const [fName_en, setfName_en] = useState("");
  const [lName_en, setlName_en] = useState("");
  const [status, setStatus] = useState(true);
  const [startDate, setStartdate] = useState("");
  const [endDate, setEnddate] = useState("");
  const [idCard, setIdCard] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Check if the entered value matches the regex pattern for exactly 13 digits
    if (/^\d{0,13}$/.test(value)) {
      setIdCard(value); // Update the state only if the input is valid
      setErrorMessage(null);
    } else {
      setErrorMessage(
        setIdCard.length > 13
          ? "Number must be 13 digits long."
          : "Wrong Id Card"
      ); // Clear error on valid input
    }

    // Validate length immediately
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (errorMessage === null) {
      var id = "";
      await axios
        .post("Employees", {
          id,
          fName_th,
          lName_th,
          fName_en,
          lName_en,
          idCard,
          startDate,
          endDate,
          status,
        })
        .then(function (_response) {
          setRedirect(true);
        })
        .catch((err) => {
          alert(err.response.data);
          console.log(err);
        });
    }
  };

  if (redirect) {
    return <Navigate to="/users" />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            required={true}
            onChange={(e) => setfName_th(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            required={true}
            onChange={(e) => setlName_th(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>First Name (En)</label>
          <input
            className="form-control"
            onChange={(e) => setfName_en(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name (En)</label>
          <input
            className="form-control"
            onChange={(e) => setlName_en(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>ID CARD</label>
          <input
            className="form-control"
            required={true}
            maxLength={13}
            onChange={handleChange}
          />
          {errorMessage && (
            <p style={{ color: "red" }} className="error ">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="mb-3 form-check">
          <label>Status</label>
          {/* <input
            className="form-control"
            type="checkbox"
            checked={status === "1" ? true : false}
            onChange={(e) => setStatus(e.target.value)}
          /> */}
          <input
            className="form-check-input"
            type="checkbox"
            checked={status}
            // required={true}
            readOnly={true}
            // onChange={(e) => setStatus(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Start Date</label>
          <input
            className="form-control"
            required={true}
            onChange={(e) => setStartdate(e.target.value)}
            placeholder="MM-DD-YYYY"
          />
        </div>
        {/* <div className="mb-3">
          <label>EndDate</label>
          <input
            className="form-control"
            onChange={(e) => setEnddate(e.target.value)}
          />
        </div> */}

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default UserCreate;
