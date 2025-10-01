import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { ArrowRight, Heart, MessageCircle, Plus } from "lucide-react";
import { useUser } from "../Hooks/useUser";
import { useEffect, useState } from "react";
import { useAddWhisper, useFetchWhisper } from "../Hooks/useWhispers";
import { Form, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FullPageLoader from "../Components/FullPageLoader";
import TimeAgo from "../Components/TimeAgo";
import illustration from "../assets/illustration.svg";

function Feed() {
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState({});
  const { user, isLoadingUser } = useUser();
  const { handleSubmit, reset, register } = useForm();
  const fetchWhisper = useFetchWhisper();
  const addWhisper = useAddWhisper();

  useEffect(() => {
    const img = new Image();
    img.src = illustration;
  }, []);

  useEffect(() => {
    if (fetchWhisper.isLoading) return;
    if (!open && whispers.length === 0) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  });

  if (isLoadingUser || fetchWhisper.isLoading) return <FullPageLoader />;
  console.log(fetchWhisper?.data);
  const whispers = fetchWhisper?.data;
  const userId = user?.id;
  const toggleLike = (id) => {
    setLikes((prevLikes) => ({ ...prevLikes, [id]: !prevLikes[id] }));
  };
  function onSubmit(data) {
    if (!data.whisper?.trim()) return;
    const whisperData = { ...data, user_id: userId };
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
                    <PostButton type="submit" disabled={addWhisper.isPending}>
                      Post
                    </PostButton>
                  </PostButtons>
                </Buttons>
              </PostForm>
            </PostWhisperContainer>
          ) : (
            whispers.map((whisper) => {
              const avatar = whisper?.profile?.avatar_url;
              return (
                <WhisperCard key={whisper.id}>
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
                      <motion.div
                        animate={
                          likes[whisper.id]
                            ? { scale: [1, 1.4, 1] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          size={20}
                          onClick={() => toggleLike(whisper.id)}
                          color={likes[whisper.id] ? "#58d8db" : "#99a1af"}
                          fill={likes[whisper.id] ? "#58d8db" : "transparent"}
                          style={{ cursor: "pointer" }}
                        />
                      </motion.div>
                    </ReplyCountDiv>
                    <ViewRepliesDiv>
                      <ReplyLink to={`/whisper/${whisper.id}`}>
                        <ArrowRight color="#58d8db" size={20} />
                      </ReplyLink>
                    </ViewRepliesDiv>
                  </ThirdContainer>
                </WhisperCard>
              );
            })
          )}
          {!open && whispers.length === 0 && (
            <Illustration>
              <IllustrationImage src={illustration} />
              <IllustrationText>Create your first whisper</IllustrationText>
              <IllustrationText style={{ fontSize: "1.1rem" }}>
                Whispers from the last{" "}
                <span style={{ color: "white" }}>7 days</span> live here.
              </IllustrationText>
            </Illustration>
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
  margin-top: 70px;
  @media (max-width: 700px) {
    max-width: 370px;
  }
`;
const WhisperCard = styled.div`
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
const WhisperButton = styled.button`
  border: none;
  border: 1px solid #58d8db;
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
  bottom: 10px;
  right: 71px;
  z-index: 1000;
  @media (max-width: 700px) {
    bottom: 20px;
    right: 10px;
  }
`;
const PostWhisperContainer = styled(motion.div)`
  background-color: #283b89;
  height: 540px;
  padding: 1.5rem;
  margin-top: 50px;
  border-radius: 10px;
  @media (max-width: 700px) {
    height: 535px;
  }
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
const IllustrationText = styled.p`
  color: #283b89;
  font-size: 1.5rem;
`;
export default Feed;
