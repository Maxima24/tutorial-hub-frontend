import { useQuery } from "@tanstack/react-query";
import { api } from "@/service/api";
import { useUserStore } from "@/store/auth-store";
export const useUserData = () => {
  const { setUser } = useUserStore();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/user/me");
      return res.data;
    },
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  });

  // Handle success/error separately
  if (userQuery.isSuccess && userQuery.data) {
    setUser(userQuery.data.user,userQuery.data.token);
  }

  if (userQuery.isError) {
    console.error("Failed to fetch user data:", userQuery.error);
  }

  return userQuery;
};