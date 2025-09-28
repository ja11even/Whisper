import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOut as logOutApi } from "../Service/apiAuth";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      navigate("/", { replace: true });
      queryClient.removeQueries();
    },
  });
}
