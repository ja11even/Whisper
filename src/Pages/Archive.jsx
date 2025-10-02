import styled from "styled-components";
import ArchiveNavbar from "../Components/ArchiveNavbar";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import { useUser } from "../Hooks/useUser";
import { useFetchWhisper } from "../Hooks/useWhispers";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FullPageLoader from "../Components/FullPageLoader";
import TimeAgo from "../Components/TimeAgo";
import archive from "../assets/archive.svg";

function Archive() {
  const { user, isLoadingUser } = useUser();
  const [likes, setLikes] = useState({});
  const fetchWhisper = useFetchWhisper();
  useEffect(() => {
    const img = new Image();
    img.src = archive;
  }, []);
  if (isLoadingUser || fetchWhisper.isLoading) return <FullPageLoader />;

  const whispers = fetchWhisper?.data;

  const toggleLike = (id) => {
    setLikes((prevLikes) => ({ ...prevLikes, [id]: !prevLikes[id] }));
  };

  const text1 = "Your archive is empty";
  const text2 = " Whispers older than 7 days rest here.";
  const charDuration = 0.05;
  const delay = 0.05;
  const text1Duration = text1.length * delay + charDuration;
  const highlightStart = text2.indexOf("7 days");
  const highlightEnd = highlightStart + "7 days".length;
  return (
    <>
      <ArchiveNavbar />
      <ArchiveContainer>
        <ArchiveWrapper>
          {whispers.map((whisper) => {
            const avatar = whisper?.profile?.avatar_url;
            return (
              <WhisperCard key={whisper.id}>
                <FirstContainer>
                  <UserDiv>
                    <UserImage>
                      {avatar ? (
                        <AvatarImage src={avatar} />
                      ) : (
                        whisper?.profile?.userName.charAt(0).toUpperCase()
                      )}
                    </UserImage>
                    <UserName>{whisper?.profile?.userName}</UserName>
                  </UserDiv>
                  <Time>
                    <TimeAgo dateString={whisper?.created_at} />
                  </Time>
                </FirstContainer>
                <SecondContainer>
                  <Whisper>{whisper.whisper}</Whisper>
                </SecondContainer>
                <ThirdContainer>
                  <ReplyCountDiv>
                    <motion.div
                      animate={
                        likes[whisper.id]
                          ? { scale: [1, 1.4, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        size={20}
                        onClick={() => toggleLike(whisper.id)}
                        color={likes[whisper.id] ? "#58d8db" : "#99a1af"}
                        fill={likes[whisper.id] ? "#58d8db" : "transparent"}
                      />
                    </motion.div>
                  </ReplyCountDiv>
                  <ViewRepliesDiv>
                    <ReplyLink to={`/whisper/${whisper.id}`}>
                      <ArrowRight color="#58d8db" size={20} />
                    </ReplyLink>
                  </ViewRepliesDiv>
                </ThirdContainer>
              </WhisperCard>
            );
          })}
          {whispers.length === 0 && (
            <Illustration>
              <IllustrationImage src={archive} />
              <IllustrationText>
                {text1.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: charDuration, delay: i * delay }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </IllustrationText>
              <IllustrationText style={{ fontSize: "1.1rem" }}>
                {text2.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: charDuration,
                      delay: text1Duration + i * delay,
                    }}
                    style={
                      i >= highlightStart && i < highlightEnd
                        ? { color: "white" }
                        : {}
                    }
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </IllustrationText>
            </Illustration>
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
const WhisperCard = styled.div`
  background-color: #283b89;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  height: auto;
  margin-bottom: 5px;
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
  color: #283b89;
`;
const AvatarImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
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
const UserName = styled.p`
  color: white;
`;
const Time = styled.div`
  color: #58d8db;
`;
const Whisper = styled.p`
  color: white;
`;
const IllustrationImage = styled.img`
  width: 1000px;
  height: 490px;
  margin-bottom: 20px;
  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;
const Illustration = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    height: 450px;
  }
`;
const IllustrationText = styled(motion.p)`
  color: #283b89;
  font-size: 1.5rem;
`;
export default Archive;
