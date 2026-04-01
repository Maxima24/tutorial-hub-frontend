import { Tutorial } from "./tutorialInterface";

export interface Video {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: string;
  rating: number;
  thumbnail: string;
  students: string;
}
export interface GetVideoResponse{
          id: string,
        title:string ,
        videoUrl: string
        description: string,
        difficulty: string,
        duration: number
        courseId: string |null,
        thumbnailUrl: string,
        rating:string
        videoPublicId: string,
        price: number,
        userId: string,
       
}
export interface VideoStore{
    videos:Video[],
    addVideo:(video:Video)=>void,
    removeVideo:(videoId:string)=>void
    deleteVideo:(videoId:string)=>void
    setVideos:(videos:Video[])=>void
    setSearchQuery:(query:string)=> void
    updateVideoWatchHistory:(videoId:string,payload:VideoData)=> void
    getVideoWatchProgress: (videoId:string) => void
    getAllRecentVideos:()=>void
    searchQuery:string,
    filteredVideos:Video[],
    recentVideos: Record<string,VideoData>
  
}

export interface VideoData {
  percentageWatched:number
  totalDuration:number
  progress:number
  completed:boolean
  lastWatchedAt?: string
}

// export type WatchProgress = Record<string,VideoData>