import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import "../styles/keyframes.css";
import { StyledHeader } from "./Paysheets";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 3rem;

  .user-info {
    margin-top: 5rem;
    width: 60%;
    height: 30%;

    .container {
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15%;
        border-bottom: 2px solid grey;
      }
    }
  }
  .role-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .slider {
      width: 35%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  button,
  .edit-button {
    height: 40px;
    background-color: ${({ theme }) => theme.modifyUser.background};
    width: 120px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 250ms;

    &:hover {
      background-color: ${({ theme }) => theme.modifyUser.hover};
    }
  }

  .spinner {
    font-size: 25px;
    animation: rotate linear infinite 750ms;
  }

  .edit-button {
    background-color: ${({ theme }) => theme.modifyUser.editButton.background};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover {
      background-color: ${({ theme }) => theme.modifyUser.editButton.hover};
    }
  }
`;
const UserInfo = styled.div`
  width: 35%;
  .infos {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    span {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const StyledSlider = styled.div<{ $isAdmin: boolean }>`
  background-color: ${(props) => (props.$isAdmin ? "green" : "grey")};
  border-radius: 16px;
  width: 2rem;
  height: 1rem;
  padding: 1px;
  cursor: pointer;

  .slider-circle {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #f1f1f1;
    transform: ${(props) =>
      props.$isAdmin ? "translateX(0)" : "translateX(100%)"};
    transition: transform 250ms, background-color 250ms;
  }
`;

function ModifyUser() {
  const { id } = useParams();
  const [pending, setPending] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const data = {
      id,
      ...user,
      password: user.password,
    };
    api
      .patch("user", data)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPending(false));
  };

  const handleSlide = () => {
    setIsAdmin(!isAdmin);
  };

  useEffect(() => {
    setUser({
      ...user,
      role: isAdmin ? "ADMIN" : "USER",
    });
  }, [isAdmin]);
  useEffect(() => {
    api.get("user/" + id).then((res) => {
      setUser({
        name: res.data.name,
        lastName: res.data.lastName,
        username: res.data.username,
        password: "********",
        role: res.data.role,
      });
      setIsAdmin(res.data.role == "ADMIN");
    });
  }, []);

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>{user.name + " " + user.lastName}</span>
        <div style={{ width: "2rem" }}></div>
      </StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <UserInfo>
          {!isEdited ? (
            <div className="infos">
              <p>
                <strong>Nom: </strong>
                <span>{" " + user.name}</span>
              </p>
              <p>
                <strong>Prénoms: </strong>
                {" " + user.lastName}
              </p>
              <p>
                <strong>Identifiant: </strong>
                <span>{" " + user.username}</span>
              </p>
            </div>
          ) : (
            <div className="infos">
              <label htmlFor="name">Nom: </label>
              <input
                type="text"
                defaultValue={user.name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.currentTarget.value,
                  })
                }
                id="name"
                name="name"
              />
              <div style={{ width: "1rem" }}></div>
              <label htmlFor="lastName">Prénom(s): </label>
              <input
                type="text"
                defaultValue={user.lastName}
                onChange={(e) =>
                  setUser({
                    ...user,
                    lastName: e.currentTarget.value,
                  })
                }
                id="lastName"
                name="lastName"
              />
              <label htmlFor="username">Identifiant: </label>
              <input
                type="text"
                defaultValue={user.username}
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: e.currentTarget.value,
                  })
                }
                id="username"
                name="username"
              />
              <label htmlFor="password">Mot de passe: </label>
              <input
                type="text"
                defaultValue="********"
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.currentTarget.value,
                  })
                }
                id="password"
                name="password"
              />
            </div>
          )}
          {isEdited ? (
            <div className="role-container">
              <h3>Role:</h3>
              <div className="slider">
                Admin
                <StyledSlider $isAdmin={isAdmin} onClick={handleSlide}>
                  <div className="slider-circle"></div>
                </StyledSlider>
                User
              </div>
            </div>
          ) : null}
        </UserInfo>
        {!isEdited ? (
          <div className="edit-button" onClick={() => setIsEdited(true)}>
            <FiEdit3 />
            <span>Modifier</span>
          </div>
        ) : (
          <button>
            {pending ? (
              <CgSpinner className="spinner" />
            ) : (
              <span>Sauvegarder</span>
            )}
          </button>
        )}
      </StyledForm>
    </>
  );
}

export default ModifyUser;
