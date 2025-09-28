import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSignUp } from "../Hooks/useSignUp";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const signUp = useSignUp();
  function onSubmit({ email, password, userName }) {
    signUp.mutate(
      { email, password, userName },
      {
        onSuccess: () => reset(),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <UserNameDiv>
        <Input
          type="text"
          id="userName"
          placeholder="Username"
          {...register("userName", { required: true })}
        />
        {errors.userName && <Error>Username is required</Error>}
      </UserNameDiv>
      <EmailDiv>
        <Input
          type="email"
          id="email"
          placeholder="Email Address"
          {...register(
            "email",
            { required: true },
            {
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email ",
              },
            }
          )}
        />
        {errors.email && <Error>Email address is required</Error>}
      </EmailDiv>
      <PasswordDiv>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "At least 8 characters",
            },
            pattern: {
              value: /^(?=.*[!@#$%^&*])(?=.*\d).+$/,
              message: "Must include a number and special character",
            },
          })}
        />
        {errors.password && <Error>Password is required</Error>}
      </PasswordDiv>
      <ButtonDiv>
        <Button type="submit">
          {signUp.isPending ? (
            <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
          ) : (
            "Get Started"
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
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`;
const UserNameDiv = styled.div`
  margin-bottom: 10px;
`;
const EmailDiv = styled.div`
  margin-bottom: 10px;
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
  font-family: inherit;
  align-items: center;
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

export default SignUpForm;
