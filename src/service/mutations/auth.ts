import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { FormData } from "./../../interfaces/authInterface";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: Record<string, string>) => {
      const { data } = await api.post("/auth/login", payload);
      if (!data) throw new Error("Login attempt failed");
      console.log("Login response data:", data);
      const { safeUser, access_token } = data;
      localStorage.setItem("token", access_token);
      return { safeUser, token: access_token };
    },
  });
};
export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (payload: Record<string, string>) => {
      const response = await api.post("/auth/signup", payload);
      if (!response) throw new Error("Signup attempt failed");
      console.log("Signup response data:", response.data);
      const { safeUser, accesstoken } = response.data.data;
      localStorage.setItem("token", accesstoken);
      return { safeUser, token: accesstoken };
    },
  });
};
export const useGetUser = () => {
  return useMutation({
    mutationKey: ["getUser"],
    mutationFn: async () => {
      const { data } = await api.get("/auth/me");
      if (!data) throw new Error("Fetch user failed");
      console.log("Get User response data:", data.data);
      const { safeUser, access_token } = data.data;
      localStorage.setItem("token", access_token);
    },
  });
};
export const useGetUserDetails = (userId:string) => {
  return useQuery({
    queryKey: ["getUserDetails"],
    queryFn: async () => {
      const { data } = await api.get("/auth/get-user-details", {
        params: {
          userId,
        },
      });
      if (!data) throw new Error("Fetch for user data failed");
      const { safeUser: user } = data.data;
      console.log(user);
    },
  });
};
