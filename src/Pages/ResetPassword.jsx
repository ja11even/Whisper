import Memoji1 from "../assets/Memoji1.png";
import Memoji5 from "../assets/Memoji5.png";
import Memoji4 from "../assets/Memoji4.png";
import styled from "styled-components";
import { Heading } from "../Components/Heading";
import ResetPasswordForm from "../Forms/ResetPasswordForm";
import { motion } from "framer-motion";

function ResetPassword() {
  return (
    <HomeContainer>
      <HomeWrapper>
        <AppName>Whisper</AppName>
        <PicturesDiv>
          <ImageOneDiv>
            <ImageOne src={Memoji1} />
          </ImageOneDiv>
          <ImageTwoDiv>
            <ImageOne src={Memoji5} />
          </ImageTwoDiv>
          <ImageThreeDiv>
            <ImageOne src={Memoji4} />
          </ImageThreeDiv>
        </PicturesDiv>
        <BodyHeader>
          <Heading as="h1">Say what's on your mind</Heading>
          <BodyText>
            Whisper lets you vent, confess, support and expose your truth inside
            your private circle... without anyone ever knowing it was you.{" "}
          </BodyText>
        </BodyHeader>
        <ForgotContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Heading as="h2">Reset Password</Heading>
          <ResetPasswordForm />
        </ForgotContainer>
      </HomeWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  background-color: #283b89;
  min-height: 100vh;
  padding: 2rem 0;
`;
const HomeWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 60px;
  @media (max-width: 700px) {
    margin-top: 15px;
  }
`;
const AppName = styled.p`
  text-align: center;
  font-size: 2rem;
  color: white;
  margin-top: -20px;
`;
const PicturesDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 20px;
  max-width: 100%;
  gap: 5rem;
  @media (max-width: 700px) {
    gap: 1.2rem;
  }
`;
const ImageOneDiv = styled(motion.div)`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 140px;
  @media (max-width: 700px) {
    width: 110px;
    margin-left: 5px;
  }
`;
const ImageTwoDiv = styled(motion.div)`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 140px;
  margin-right: 5px;
  @media (max-width: 700px) {
    width: 110px;
    margin-right: 0px;
  }
`;
const ImageThreeDiv = styled(motion.div)`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 140px;
  @media (max-width: 700px) {
    width: 110px;
  }
`;
const ImageOne = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
const BodyHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BodyText = styled.p`
  text-align: center;
  width: 700px;
  font-size: 1.1rem;
  color: #11192d;
  @media (max-width: 700px) {
    width: 320px;
    margin-top: 10px;
  }
`;
const ForgotContainer = styled(motion.div)`
  background-color: white;
  min-height: 290px;
  max-height: 300px;
  width: 650px;
  margin: auto;
  border-radius: 10px;
  padding: 2rem;
  margin-top: 50px;
  @media (max-width: 700px) {
    width: 350px;
    padding: 1.5rem;
  }
`;
export default ResetPassword;
