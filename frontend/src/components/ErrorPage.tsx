import styled from "styled-components";
import { HiOutlineShieldExclamation } from "react-icons/hi";
import { StyledHeader } from "./AllUser";
import { useNavigate } from "react-router-dom";

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

  div {
    margin-top: 5rem;
    color: grey;
    cursor: pointer;
  }
`;

function ErrorPage() {
  const navigate = useNavigate();
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
        <div onClick={() => navigate("/login")}>Fermer</div>
      </StyledErrorPage>
    </>
  );
}

export default ErrorPage;
