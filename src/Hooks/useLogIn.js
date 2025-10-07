import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn } from "../Service/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../Service/Supabase";

export function useLogIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logIn,
    onSuccess: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        queryClient.setQueryData(["user", sessionData.session.user]);
        navigate("/feed", { replace: true });
      }
    },
    onError: () => {
      toast.error("Email or Password is incorrect");
    },
  });
}
