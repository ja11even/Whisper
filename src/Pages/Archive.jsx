import styled from "styled-components";
import ArchiveNavbar from "../Components/ArchiveNavbar";
import { CircleAlert } from "lucide-react";
import { useUser } from "../Hooks/useUser";
import { useFetchWhisper } from "../Hooks/useWhispers";
import { useState } from "react";
import FullPageLoader from "../Components/FullPageLoader";
import WhisperCard from "../Components/WhisperCard";
import Illustration from "../Components/Illustration";

function Archive() {
  const { user, isLoadingUser } = useUser();
  const fetchWhisper = useFetchWhisper();
  const [search, setSearch] = useState("");

  if (isLoadingUser || fetchWhisper.isLoading) return <FullPageLoader />;
  const whispers = fetchWhisper?.data;

  const archivewhispers = whispers?.filter((w) => {
    const now = new Date();
    const date = new Date(w?.created_at);
    const seconds = Math.floor((now - date) / 1000);
    return w.created_at && seconds >= 604800;
  });
  const searchWhispers = archivewhispers?.filter(
    (w) =>
      w.whisper.toLowerCase().includes(search.toLowerCase()) ||
      w.profile.userName.toLowerCase().includes(search.toLowerCase())
  );

  const displayWhispers = search ? searchWhispers : archivewhispers;

  return (
    <>
      <ArchiveNavbar setSearch={setSearch} />
      <ArchiveContainer>
        <ArchiveWrapper>
          {displayWhispers.map((whisper) => {
            return (
              <WhisperCard
                key={whisper?.id}
                whisper={whisper}
                whisperId={whisper?.id}
                userId={user?.id}
              />
            );
          })}
          {archivewhispers.length === 0 && <Illustration />}
          {search && searchWhispers.length === 0 && (
            <ResultDiv>
              <CircleAlert size={21} /> No results found
            </ResultDiv>
          )}
        </ArchiveWrapper>
      </ArchiveContainer>
    </>
  );
}

const ArchiveContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #58d8db;
`;
const ArchiveWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 70px;
  @media (max-width: 700px) {
    max-width: 370px;
  }
`;
const ResultDiv = styled.div`
  background-color: #283b89;
  color: white;
  font-size: 1.1rem;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 50%;
  margin: auto;
  margin-top: 270px;
  @media (max-width: 700px) {
    width: 70%;
  }
`;
export default Archive;
