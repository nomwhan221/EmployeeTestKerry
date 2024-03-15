import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import moment from "moment"; // Install moment.js

const Users = () => {
  const [users, setUsers] = useState([]);
  // const [page, setPage] = useState(1);
  // const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    // axios
    //   .get("https://localhost:7107/api/Employees")
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    (async () => {
      const { data } = await axios.get(`Employees`);
      setUsers(data);
      //   setLastPage(data.meta.last_page);
      console.log(data);
    })();
  }, []);

  // const next = () => {
  //   if (page < lastPage) {
  //     setPage(page + 1);
  //   }
  // };

  // const prev = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };

  const del = async (id: string) => {
    if (window.confirm("Are you sure you want delete")) {
      await axios.delete(`Employees/${id}`);
      setUsers(users.filter((u: User) => u.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/users/create" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>

      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Name en</th>
              <th scope="col">IDCard</th>
              <th scope="col">StartDate</th>
              <th scope="col">EndDate</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.fName_th} {user.lName_th}
                  </td>
                  <td>
                    {user.fName_en} {user.lName_en}
                  </td>
                  <td>{user.idCard}</td>
                  <td>
                    {user.startDatetime !== null
                      ? moment(user.startDatetime).format("MM-DD-YYYY")
                      : ""}
                  </td>
                  <td>
                    {user.endDatetime !== null
                      ? moment(user.endDatetime).format("MM-DD-YYYY")
                      : ""}
                  </td>
                  <td>{user.status ? "active" : "inactive"}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/users/${user.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <a
                        href="#"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(user.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={prev} href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={next} href="#">
              Next
            </a>
          </li>
        </ul>
      </nav> */}
    </Wrapper>
  );
};

export default Users;
