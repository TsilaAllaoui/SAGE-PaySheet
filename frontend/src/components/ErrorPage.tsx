import { HiOutlineShieldExclamation, HiOutlineX } from "react-icons/hi";
import styled from "styled-components";
import { StyledHeader } from "./AllUser";

const StyledErrorPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 5rem;
  margin-top: 5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: large;
  text-align: center;

  svg {
    font-size: 150px;
    color: grey;
  }

  .cross {
    color: grey;
    cursor: pointer;
    margin-top: 5rem;
    font-size: xx-large;
  }
`;

function ErrorPage() {
  return (
    <>
      <StyledHeader>
        <div className="image">
          <img src="..//paysheet.svg" alt="logo" />
        </div>
        <span>Erreur</span>
        <div style={{ width: "30%" }}></div>
      </StyledHeader>
      <StyledErrorPage>
        Vous ne pouvez pas accéder à cette URL
        <HiOutlineShieldExclamation />
        <HiOutlineX className="cross" onClick={() => window.history.back()} />
      </StyledErrorPage>
    </>
  );
}

export default ErrorPage;
