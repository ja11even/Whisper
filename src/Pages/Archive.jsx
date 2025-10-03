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
import WhisperCard from "../Components/WhisperCard";

function Archive() {
  const { user, isLoadingUser } = useUser();
  const fetchWhisper = useFetchWhisper();
  useEffect(() => {
    const img = new Image();
    img.src = archive;
  }, []);
  if (isLoadingUser || fetchWhisper.isLoading) return <FullPageLoader />;

  const whispers = fetchWhisper?.data;

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
          {whispers.map((whisper) => (
            <WhisperCard
              key={whisper?.id}
              whisper={whisper}
              whisperId={whisper?.id}
              userId={user?.id}
            />
          ))}
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
