import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn } from "../Service/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logIn,
    onSuccess: (user) => {
      queryClient.setQueryData(["user", user.user]);
      navigate("/feed", { replace: true });
    },
    onError: () => {
      toast.error("Email or Password is incorrect");
    },
  });
}
