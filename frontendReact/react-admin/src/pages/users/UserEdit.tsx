import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import moment from "moment";

const UserEdit = (props: any) => {
  const [fName_th, setfName_th] = useState("");
  const [lName_th, setlName_th] = useState("");
  const [fName_en, setfName_en] = useState("");
  const [lName_en, setlName_en] = useState("");
  const [status, setStatus] = useState(false);
  const [startDate, setStartdate] = useState("");
  const [endDate, setEnddate] = useState("");
  const [idCard, setIdCard] = useState("");
  const [redirect, setRedirect] = useState(false);

  const params = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`Employees/${params.id}`);

      setfName_th(data.fName_th);
      setlName_th(data.lName_th);
      setfName_en(data.fName_en);
      setlName_en(data.lName_en);
      setStatus(data.status);
      setIdCard(data.idCard);

      setStartdate(moment(data.startDatetime).format("MM-DD-YYYY"));

      if (data.endDatetime !== null) {
        setEnddate(moment(data.endDatetime).format("MM-DD-YYYY"));
      }
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    var id = params.id;
    await axios.put(`Employees/${params.id}`, {
      id,
      fName_th,
      lName_th,
      fName_en,
      lName_en,
      idCard,
      startDate,
      endDate,
      status,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/users" />;
  }

  function handleEdit(e: React.ChangeEvent<HTMLInputElement>): void {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            defaultValue={fName_th}
            onChange={(e) => setfName_th(e.target.value)}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            defaultValue={lName_th}
            onChange={(e) => setlName_th(e.target.value)}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label>First Name (En)</label>
          <input
            className="form-control"
            defaultValue={fName_en}
            onChange={(e) => setfName_en(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name (En)</label>
          <input
            defaultValue={lName_en}
            className="form-control"
            onChange={(e) => setlName_en(e.target.value)}
          />
        </div>
        <div className="mb-3 ">
          <label>ID Card</label>
          <input
            className="form-control form-control-plaintext"
            defaultValue={idCard}
            readOnly={true}
          />
        </div>
        <div className="mb-3 form-check">
          <label>Status</label>
          {/* <input
            className="form-control"
            defaultValue={status}
            required={true}
            onChange={(e) => setStatus(e.target.value)}
          /> */}
          <input
            className="form-check-input"
            type="checkbox"
            checked={status}
            onChange={(e) => handleEdit(e)}
            // value={status}
          />
        </div>

        <div className="mb-3">
          <label>Start Date</label>
          <input
            className="form-control"
            value={startDate}
            onChange={(e) => setStartdate(e.target.value)}
            required={true}
            placeholder="MM-DD-YYYY"
          />
        </div>
        <div className="mb-3">
          <label>End Date</label>
          <input
            className="form-control"
            value={endDate}
            onChange={(e) => setEnddate(e.target.value)}
            required={!status ? true : false}
            placeholder="MM-DD-YYYY"
          />
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default UserEdit;
