import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Api from "./Api";
import moment from "moment";

export default function UserList() {
  const [data, setData] = useState([]);
  const getUsers = () => {
    console.log("uuuuuuuuu");
    Api.get("/api/v1/user/get").then((res) => {
      const data = res?.data?.userData;
      setData(data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ paddingTop: "20px" }}>
      <div style={{ padding: "30px" }}>
        <h3
          style={{
            fontFamily: "Comfortaa",
            color: "#4b6cb7",
            display: "flex",
            justifyContent: "center",
          }}
        >
          All Users List
        </h3>
        <Table bordered striped hover responsive style={{ overflow: "hidden" }}>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Date Of Birth</th>
              <th>Phone Number</th>
              <th>Assembly</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((list, i) =>
                list.role === "admin" ? null : (
                  <tr>
                    <td>{i}</td>
                    <td>{list?.name}</td>
                    <td>{moment(list?.dob).format("D / MMM / YY")}</td>
                    <td>{list?.phoneNumber}</td>
                    <td>{list?.assembly}</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="8">
                  <h6 className="d-flex justify-content-center">
                    No Records to Display
                  </h6>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
