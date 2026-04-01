import { create } from "zustand";
import {  Video,VideoData,VideoStore} from "../interfaces/videoInterface";
import { persist } from "zustand/middleware";

export const useVideosStore = create<VideoStore>()(
 persist( 
  (set,get) => (
  {
    searchQuery:"",
    filteredVideos:[],
  videos: 
  [
  ] as Video[],
  recentVideos:  {} as Record<string,VideoData>,
  setVideos:(videos) => set((state)=>({
    videos:[...videos]
  })),
  addVideo: (video) =>
    set((state) => ({
      videos: [...state.videos, video],
    })),
  removeVideo: (videoId) =>
    set((state) => ({
      videos: state.videos.filter((video) => video.id !== videoId),
    })),
    deleteVideo:(videoId)=>set((state)=>({
        videos:state.videos.filter((video)=>video.id !== videoId)
    })),
    setSearchQuery:(query)=>{
      const {videos} = get()
        const filtered = videos.filter((video:Video)=>{
            return  video.title.toLowerCase().includes(query.toLowerCase()) || 
        video.category.toLowerCase().includes(query.toLowerCase())}
        )
        set({searchQuery:query,filteredVideos:filtered})
    },
    updateVideoWatchHistory:(videoId,payload)=>set((state)=>({
      recentVideos: {
        ...state.recentVideos,
        [videoId]:{
          ...state.recentVideos[videoId],
          ...payload,
          lastWatchedAt: new Date().toISOString()
        }
      }
    })),
    getVideoWatchProgress: (videoId:string)=>{
      return get().recentVideos[videoId] ?? null
    },
    getAllRecentVideos:()=>{
      return get().recentVideos
    }
}),  
  {
      name: "Video-Store",
    },
)
);
 export default useVideosStore
