import styled from "styled-components";
import { Heading } from "../Components/Heading";
import { Plus, Users } from "lucide-react";
import { useUser } from "../Hooks/useUser";

function Welcome() {
  const { user, isLoadingUser } = useUser();
  if (isLoadingUser) return <p>loading...</p>;
  console.log(user);
  return (
    <WelcomeContainer>
      <WelcomeWrapper>
        <FirstContainer>
          <Heading as="h1">Welcome to Whisper</Heading>
          <HeaderText>Let's set up your safe space</HeaderText>
        </FirstContainer>
        <SecondContainer>
          <CircleCard>
            <CardHeader>
              <Heading as="h3">
                <Users size={20} />
                Create Your Circle
              </Heading>
              <CardHeaderText>
                Invite friends who can see and respond to your whispers
              </CardHeaderText>
            </CardHeader>
            <CircleNameDiv>
              <Input type="text" placeholder="Group name" />
            </CircleNameDiv>
            <CircleEmailDiv>
              <Input type="email" placeholder="friend@email.com" />
              <IconDiv>
                <Plus color="white" />
              </IconDiv>
            </CircleEmailDiv>
            <DisclaimerDiv>
              Friends will see your whispers anonymously and can reply once per
              whisper.
              <br /> They won't know which whispers are yours unless you tell
              them
            </DisclaimerDiv>
            <Buttons>
              <SkipButton>Skip for now</SkipButton>
              <ContinueButton>Continue</ContinueButton>
            </Buttons>
          </CircleCard>
        </SecondContainer>
      </WelcomeWrapper>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  background-color: #9ae600;
  min-height: 100vh;
  padding: 2rem 0;
`;
const WelcomeWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 40px;
`;
const FirstContainer = styled.div`
  text-align: center;
`;
const SecondContainer = styled.div`
  text-align: center;
  width: 70%;
  margin: auto;
  margin-top: 20px;
`;
const HeaderText = styled.p``;
const CircleCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
`;
const CardHeader = styled.div`
  line-height: 1.4;
`;
const CardHeaderText = styled.p``;
const CircleEmailDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 1rem;
`;
const CircleNameDiv = styled.div`
  margin-top: 10px;
  width: 93.1%;
`;
const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 0.5rem;
  border: 1px solid #9ae600;
  &:focus {
    outline: none;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
`;
const SkipButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  font-size: 1rem;
`;
const ContinueButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  font-size: 1rem;
  background-color: black;
  color: white;
`;
const DisclaimerDiv = styled.div`
  background-color: #d8f999;
  padding: 1rem;
  line-height: 1.4;
  border-radius: 10px;
  font-size: 0.9rem;
  margin-top: 20px;
`;
const IconDiv = styled.div`
  background-color: black;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Welcome;
