import { useMutation } from "@tanstack/react-query";
import { signUp } from "../Service/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        "Account created! Verify your email to start using Whisper."
      );
    },
  });
}
