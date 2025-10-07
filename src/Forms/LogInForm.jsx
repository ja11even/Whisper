import { useState } from "react";
import styled from "styled-components";
import { useLogIn } from "../Hooks/useLogIn";
import SpinnerMini from "../Components/SpinnerMini";
import { Eye, EyeClosed } from "lucide-react";

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const logIn = useLogIn();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) return;
    logIn.mutate({ email, password });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <EmailDiv>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
      </EmailDiv>
      <PasswordDiv>
        <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <VisibilityButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye size={20} color="#283b89" />
            ) : (
              <EyeClosed size={20} color="#283b89" />
            )}
          </VisibilityButton>
        </InputWrapper>
      </PasswordDiv>
      <ButtonDiv>
        <Button type="submit">
          {logIn.isPending ? (
            <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
          ) : (
            "Log In"
          )}
        </Button>
      </ButtonDiv>
    </Form>
  );
}

const Form = styled.form``;
const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid #283b89;
  padding: 0rem 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

const EmailDiv = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;
const PasswordDiv = styled.div`
  margin-bottom: 10px;
`;
const Button = styled.button`
  border: none;
  padding: 1rem;
  border-radius: 10px;
  color: white;
  background-color: #11192d;
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  height: 52px;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonDiv = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 30px;
`;
const VisibilityButton = styled.button`
  height: 45px;
  width: 45px;
  right: 0;
  border-radius: 5px;
  position: absolute;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #283b89;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
export default LogInForm;
