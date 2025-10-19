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
export interface VideoStore{
    videos:Video[],
    addVideo:(video:Video)=>void,
    removeVideo:(videoId:number)=>void
    deleteVideo:(videoId:number)=>void
    setSearchQuery:(query:string)=> void
    searchQuery:string,
    filteredVideos:Video[]


}