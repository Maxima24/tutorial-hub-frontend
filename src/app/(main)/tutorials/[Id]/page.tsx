export const dynamic = "force-dynamic"
import VideoPlayer from "@/components/video/videoPlayer"

export const  Page =({params}:{params:{id:string}})=>{

 return  <VideoPlayer id={params.id}/>
}
