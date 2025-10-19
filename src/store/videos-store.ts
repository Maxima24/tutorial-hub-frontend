import { create } from "zustand";
import { Video, VideoStore } from "../interfaces/videoInterface";

export const useVideosStore = create<VideoStore>((set,get) => ({
    searchQuery:"",
    filteredVideos:[],
  videos: [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      category: "React",
      duration: "45 min",
      difficulty: "Beginner",
      rating: 4.8,
      thumbnail: "bg-gradient-to-br from-blue-400 to-blue-600",
      students: "2.3k",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      category: "CSS",
      duration: "1h 20m",
      difficulty: "Intermediate",
      rating: 4.9,
      thumbnail: "bg-gradient-to-br from-cyan-400 to-teal-600",
      students: "1.8k",
    },
    {
      id: 3,
      title: "Node.js API Development",
      category: "Backend",
      duration: "2h 15m",
      difficulty: "Advanced",
      rating: 4.7,
      thumbnail: "bg-gradient-to-br from-green-400 to-emerald-600",
      students: "1.5k",
    },
    {
      id: 4,
      title: "TypeScript Fundamentals",
      category: "JavaScript",
      duration: "1h 30m",
      difficulty: "Beginner",
      rating: 4.9,
      thumbnail: "bg-gradient-to-br from-purple-400 to-indigo-600",
      students: "3.1k",
    },
    {
      id: 5,
      title: "Modern Web Animation",
      category: "Design",
      duration: "55 min",
      difficulty: "Intermediate",
      rating: 4.6,
      thumbnail: "bg-gradient-to-br from-pink-400 to-rose-600",
      students: "980",
    },
    {
      id: 6,
      title: "GraphQL Complete Guide",
      category: "Backend",
      duration: "2h 40m",
      difficulty: "Advanced",
      rating: 4.8,
      thumbnail: "bg-gradient-to-br from-orange-400 to-amber-600",
      students: "1.2k",
    },
  ],

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
    }
}));
 export default useVideosStore