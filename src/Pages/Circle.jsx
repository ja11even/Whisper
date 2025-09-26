import styled from "styled-components";
import CircleNavbar from "../Components/CircleNavbar";
import { Plus, UserRoundPlus } from "lucide-react";
import { Heading } from "../Components/Heading";
import { useAddCircle } from "../Hooks/useCircle";
import { useForm } from "react-hook-form";
import { useUser } from "../Hooks/useUser";

function Circle() {
  const { user, isLoadingUser } = useUser();
  const addCircle = useAddCircle();
  const { handleSubmit, reset, register } = useForm();
  if (isLoadingUser) return <p>loading..</p>;
  const userId = user?.id;
  async function onSubmit(data) {
    if (!data.invited_email?.trim()) return;
    const circleData = { ...data, inviter_user_id: userId };
    addCircle.mutate(circleData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <>
      <CircleNavbar />
      <CircleContainer>
        <CircleWrapper>
          <InviteCard>
            <InviteDiv>
              <UserRoundPlus size={20} color="white" />
              Invite a friend
            </InviteDiv>
            {/*<TextDiv>
              Invite someone you trust to join your circle. They'll be able to
              see and reply to whispers anonymously.
            </TextDiv>*/}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <EmailDiv>
                <Input type="email" {...register("invited_email")} />
                <InviteButton type="submit">
                  <UserRoundPlus size={18} /> Add
                </InviteButton>
              </EmailDiv>
            </Form>
          </InviteCard>
          {/*<CircleMembersDiv>
            <MembersFirstDiv>
              <Heading as="h2">Circle Members</Heading>
            </MembersFirstDiv>
            <MembersSecondDiv>
              <UserDiv>You</UserDiv>
              <MembersDiv>User</MembersDiv>
            </MembersSecondDiv>
          </CircleMembersDiv>*/}
          <CircleGuidelines>
            <GuidelinesFirstDiv>
              <Heading as="h2">Circle Guidelines</Heading>
            </GuidelinesFirstDiv>
            <GuidelinesSecondDiv>
              <GuidelinesText>
                Anonymity: All whispers are shared anonymously within your
                circle
              </GuidelinesText>
              <GuidelinesText>
                One Reply: Each member can reply once per whisper to encourage
                thoughtful responses
              </GuidelinesText>
              <GuidelinesText>
                Privacy: What's shared in the circle stays in the circle
              </GuidelinesText>
            </GuidelinesSecondDiv>
          </CircleGuidelines>
        </CircleWrapper>
      </CircleContainer>
    </>
  );
}
const CircleContainer = styled.div``;
const CircleWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 100px;
`;
const InviteCard = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 10px;
  background-color: #9ae600;
  padding-top: 1.5rem;
`;
const InviteDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.2rem;
`;
const EmailDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 20px;
`;
const Input = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 5px;
  padding: 0 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  caret-color: #9ae600;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
const Form = styled.form``;
const InviteButton = styled.button`
  background-color: black;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  gap: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;
const TextDiv = styled.div`
  color: white;
  font-size: 1rem;
`;
const CircleMembersDiv = styled.div`
  background-color: #9ae600;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 30px;
`;
const MembersFirstDiv = styled.div``;
const MembersSecondDiv = styled.div``;
const UserDiv = styled.div``;
const MembersDiv = styled.div``;
const CircleGuidelines = styled.div`
  padding: 2rem;
  border-radius: 10px;
  background-color: #9ae600;
`;
const GuidelinesFirstDiv = styled.div``;
const GuidelinesSecondDiv = styled.div``;
const GuidelinesText = styled.p``;

export default Circle;
