import styled from "styled-components";
import WhisperDetailNavbar from "../Components/WhisperDetailNavbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../Service/Supabase";
import FullPageLoader from "../Components/FullPageLoader";
import { SendHorizontal } from "lucide-react";
import { useUser } from "../Hooks/useUser";
import { useAddReplies, useFetchReplies } from "../Hooks/useReplies";
import { useForm } from "react-hook-form";
import TimeAgo from "../Components/TimeAgo";

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
      const { data: whisperData, error: whisperError } = await supabase
        .from("Whispers")
        .select("*")
        .eq("id", whisperId)
        .single();
      if (whisperError) throw whisperError;
      if (!whisperData) return;

      const { data: profileData, error: profileError } = await supabase
        .from("Profiles")
        .select("*")
        .eq("id", whisperData.user_id)
        .single();

      if (profileError) throw profileError;

      const whisperWithProfile = {
        ...whisperData,
        profileData,
      };

      if (!whisperError) setWhisper(whisperWithProfile);
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
  const avatar = whisper?.profileData?.avatar_url;
  return (
    <>
      <WhisperDetailNavbar />
      <WhisperDetailContainer>
        <WhisperWrapper>
          <WhisperCard key={whisper?.id}>
            <FirstContainer>
              <UserDiv>
                <UserImage>
                  {avatar ? (
                    <AvatarImage src={avatar} />
                  ) : (
                    whisper?.profileData?.userName.charAt(0).toUpperCase()
                  )}
                </UserImage>
                <UserName>{whisper?.profileData?.userName}</UserName>
              </UserDiv>
              <Time>
                <TimeAgo dateString={whisper?.created_at} />
              </Time>
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
                  <Send size={25} color="#58d8db" />
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
  margin-top: 70px;
  @media (max-width: 700px) {
    max-width: 370px;
  }
`;

const WhisperCard = styled.div`
  width: 100%;
  background-color: #283b89;
  height: auto;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 5px;
  padding-bottom: 1rem;
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
  padding-top: 13px;
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
const ReplyInput = styled.input`
  border: none;
  width: 100%;
  border-radius: 50px;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.5rem 1rem;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
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
const Reply = styled.p`
  color: white;
`;
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
