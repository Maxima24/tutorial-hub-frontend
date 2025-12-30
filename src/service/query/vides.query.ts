import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const useGetVideos = () => {
  return useQuery({
    queryKey: ["Videos"],
    queryFn: async () => {
      const { data } = await api.get("/video");
      if (!data) {
        console.error("Vidoes could not be fetched from the endpoint ");
      }
      return data;
    },
    enabled: true,
    staleTime: 15 * 1000,
  });
};
