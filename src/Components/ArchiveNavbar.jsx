import { Archive, ArrowLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ArchiveNavbar({ setSearch }) {
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
        <NavDiv scroll={scroll}>
          <Arrow size={20} onClick={() => navigate(-1)} />
          <CircleDiv>
            <Archive size={20} />
            Archive
          </CircleDiv>
        </NavDiv>
        <InputDiv scroll={scroll}>
          <SearchIcon size={14} />
          <Input
            scroll={scroll}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </InputDiv>
      </NavContainer>
    </Nav>
  );
}

const Nav = styled.nav`
  top: 0;
  z-index: 900;
  position: fixed;
  width: 100%;
  height: 59px;
  padding: 1rem;
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
const CircleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  margin-left: -10px;
`;
const InputDiv = styled.div`
  color: ${({ scroll }) => (scroll ? "#58d8db" : "#283b89")};
  position: relative;
`;
const Input = styled.input`
  height: 30px;
  border: none;
  border-radius: 50px;
  padding-left: 2rem;
  padding-right: 1rem;
  width: 180px;
  font-size: 1rem;
  font-family: inherit;
  caret-color: ${({ scroll }) => (scroll ? "#58d8db" : "#283b89")};
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    width: 150px;
  }
`;
const SearchIcon = styled(Search)`
  position: absolute;
  left: 10px;
  top: 8px;
`;

const Arrow = styled(ArrowLeft)`
  &:hover {
    cursor: pointer;
  }
`;
export default ArchiveNavbar;
