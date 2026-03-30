"use clent"
import VideoPlayer from "@/components/video/videoPlayer";
import { useParams } from "next/navigation"


function Page(){

  const {Id:videoId} = useParams()

  if(!videoId) return null;

  return <VideoPlayer id={videoId as string }/>

}



export default Page