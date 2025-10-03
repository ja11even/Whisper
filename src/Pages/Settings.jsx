import styled from "styled-components";
import SettingsNavbar from "../Components/SettingsNavbar";
import { Heading } from "../Components/Heading";
import { LogOut, Upload, UsersRound } from "lucide-react";
import { useLogOut } from "../Hooks/useLogOut";
import SpinnerMini from "../Components/SpinnerMini";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../Hooks/useUser";
import { supabase } from "../Service/Supabase";
import FullPageLoader from "../Components/FullPageLoader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, isLoadingUser } = useUser();
  const { mutate: logOut, isPending } = useLogOut();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userName, setUserName] = useState(user?.user_metadata?.userName || "");
  const currentUserName = user?.user_metadata?.userName;
  const navigate = useNavigate();
  if (isLoadingUser) return <FullPageLoader />;
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };
  async function onSubmit(e) {
    e.preventDefault();
    setUploading(true);
    try {
      let avatar_url = user?.user_metadata?.avatar_url;
      if (!selectedFile && userName === currentUserName) return;
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${user.id}-${uuidv4()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, selectedFile);
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(filePath);

        avatar_url = `${publicUrl}?${Date.now()}`;
      }
      const { error: uploadError } = await supabase.auth.updateUser({
        data: {
          userName,
          avatar_url,
        },
      });
      if (uploadError) throw uploadError;
      if (!uploadError) {
        await supabase
          .from("Profiles")
          .update({
            userName,
            avatar_url,
          })
          .eq("id", user?.id);
      }
      toast.success("Profile updated");
      navigate("/feed");
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to update profile");
    } finally {
      setUploading(false);
    }
  }
  return (
    <>
      <SettingsNavbar />
      <SettingsContainer>
        <SettingsWrapper>
          <UserCard as="form" onSubmit={onSubmit}>
            <UserCardHeader>
              <Heading as="h4" style={{ fontSize: "1.2rem" }}>
                <UsersRound size={20} /> Profile
              </Heading>
              <UserCardText>Manage how you appear to your circle</UserCardText>
            </UserCardHeader>
            <DisplayName>
              <Label>Username</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </DisplayName>
            <ProfilePictureDiv>
              <HiddenInput
                id="avatar"
                onChange={handleFileChange}
                type="file"
                accept="image/*"
              />
              {previewUrl && <PreviewImg src={previewUrl} />}
              <AvatarLabel htmlFor="avatar">
                Upload avatar <Upload size={20} />
              </AvatarLabel>
            </ProfilePictureDiv>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
              ) : (
                "Save profile"
              )}
            </Button>
          </UserCard>
          <LogOutCard>
            <UserCardHeader>
              <Heading as="h4" style={{ fontSize: "1.2rem" }}>
                <LogOut size={20} /> Log Out
              </Heading>
              <UserCardText>Sign out of your whisper account</UserCardText>
            </UserCardHeader>
            <LogOutButton onClick={logOut} disabled={isPending}>
              {isPending ? (
                <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
              ) : (
                "Log Out"
              )}
            </LogOutButton>
          </LogOutCard>
        </SettingsWrapper>
      </SettingsContainer>
    </>
  );
}

const SettingsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #58d8db;
`;
const SettingsWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 70px;
  @media (max-width: 700px) {
    max-width: 370px;
  }
`;
const UserCard = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #283b89;
  margin-bottom: 5px;
`;
const LogOutCard = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #283b89;
`;
const UserCardHeader = styled.div`
  line-height: 1.4;
  margin-bottom: 20px;
`;
const UserCardText = styled.p`
  color: white;
  font-size: 0.95rem;
`;
const DisplayName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label`
  color: white;
  font-size: 1.1rem;
`;
const Input = styled.input`
  width: auto;
  height: 30px;
  border: none;
  border-top: 1px solid #283b89;
  border-left: 1px solid #283b89;
  border-right: 1px solid #283b89;
  border-bottom: 1px solid white;
  background-color: transparent;
  font-family: inherit;
  font-size: 1rem;
  color: white;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  border: none;
  background-color: #11192d;
  padding: 0.7rem;
  height: 45px;
  color: white;
  border-radius: 5px;
  margin-top: 15px;
  font-family: inherit;
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
  }
`;
const LogOutButton = styled.button`
  border: none;
  background-color: #11192d;
  padding: 0.7rem;
  height: 45px;
  color: white;
  border-radius: 5px;
  font-family: inherit;
  font-size: 0.9rem;
  width: auto;
  &:hover {
    cursor: pointer;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;
const AvatarLabel = styled.label`
  background-color: #11192d;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
  }
`;
const PreviewImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;
const ProfilePictureDiv = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 1rem;
  align-items: center;
`;
export default Settings;
