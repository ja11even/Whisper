import styled from "styled-components";
import CircleNavbar from "../Components/CircleNavbar";
import { UserRoundPlus } from "lucide-react";
import { useAddCircle } from "../Hooks/useCircle";
import { useForm } from "react-hook-form";
import { useUser } from "../Hooks/useUser";
import toast from "react-hot-toast";
import SpinnerMini from "../Components/SpinnerMini";
import FullPageLoader from "../Components/FullPageLoader";

function Circle() {
  const { user, isLoadingUser } = useUser();
  const addCircle = useAddCircle();
  const { handleSubmit, reset, register } = useForm();
  if (isLoadingUser) return <FullPageLoader />;
  const userId = user?.id;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  async function onSubmit(data) {
    if (!data.invited_email?.trim()) return;
    if (data.invited_email === user?.email) return;
    if (emailRegex.test(data.invited_email) === false) {
      toast.error("Enter a valid email address");
    }
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <EmailDiv>
                <Input type="email" {...register("invited_email")} />
                <InviteButton type="submit" disabled={addCircle.isPending}>
                  {addCircle.isPending ? (
                    <SpinnerMini width="1.3rem" height="1.3rem" color="white" />
                  ) : (
                    <>
                      <UserRoundPlus size={18} /> Add
                    </>
                  )}
                </InviteButton>
              </EmailDiv>
            </Form>
          </InviteCard>
          <CircleGuidelines>
            <GuidelinesFirstDiv>Circle Guidelines</GuidelinesFirstDiv>
            <GuidelinesSecondDiv>
              <GuidelinesText>
                <span style={{ color: "#58d8db" }}> Invite -</span> Invite
                someone you trust to join your circle via email.
              </GuidelinesText>
              <GuidelinesText>
                <span style={{ color: "#58d8db" }}> Anonymity -</span> All
                whispers are shared anonymously within your circle
              </GuidelinesText>
              <GuidelinesText>
                <span style={{ color: "#58d8db" }}> Privacy -</span> What's
                shared in the circle stays in the circle
              </GuidelinesText>
            </GuidelinesSecondDiv>
          </CircleGuidelines>
        </CircleWrapper>
      </CircleContainer>
    </>
  );
}
const CircleContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #58d8db;
`;
const CircleWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 70px;
  @media (max-width: 700px) {
    max-width: 370px;
  }
`;
const InviteCard = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #283b89;
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
  margin-top: 10px;
  @media (max-width: 700px) {
    gap: 1rem;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 5px;
  padding: 0 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 700px) {
    width: fit-content;
  }
`;
const Form = styled.form``;
const InviteButton = styled.button`
  background-color: #11192d;
  color: white;
  padding: 0.51rem 1.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
  font-family: inherit;
  font-size: 1rem;
  gap: 0.5rem;
  width: 110px;
  height: 35px;
  &:hover {
    cursor: pointer;
  }
`;

const CircleGuidelines = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #283b89;
  color: white;
`;
const GuidelinesFirstDiv = styled.div`
  color: white;
  font-size: 1.2rem;
`;
const GuidelinesSecondDiv = styled.div`
  margin-top: 10px;
`;
const GuidelinesText = styled.p`
  font-size: 1.05rem;
`;

export default Circle;
