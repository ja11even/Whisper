import styled from "styled-components";
import archive from "../assets/archive.svg";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Illustration() {
  const text1 = "Your archive is empty";
  const text2 = " Whispers older than 7 days rest here.";
  const charDuration = 0.05;
  const delay = 0.05;
  const text1Duration = text1.length * delay + charDuration;
  const highlightStart = text2.indexOf("7 days");
  const highlightEnd = highlightStart + "7 days".length;
  useEffect(() => {
    const img = new Image();
    img.src = archive;
  }, []);
  return (
    <IllustrationContainer>
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
              i >= highlightStart && i < highlightEnd ? { color: "white" } : {}
            }
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </IllustrationText>
    </IllustrationContainer>
  );
}

const IllustrationImage = styled.img`
  max-width: 600px;
  height: auto;
  margin-bottom: 20px;
  object-fit: contain;
  width: 90%;
  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;
const IllustrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1400px) {
    margin-top: 150px;
  }
  @media (max-width: 700px) {
    height: 450px;
  }
`;
const IllustrationText = styled(motion.p)`
  color: #283b89;
  font-size: 1.5rem;
`;

export default Illustration;
