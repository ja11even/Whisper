import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../Service/Supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import SpinnerMini from "../Components/SpinnerMini";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      supabase.auth.setSessionFromUrl({ hash }).catch(() => {
        toast.error("Expired reset link");
        navigate("/");
      });
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password && !confirmPassword) return;
    if (!password || !confirmPassword) {
      toast.error("Both fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, include a number and special character"
      );
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully");
      navigate("/");
    }
    setSubmitting(false);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <PasswordDiv>
        <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
      <ConfirmPasswordDiv>
        <InputWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <VisibilityButton
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <Eye size={20} color="#283b89" />
            ) : (
              <EyeClosed size={20} color="#283b89" />
            )}
          </VisibilityButton>
        </InputWrapper>
      </ConfirmPasswordDiv>
      <ButtonDiv>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
          ) : (
            "Set new password"
          )}
        </Button>
      </ButtonDiv>
    </Form>
  );
}

const Form = styled.form``;
const PasswordDiv = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;
const ConfirmPasswordDiv = styled.div`
  margin-bottom: 10px;
`;
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

export default ResetPasswordForm;
