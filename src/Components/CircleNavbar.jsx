import { ArrowLeft, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function CircleNavbar() {
  const navigate = useNavigate();
  return (
    <Nav>
      <NavContainer>
        <NavDiv>
          <Navigate size={20} onClick={() => navigate(-1)} />
          <CircleDiv>
            <UsersRound size={20} />
            Your Circle
          </CircleDiv>
        </NavDiv>
      </NavContainer>
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: rgba(0, 0, 0, 0, 0);
  top: 0;
  z-index: 900;
  position: fixed;
  width: 100%;
  padding: 1rem;
  color: #9ae600;
`;
const NavContainer = styled.div`
  max-width: 1300px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const NavDiv = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
const CircleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
`;
const Navigate = styled(ArrowLeft)`
  cursor: pointer;
`;
export default CircleNavbar;
