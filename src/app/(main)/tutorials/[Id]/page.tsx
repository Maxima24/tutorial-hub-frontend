export const dynamic = "force-dynamic"
import VideoPlayer from "@/components/video/videoPlayer"

export const  Page =({params}:{params:{id:string}})=>{
  console.log("All params",params)
 return  <VideoPlayer id={params.id}/>
}
