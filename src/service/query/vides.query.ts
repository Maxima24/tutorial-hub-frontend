import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { GetVideoResponse } from "@/interfaces/videoInterface";

export const useGetVideos = () => {
  return useQuery({
    queryKey: ["Videos"],
    queryFn: async () => {
      const { data } = await api.get("/video");
      if (!data) {
        console.error("Vidoes could not be fetched from the endpoint ");
      }
            console.log("THis is the tutorial data",data)

      return data;
    },
    enabled: true,
    staleTime: 15 * 1000,
  });
};

export const useGetSingleVideo = (videoId:string)=>{
  return useQuery({
    queryKey:["video",videoId],
    queryFn: async ():Promise<GetVideoResponse>=>{
      const {data} = await api.get(`/video/${videoId}`)
      return data.video
    },
    enabled:!!videoId,
    retry:3,
    staleTime:1000*60*5
    })
}