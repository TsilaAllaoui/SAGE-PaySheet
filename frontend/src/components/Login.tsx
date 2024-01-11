import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
  background-image: url("../../images/auth-bg.png");
`;

const LoginFormContainer = styled.form`
  width: 25%;
  height: 75%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 25%;
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
    }
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }

  input {
    width: 75%;
    padding: 12px;
    margin-bottom: 16px;
    border: 2px solid black;
    border-radius: 4px;
    background: whitesmoke;
    transition: border 250ms;

    &:hover {
      border: 2px solid grey;
      cursor: pointer;
    }

    &:focus {
      outline: none;
      cursor: text;
    }
  }

  button {
    width: 150px;
    padding: 10px;
    background-color: ${({ theme }) => theme.login.button.background};
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.login.button.hover};
    }
  }
`;

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("auth/login", {
        username,
        password,
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        navigate("/paysheets");
      })
      .catch((err) => {
        console.log("Error when authenticating");
        console.log(err);
      });
  };

  return (
    <LoginContainer>
      <LoginFormContainer onSubmit={handleSubmit}>
        <div className="header">
          <img src="../public/paysheet.svg" alt="logo" />
          <h2>PaySheet</h2>
        </div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </LoginFormContainer>
    </LoginContainer>
  );
};
