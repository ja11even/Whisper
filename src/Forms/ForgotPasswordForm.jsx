import { useState } from "react";
import styled from "styled-components";
import { supabase } from "../Service/Supabase";
import toast from "react-hot-toast";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://whisper-11.vercel.app/reset-password",
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent");
    }
    setSubmitting(false);
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
      <ButtonDiv>
        <Button type="submit">
          {submitting ? (
            <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
          ) : (
            "Send reset link"
          )}
        </Button>
      </ButtonDiv>
    </Form>
  );
}

const Form = styled.form``;
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
export default ForgotPasswordForm;
