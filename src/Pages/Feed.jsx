import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { Plus } from "lucide-react";
import { useUser } from "../Hooks/useUser";
import { useEffect, useState } from "react";
import { useAddWhisper, useFetchWhisper } from "../Hooks/useWhispers";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import FullPageLoader from "../Components/FullPageLoader";
import illustration from "../assets/illustration.svg";
import WhisperCard from "../Components/WhisperCard";

function Feed() {
  const [open, setOpen] = useState(false);
  const { user, isLoadingUser } = useUser();
  const { handleSubmit, reset, register } = useForm();
  const fetchWhisper = useFetchWhisper();
  const addWhisper = useAddWhisper();
  const whispers = fetchWhisper?.data;

  useEffect(() => {
    const img = new Image();
    img.src = illustration;
  }, []);

  useEffect(() => {
    if (fetchWhisper.isLoading) return;
    if (!open && whispers?.length === 0) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open, whispers?.length, fetchWhisper.isLoading]);

  if (isLoadingUser || fetchWhisper.isLoading) return <FullPageLoader />;

  const userId = user?.id;

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

  const text1 = "Create your first whisper";
  const text2 = "Whispers from the last 7 days live here.";
  const charDuration = 0.05;
  const delay = 0.05;
  const text1Duration = text1.length * delay + charDuration;
  const highlightStart = text2.indexOf("7 days");
  const highlightEnd = highlightStart + "7 days".length;
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
            whispers.map((whisper) => (
              <WhisperCard
                key={whisper?.id}
                whisper={whisper}
                whisperId={whisper?.id}
                userId={user?.id}
              />
            ))
          )}
          {!open && whispers.length === 0 && (
            <Illustration>
              <IllustrationImage src={illustration} />
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
  background-color: #58d8db;
  min-height: 100svh;
  padding-top: max(2rem, env(safe-area-inset-top));
  padding-top: max(2rem, constant(safe-area-inset-top));
  padding-bottom: max(2rem, env(safe-area-inset-bottom));
  padding-bottom: max(2rem, constant(safe-area-inset-bottom));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`;
const FeedWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 70px;
  @media (max-width: 1400px) {
    max-width: 90%;
  }
  @media (max-width: 700px) {
    max-width: 95%;
  }
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
  @media (max-width: 1400px) {
    bottom: 20px;
    right: 20px;
  }
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

const IllustrationImage = styled.img`
  max-width: 655px;
  height: auto;
  margin-bottom: 20px;
  object-fit: contain;
  width: 90%;
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
  @media (max-width: 1400px) {
    margin-top: 170px;
  }
  @media (max-width: 700px) {
    height: 450px;
    margin-top: 0px;
  }
`;
const IllustrationText = styled(motion.p)`
  color: #283b89;
  font-size: 1.5rem;
`;
export default Feed;
