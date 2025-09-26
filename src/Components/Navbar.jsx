import { Archive, Settings, UserRoundPlus, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
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
        <LogoDiv scroll={scroll}>Whisper</LogoDiv>
        <NavMenu>
          <NavItem>
            <NavLinkItem to="/settings" scroll={scroll}>
              <Settings size={20} />
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/archive" scroll={scroll}>
              <Archive size={20} />
            </NavLinkItem>
          </NavItem>
          <NavItem>
            <NavLinkItem to="/circle" scroll={scroll}>
              <UserRoundPlus size={20} />
            </NavLinkItem>
          </NavItem>
        </NavMenu>
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
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  background-color: ${({ scroll }) =>
    scroll ? "rgba(0,0,0,0,0)" : "rgba(0,0,0,0,0)"};
  backdrop-filter: ${({ scroll }) => (scroll ? "blur(6px)" : "blur(6px)")};
`;
const NavContainer = styled.div`
  max-width: 1300px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  gap: 0.8rem;
`;
const NavItem = styled.li``;
const LogoDiv = styled.div`
  color: ${({ scroll }) => (scroll ? "#283b89" : "#283b89")};
  font-size: 1.4rem;
`;
const NavLinkItem = styled(NavLink)`
  color: ${({ scroll }) => (scroll ? "#283b89" : "#283b89")};
`;
export default Navbar;
