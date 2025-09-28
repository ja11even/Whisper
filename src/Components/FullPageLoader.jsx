import { motion } from "framer-motion";
import styled from "styled-components";

function FullPageLoader() {
  return (
    <FullPage>
      <LoaderDiv>
        <BlackDiv
          animate={{ y: [0, 50, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 0.1,
            ease: "easeInOut",
          }}
        />
      </LoaderDiv>
    </FullPage>
  );
}

const FullPage = styled.div`
  background-color: #283b89;
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const LoaderDiv = styled.div`
  background-color: #58d8db;
  width: 5px;
  height: 100px;
`;
const BlackDiv = styled(motion.div)`
  height: 50px;
  width: 100%;
  background-color: #283b89;
`;
export default FullPageLoader;
