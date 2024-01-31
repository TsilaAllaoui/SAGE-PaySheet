import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import "../styles/keyframes.css";
import { Paysheet } from "../types";
import AddingPaysheet from "./AddingPaysheet";
import { StyledHeader } from "./AllUser";
import ConfirmPopUp from "./ConfirmPopUp";
import UserInfoSummary from "./UserInfoSummary";
import UserPaysheetList from "./UserPaysheetList";
import Sidebar from "./Sidebar";
import { PaysheetSchema } from "../schemas/paysheetSchema";
import RoleContext from "../contexts/AdminUser";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ModifyUser() {
  const { id } = useParams();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddingPaysheet, setIsAddingPaysheet] = useState(false);
  const [userIndexToDelet, setUserIndexToDelet] = useState(0);
  const roleContext = useContext(RoleContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });

  const [userPaysheets, setUserPaysheets] = useState<Paysheet>({
    id: "",
    userId: id!,
    baseSalary: 0,
    advanceOnSalary: 0,
    date: `${new Date().toLocaleDateString()}`,
  });

  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);
  const [toggleButtons, setToggleButtons] = useState(false);

  const deletePaysheet = (i: number) => {
    api
      .delete("paysheet/" + paysheets[i].id)
      .then(() => {
        api
          .get("paysheet/" + id)
          .then((res) => {
            setPaysheets(res.data);
          })
          .catch((err) =>
            console.log("Error while getting user's paysheets: " + err)
          );
        setConfirmDelete(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUserPaysheets({
      id: "",
      userId: id!,
      baseSalary: 0,
      advanceOnSalary: 0,
      date: `${new Date().toLocaleDateString()}`,
    });
  }, [paysheets]);

  useEffect(() => {
    if (roleContext!.isUserAdmin) {
      api
        .get("user/" + id)
        .then((res) => {
          setUser({
            name: res.data.name,
            lastName: res.data.lastName,
            username: res.data.username,
            password: "********",
            role: res.data.role,
          });
          res.data.role == "ADMIN" ? setIsAdmin(true) : setIsAdmin(false);
        })
        .catch((err) => console.log("Error while getting user: " + err));
      api
        .get("paysheet/" + id)
        .then((res) => {
          setPaysheets(res.data);
        })
        .catch((err) =>
          console.log("Error while getting user's paysheets: " + err)
        );
    } else navigate("/error");
  }, []);

  return (
    <>
      <StyledHeader>
        <div className="image">
          <img
            src="..//paysheet.svg"
            alt="logo"
            onClick={() => setToggleButtons((toggleButtons) => !toggleButtons)}
          />
        </div>
        <span>{user.name + " " + user.lastName}</span>
        <div style={{ width: "30%" }}></div>
        <Sidebar
          schema={PaysheetSchema}
          data={paysheets}
          toggle={toggleButtons}
          setToggle={setToggleButtons}
          fileName={user.name + "_" + user.lastName + ".xlsx"}
        />
      </StyledHeader>
      <StyledContainer>
        <UserInfoSummary
          id={id!}
          user={user}
          setUser={setUser}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
        <UserPaysheetList
          paysheets={paysheets}
          setPaysheets={setPaysheets}
          userId={id!}
          setConfirmDelete={setConfirmDelete}
          setIsAddingPaysheet={setIsAddingPaysheet}
          setUserIndexToDelet={setUserIndexToDelet}
        />
        {isAddingPaysheet ? (
          <AddingPaysheet
            userId={id!}
            setIsAddingPaysheet={setIsAddingPaysheet}
            setPaysheets={setPaysheets}
            setUserPaysheets={setUserPaysheets}
            userPaysheets={userPaysheets}
          />
        ) : null}
        {confirmDelete ? (
          <ConfirmPopUp
            callBackStop={() => setConfirmDelete(false)}
            callBackValidate={() => deletePaysheet(userIndexToDelet)}
          />
        ) : null}
      </StyledContainer>
    </>
  );
}

export default ModifyUser;
