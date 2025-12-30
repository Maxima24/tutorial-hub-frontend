import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const useCreateVideo = () => {
  return useMutation({
    mutationKey: ["createVideo"],
    mutationFn: async (payload: Record<string, any>) => {
      const { data } = await api.post("/video/create", payload);
      if (!data) throw new Error("Create video failed");
      console.log("Create Video response data:", data);
      return data;
    },
  });
};
export const useGetAllVideosWithId = () => {
  return useMutation({
    mutationKey: ["getAllVideosWithId"],
    mutationFn: async (tutorialId: string) => {
      const { data } = await api.get(`/videos/tutorial/${tutorialId}`);
      if (!data) throw new Error("Fetch videos failed");
      console.log("Get All Videos With Id data data:", data.data);
      return data.data.data;
    },
  });
};
export const useGetvideoById = () => {
  return useMutation({
    mutationKey: ["getVideoById"],
    mutationFn: async (id: string) => {
      const response = await api.get(`/videos/tutorial/${id}`);
      console.log(
        "response gottten from the api is given as ",
        response.data.data
      );
    },
  });
};
export const useDeleteVideo = () => {
  return useMutation({
    mutationKey: ["deleteVideo"],
    mutationFn: async (id: string) => {
      const response = await api.delete(`/videos/tutorial/${id}`);
      console.log(
        "response gotten from the api is given as",
        response.data.data
      );
    },
  });
};
