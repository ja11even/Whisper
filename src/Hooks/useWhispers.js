import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addWhisper,
  deleteWhisper,
  fetchWhispers,
  updateWhisper,
} from "../Service/apiWhispers";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

export function useFetchWhisper() {
  const { user } = useUser();
  const userId = user?.id;
  return useQuery({
    queryKey: ["Whispers", userId],
    queryFn: () => fetchWhispers(userId),
    enabled: !!userId,
  });
}

export function useAddWhisper() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addWhisper,
    onSuccess: () => {
      queryClient.invalidateQueries(["Whispers", userId]);
      toast.success("Whisper Sent");
    },
    onError: () => {
      toast.error("Failed to send Whisper");
    },
  });
}

export function useUpdateWhisper() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateWhisper(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(["Whispers", userId]);
      toast.success("Whisper edited");
    },
    onError: () => {
      toast.error("Failed to edit Whisper");
    },
  });
}

export function useDeleteWhisper() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWhisper,
    onSuccess: () => {
      queryClient.invalidateQueries(["Whispers", userId]);
      toast.success("Whisper deleted");
    },
    onError: () => {
      toast.error("Failed to delete Whisper");
    },
  });
}
