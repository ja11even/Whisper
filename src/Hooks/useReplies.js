import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReplies,
  deleteReplies,
  fetchReplies,
  updateReplies,
} from "../Service/apiReplies";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

export function useFetchReplies(whisperId) {
  const { user } = useUser();
  const userId = user?.id;
  return useQuery({
    queryKey: ["Replies", userId, whisperId],
    queryFn: () => fetchReplies(userId, whisperId),
    enabled: !!userId,
  });
}

export function useAddReplies() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addReplies,
    onSuccess: () => {
      queryClient.invalidateQueries(["Replies", userId]);
      toast.success("Reply sent!");
    },
    onError: () => {
      toast.error("Failed to send reply");
    },
  });
}

export function useUpdateReplies() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReplies,
    onSuccess: () => {
      queryClient.invalidateQueries(["Replies", userId]);
      toast.success("Edited reply");
    },
    onError: () => {
      toast.error("Failed to edit reply");
    },
  });
}

export function useDeleteReplies() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReplies,
    onSuccess: () => {
      queryClient.invalidateQueries(["Replies", userId]);
      toast.success("Deleted reply");
    },
    onError: () => {
      toast.error("Failed to delete reply");
    },
  });
}
