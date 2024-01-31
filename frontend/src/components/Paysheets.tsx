import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../api";
import { Paysheet, User } from "../types";
import { StyledHeader } from "./AllUser";
import Sidebar from "./Sidebar";
import UserPaysheetList from "./UserPaysheetList";
import { PaysheetSchema } from "../schemas/paysheetSchema";

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
  const [user, setUser] = useState<User>({
    id: "",
    lastName: "",
    name: "",
    role: "",
    username: "",
  });
  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);
  const [toggleButtons, setToggleButtons] = useState(false);

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
        <div className="image">
          <img
            src="..//paysheet.svg"
            alt=""
            onClick={() => setToggleButtons((toggleButtons) => !toggleButtons)}
          />
        </div>
        <span>{user.name + " " + user.lastName}</span>
        <Sidebar
          schema={PaysheetSchema}
          data={paysheets}
          toggle={toggleButtons}
          setToggle={setToggleButtons}
          fileName={user.name + "_" + user.lastName + ".xlsx"}
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
