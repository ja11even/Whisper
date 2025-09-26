import styled from "styled-components";
import SettingsNavbar from "../Components/SettingsNavbar";
import { Heading } from "../Components/Heading";
import { Upload, UsersRound } from "lucide-react";

function Settings() {
  return (
    <>
      <SettingsNavbar />
      <SettingsContainer>
        <SettingsWrapper>
          <UserCard>
            <UserCardHeader>
              <Heading as="h4">
                <UsersRound size={20} /> Profile
              </Heading>
              <UserCardText>Manage how you appear to your circle</UserCardText>
            </UserCardHeader>
            <DisplayName>
              <Label>Username</Label>
              <Input />
            </DisplayName>
            <ProfilePictureDiv>
              <ProfileButton>
                Upload profile <Upload size={20} />
              </ProfileButton>
            </ProfilePictureDiv>
            <Button>Save Profile Changes</Button>
          </UserCard>
        </SettingsWrapper>
      </SettingsContainer>
    </>
  );
}

const SettingsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;
const SettingsWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 100px;
`;
const UserCard = styled.div`
  padding: 2rem;
  padding-top: 1.5rem;
  border-radius: 10px;
  background-color: #9ae600;
`;
const UserCardHeader = styled.div`
  line-height: 1.4;
  margin-bottom: 20px;
`;
const UserCardText = styled.p`
  color: black;
  font-size: 1rem;
`;
const DisplayName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label``;
const Input = styled.input`
  width: 30%;
  height: 30px;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  font-family: inherit;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  border: none;
  background-color: black;
  padding: 0.7rem;
  height: 45px;
  color: white;
  border-radius: 5px;
  margin-top: 15px;
  font-family: inherit;
  font-size: 0.9rem;
`;
const ProfileButton = styled.button`
  background-color: white;
  color: #9ae600;
  border: none;
  padding: 0.7rem;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
`;
const ProfilePictureDiv = styled.div``;
export default Settings;
