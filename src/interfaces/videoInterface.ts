import { Tutorial } from "./tutorialInterface";

export interface Video {
  id: number;
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
    removeVideo:(videoId:number)=>void
    deleteVideo:(videoId:number)=>void
    setSearchQuery:(query:string)=> void
    searchQuery:string,
    filteredVideos:Video[]
    

}