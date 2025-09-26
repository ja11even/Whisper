import styled from "styled-components";
import WhisperDetailNavbar from "../Components/WhisperDetailNavbar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../Service/Supabase";
import FullPageLoader from "../Components/FullPageLoader";
import { ArrowRight, MessageCircle, SendHorizontal } from "lucide-react";
import { useUser } from "../Hooks/useUser";
import { useAddReplies, useFetchReplies } from "../Hooks/useReplies";
import { useForm } from "react-hook-form";

function WhisperDetailPage() {
  const { whisperId } = useParams();
  const [whisper, setWhisper] = useState(null);
  const [loading, setLoading] = useState(false);
  const addReply = useAddReplies();
  const fetchReply = useFetchReplies(whisperId);
  const { handleSubmit, register, reset } = useForm();
  const { user, isLoadingUser } = useUser();

  useEffect(() => {
    async function fetchWhisper() {
      setLoading(true);
      const { data, error } = await supabase
        .from("Whispers")
        .select("*")
        .eq("id", whisperId)
        .single();
      if (!error) setWhisper(data);
      setLoading(false);
    }
    fetchWhisper();
  }, [whisperId]);

  if (isLoadingUser) return <FullPageLoader />;
  if (loading) return <FullPageLoader />;
  if (fetchReply.isLoading) return <FullPageLoader />;

  const userId = user?.id;
  const reply = fetchReply?.data;
  const userName = user?.user_metadata?.userName;
  console.log(reply);

  function onSubmit(data) {
    if (!data.reply.trim()) return;
    const replyData = {
      ...data,
      user_id: userId,
      whisper_id: whisperId,
      username: userName,
    };
    addReply.mutate(replyData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <>
      <WhisperDetailNavbar />
      <WhisperDetailContainer>
        <WhisperWrapper>
          <WhisperCard key={whisper?.id}>
            <FirstContainer>
              <UserDiv>
                <UserImage>
                  {whisper?.username.charAt(0).toUpperCase()}
                </UserImage>
                <UserName>{whisper?.username}</UserName>
              </UserDiv>
              <Time>5h ago</Time>
            </FirstContainer>
            <SecondContainer>
              <Whisper>{whisper?.whisper}</Whisper>
            </SecondContainer>
            {reply?.length > 0 && (
              <FourthContainer>
                {reply.map((reply) => (
                  <RepliesDiv key={reply.id}>
                    <UserDiv>
                      <UserImage>
                        {reply?.username?.charAt(0).toUpperCase()}
                      </UserImage>
                      <UserName>{reply?.username}</UserName>
                    </UserDiv>
                    <ReplyDiv>
                      <Reply>{reply?.reply}</Reply>
                    </ReplyDiv>
                  </RepliesDiv>
                ))}
              </FourthContainer>
            )}
            <ThirdContainer>
              <ReplyForm onSubmit={handleSubmit(onSubmit)}>
                <ReplyInput
                  type="text"
                  placeholder="Post your reply"
                  {...register("reply")}
                />
                <ReplyButton type="submit">
                  <Send size={25} color="white" />
                </ReplyButton>
              </ReplyForm>
            </ThirdContainer>
          </WhisperCard>
        </WhisperWrapper>
      </WhisperDetailContainer>
    </>
  );
}

const WhisperDetailContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #58d8db;
`;

const WhisperWrapper = styled.div`
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
  padding-bottom: 1.5rem;
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
  gap: 1rem;
  margin-top: 20px;
  border-top: 1px solid white;
  padding-top: 15px;
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
`;
const UserImage = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ae600;
`;
const CurrentUserImage = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
`;
const CurrentUserDiv = styled.div``;
const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const UserName = styled.p``;
const Time = styled.p``;
const Whisper = styled.p``;
const ReplyInput = styled.input`
  border: none;
  width: 100%;
  border-radius: 50px;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.5rem 1rem;
  caret-color: #9ae600;
  &:focus {
    outline: none;
  }
`;
const ReplyForm = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const FourthContainer = styled.div`
  margin-top: 20px;
`;
const RepliesDiv = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 10px;
`;
const ReplyDiv = styled.div`
  margin-left: 66px;
  margin-top: -10px;
`;
const Reply = styled.p``;
const ReplyButton = styled.button`
  border: none;
  background: none;
`;
const Send = styled(SendHorizontal)`
  &:hover {
    cursor: pointer;
  }
`;
export default WhisperDetailPage;
