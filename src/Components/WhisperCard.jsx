import styled from "styled-components";
import { useLikes } from "../Hooks/useLikes";
import { Link } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  MessageCircle,
  Plus,
} from "lucide-react";

function WhisperCard({ whisperId, userId, whisper }) {
  const { liked, count, toggleLike } = useLikes(whisperId, userId);
  const avatar = whisper?.profile?.avatar_url;
  console.log(count);
  return (
    <>
      <WhisperCardContainer>
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
            <HeartDiv
              animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                type="submit"
                size={20}
                onClick={toggleLike}
                color={liked ? "#58d8db" : "#99a1af"}
                fill={liked ? "#58d8db" : "transparent"}
                style={{ cursor: "pointer" }}
              />
            </HeartDiv>
            <CountDiv>{count > 0 ? count : null}</CountDiv>
          </ReplyCountDiv>
          <ViewRepliesDiv>
            <ReplyLink to={`/whisper/${whisper.id}`}>
              <ChevronRight color="#58d8db" size={20} />
            </ReplyLink>
          </ViewRepliesDiv>
        </ThirdContainer>
      </WhisperCardContainer>
    </>
  );
}

const WhisperCardContainer = styled.div`
  width: 100%;
  background-color: #283b89;
  height: auto;
  padding: 2rem;
  border-radius: 10px;
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
  gap: 0.4rem;
  color: #99a1af;
  height: 20px;
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
const UserName = styled.p`
  color: white;
`;
const Time = styled.p`
  color: #58d8db;
`;
const Whisper = styled.p`
  color: white;
`;
const ReplyLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;
const CountDiv = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  margin-top: 1px;
`;
const HeartDiv = styled(motion.div)`
  display: flex;
  align-items: center;
`;
export default WhisperCard;
