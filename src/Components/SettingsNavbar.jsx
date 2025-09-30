import { ArrowLeft, Scroll, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SettingsNavbar() {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setScroll]);
  return (
    <Nav scroll={scroll}>
      <NavContainer>
        <NavDiv>
          <Arrow size={20} onClick={() => navigate(-1)} />
          <SettingsDiv>
            <Settings size={20} />
            Settings
          </SettingsDiv>
        </NavDiv>
      </NavContainer>
    </Nav>
  );
}

const Nav = styled.nav`
  top: 0;
  z-index: 900;
  position: fixed;
  width: 100%;
  padding: 1rem;
  color: #283b89;
  height: 59px;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  background-color: ${({ scroll }) =>
    scroll ? "rgba(0,0,0,0,0)" : "rgba(0,0,0,0,0)"};
  backdrop-filter: ${({ scroll }) => (scroll ? "blur(6px)" : "none")};
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
  color: ${({ scroll }) => (scroll ? "white" : "#283b89")};
`;
const SettingsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  margin-left: -10px;
`;
const Arrow = styled(ArrowLeft)`
  &:hover {
    cursor: pointer;
  }
`;
export default SettingsNavbar;
