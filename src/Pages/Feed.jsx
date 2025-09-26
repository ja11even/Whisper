import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import { useUser } from "../Hooks/useUser";
import { useState } from "react";
import { useAddWhisper, useFetchWhisper } from "../Hooks/useWhispers";
import { Form, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Feed() {
  const [open, setOpen] = useState(false);
  const { user, isLoadingUser } = useUser();
  const { handleSubmit, reset, register } = useForm();
  const fetchWhisper = useFetchWhisper();
  const addWhisper = useAddWhisper();

  if (isLoadingUser) return <p>loading..</p>;
  if (fetchWhisper.isLoading) return <p>loading..</p>;
  const whispers = fetchWhisper?.data;
  const userId = user?.id;
  const userName = user?.user_metadata?.userName;

  function onSubmit(data) {
    if (!data.whisper?.trim()) return;
    const whisperData = { ...data, user_id: userId, username: userName };
    addWhisper.mutate(whisperData, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  }
  return (
    <>
      <Navbar />
      <FeedContainer>
        <FeedWrapper>
          {open ? (
            <PostWhisperContainer
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <PostForm onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" {...register("whisper")} />
                <Buttons>
                  <Filler />
                  <PostButtons>
                    <CancelButton type="button" onClick={() => setOpen(false)}>
                      Cancel
                    </CancelButton>
                    <PostButton type="submit">Post</PostButton>
                  </PostButtons>
                </Buttons>
              </PostForm>
            </PostWhisperContainer>
          ) : (
            whispers.map((whisper) => (
              <WhisperCard key={whisper.id}>
                <FirstContainer>
                  <UserDiv>
                    <UserImage>
                      {whisper.username.charAt(0).toUpperCase()}
                    </UserImage>
                    <UserName>{whisper.username}</UserName>
                  </UserDiv>
                  <Time>5h ago</Time>
                </FirstContainer>
                <SecondContainer>
                  <Whisper>{whisper.whisper}</Whisper>
                </SecondContainer>
                <ThirdContainer>
                  <ReplyCountDiv>
                    <MessageCircle size={15} />1 reply
                  </ReplyCountDiv>
                  <ViewRepliesDiv>
                    <ReplyLink to={`/whisper/${whisper.id}`}>
                      View replies
                    </ReplyLink>
                  </ViewRepliesDiv>
                </ThirdContainer>
              </WhisperCard>
            ))
          )}
        </FeedWrapper>
        <WhisperButtonDiv>
          <WhisperButton onClick={() => setOpen(true)}>
            <Plus size={19} color="#58d8db" />
          </WhisperButton>
        </WhisperButtonDiv>
      </FeedContainer>
    </>
  );
}
const PostForm = styled.form``;

const FeedContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #58d8db;
`;
const FeedWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 100px;
`;
const WhisperCard = styled.div`
  width: 100%;
  background-color: #283b89;
  height: auto;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 10px;
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
const WhisperButton = styled.button`
  border: none;
  background-color: #283b89;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;
const WhisperButtonDiv = styled.div`
  position: fixed;
  bottom: 20px;
  right: 75px;
  z-index: 1000;
`;
const PostWhisperContainer = styled(motion.div)`
  background-color: #283b89;
  height: 75vh;
  padding: 1.5rem;
  margin-top: 50px;
  border-radius: 10px;
`;
const Input = styled.textarea`
  resize: none;
  height: 400px;
  width: 100%;
  color: white;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  background-color: #283b89;
  border-radius: 10px;
  border: none;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
const PostButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 35px;
`;
const CancelButton = styled.button`
  border: none;
  padding: 0.5rem 1rem;
  font-family: inherit;
  color: #58d8db;
  border: 1px solid #58d8db;
  background: transparent;
  font-size: 0.9rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const PostButton = styled.button`
  border: none;
  padding: 0.7rem 1.5rem;
  font-family: inherit;
  background-color: #11192d;
  color: white;
  font-size: 0.9rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filler = styled.div``;
const ReplyLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #58d8db;
`;
export default Feed;
