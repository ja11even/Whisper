import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCircle, deleteCircle, fetchCircle } from "../Service/apiCircle";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

export function useFetchCircle() {
  const { user } = useUser();
  const userId = user?.id;
  return useQuery({
    queryKey: ["Circle", userId],
    queryFn: fetchCircle,
    enabled: !!userId,
  });
}

export function useAddCircle() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCircle,
    onSuccess: () => {
      queryClient.invalidateQueries(["Circle", userId]);
      toast.success("Friend added");
    },
    onError: () => {
      toast.error("Failed to add friend");
    },
  });
}

export function useDeleteCircle() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCircle,
    onSuccess: () => {
      queryClient.invalidateQueries(["Circle", userId]);
      toast.success("Removed friend");
    },
    onError: () => {
      toast.error("Failed to remove friend");
    },
  });
}
