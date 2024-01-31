import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../api";
import { Paysheet, User } from "../types";
import { StyledHeader } from "./AllUser";
import ExportXlsxButton from "./ExportXlsxButton";
import UserPaysheetList from "./UserPaysheetList";

const schema = [
  {
    column: "Salaire de base",
    type: Number,
    value: (paysheet: Paysheet) => paysheet.baseSalary,
  },
  {
    column: "Avance sur salaire",
    type: Number,
    value: (paysheet: Paysheet) => paysheet.advanceOnSalary,
  },
  {
    column: "Salaire restant",
    type: Number,
    value: (paysheet: Paysheet) =>
      paysheet.baseSalary - paysheet.advanceOnSalary,
  },
  {
    column: "Date",
    type: Date,
    format: "dd/mm/yyyy",
    value: (paysheet: Paysheet) => new Date(paysheet.date),
  },
];

const StyledPaysheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (width <= 480px) {
    margin-top: 2rem;
  }
  @media (480px <= width <= 768px) {
    margin-top: 2rem;
  }
`;

function Paysheets() {
  let body = document.querySelector("body") as HTMLBodyElement;
  const [user, setUser] = useState<User>({
    id: "",
    lastName: "",
    name: "",
    role: "",
    username: "",
  });
  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    api
      .get("user/" + userId)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
    api
      .get("paysheet/" + userId)
      .then((res) => setPaysheets(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>{user.name + " " + user.lastName}</span>
        {body.clientWidth <= 1024 ? null : (
          <div style={{ width: "2rem" }}></div>
        )}
        <ExportXlsxButton
          schema={schema}
          data={paysheets}
          fileName={user.name + "_" + user.lastName}
        />
      </StyledHeader>
      <StyledPaysheetContainer>
        <UserPaysheetList
          paysheets={paysheets}
          setPaysheets={setPaysheets}
          userId={localStorage.getItem("userId")!}
        />
      </StyledPaysheetContainer>
    </>
  );
}

export default Paysheets;
