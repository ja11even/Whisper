import styled from "styled-components";
import ArchiveNavbar from "../Components/ArchiveNavbar";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useUser } from "../Hooks/useUser";
import { useFetchWhisper } from "../Hooks/useWhispers";
import { Link } from "react-router-dom";

function Archive() {
  const { user, isLoadingUser } = useUser();
  const fetchWhisper = useFetchWhisper();
  if (isLoadingUser) return <p>loading..</p>;
  if (fetchWhisper.isLoading) return <p>loading..</p>;
  const whispers = fetchWhisper?.data;

  return (
    <>
      <ArchiveNavbar />
      <ArchiveContainer>
        <ArchiveWrapper>
          {whispers.map((whisper) => (
            <WhisperCard key={whisper.id}>
              <FirstContainer>
                <UserDiv>
                  <UserImage>
                    {whisper.username.charAt(0).toUpperCase()}
                  </UserImage>
                  <UserName>{whisper.username}</UserName>
                </UserDiv>
                <Time>5h ago</Time>
              </FirstContainer>
              <SecondContainer>
                <Whisper>{whisper.whisper}</Whisper>
              </SecondContainer>
              <ThirdContainer>
                <ReplyCountDiv></ReplyCountDiv>
                <ViewRepliesDiv>
                  <ReplyLink to={`/whisper/${whisper.id}`}>
                    View replies
                  </ReplyLink>
                </ViewRepliesDiv>
              </ThirdContainer>
            </WhisperCard>
          ))}
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
  margin-top: 100px;
`;
const WhisperCard = styled.div`
  background-color: #283b89;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const FirstContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SecondContainer = styled.div`
  margin-top: 10px;
`;
const ThirdContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const ViewRepliesDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ReplyCountDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #99a1af;
`;
const UserImage = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ae600;
`;
const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const ReplyLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #99a1af;
`;
const UserName = styled.p``;
const Time = styled.div``;
const Whisper = styled.p``;
export default Archive;
