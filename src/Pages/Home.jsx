import styled from "styled-components";
import { Heading } from "../Components/Heading";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Memoji1 from "../assets/Memoji1.png";
import Memoji2 from "../assets/Memoji2.png";
import Memoji3 from "../assets/Memoji3.png";
import google from "../assets/google.png";
import spotify from "../assets/spotify.png";
import SignUpForm from "../Forms/SignUpForm";
import LogInForm from "../Forms/LogInForm";
import Memoji4 from "../assets/Memoji4.png";
import Memoji5 from "../assets/Memoji5.png";
import ForgotPasswordForm from "../Forms/ForgotPasswordForm";

function Home() {
  const [open, setOpen] = useState(false);
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  useEffect(() => {
    const images = [
      Memoji1,
      Memoji2,
      Memoji3,
      Memoji4,
      Memoji5,
      google,
      spotify,
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  useEffect(() => {
    if (open || openLogIn || openForgot) {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open, openLogIn, openForgot]);

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
        {open ? (
          <SignUpContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Heading as="h2">Get Started</Heading>
            <SignUpForm />
            <FooterText>
              Already have an account ?
              <span
                onClick={() => {
                  setOpen(false);
                  setOpenLogIn(true);
                }}
                style={{ color: "#283b89", cursor: "pointer" }}
              >
                {" "}
                Log In
              </span>
            </FooterText>
          </SignUpContainer>
        ) : openLogIn ? (
          <LogInContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Heading as="h2">Log In</Heading>
            <LogInForm />
            <FooterText>
              Forgot password ?{" "}
              <span
                onClick={() => {
                  setOpenLogIn(false);
                  setOpenForgot(true);
                }}
                style={{ color: "#283b89", cursor: "pointer" }}
              >
                Reset password
              </span>
            </FooterText>
          </LogInContainer>
        ) : openForgot ? (
          <ForgotContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Heading as="h2">Forgot Password</Heading>
            <ForgotPasswordForm />
            <FooterText>
              Remember password ?{" "}
              <span
                onClick={() => {
                  setOpenForgot(false);
                  setOpenLogIn(true);
                }}
                style={{ color: "#283b89", cursor: "pointer" }}
              >
                Log In
              </span>
            </FooterText>
          </ForgotContainer>
        ) : (
          <Buttons>
            <GetStartedButton onClick={() => setOpen(true)}>
              Get Started
            </GetStartedButton>
            <ExistingAccountButton onClick={() => setOpenLogIn(true)}>
              Have an existing account ?
            </ExistingAccountButton>
          </Buttons>
        )}
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
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 50%;
  margin: 50px auto;
  @media (max-width: 700px) {
    width: 70%;
    margin: 40px auto;
  }
`;
const AppName = styled.p`
  text-align: center;
  font-size: 2rem;
  color: white;
  margin-top: -20px;
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
const GetStartedButton = styled.button`
  border: none;
  padding: 1rem;
  border-radius: 10px;
  color: white;
  font-family: inherit;
  background-color: #11192d;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
const ExistingAccountButton = styled.button`
  border: 1px solid #58d8db;
  padding: 1rem;
  border-radius: 10px;
  background: transparent;
  font-family: inherit;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  color: #58d8db;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;
const SignUpContainer = styled(motion.div)`
  background-color: white;
  min-height: 380px;
  max-height: 510px;
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
const LogInContainer = styled(motion.div)`
  background-color: white;
  min-height: 330px;
  max-height: 510px;
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
const ForgotContainer = styled(motion.div)`
  background-color: white;
  min-height: 240px;
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

const FooterText = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
  color: #11192d;
`;

export default Home;
