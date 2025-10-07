import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../Service/apiAuth";
import { supabase } from "../Service/Supabase";

export function useUser() {
  const { isLoading: isLoadingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) return data.session.user;
      return await getCurrentUser();
    },
    staleTime: Infinity,
  });
  return {
    isLoadingUser,
    user,
    isAuthenticated: !!user,
  };
}
