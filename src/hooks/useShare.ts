import { useState } from "react"

export interface shareData{
    title:string,
    text : string 
    url: string
}

export const useShare =()=>{
    const [copied,setCopied] = useState<boolean>(false)

    const share = async (data:shareData)=>{
        const item = {
            title: data.title,
            text:`${data.text} at ${data.url}`,
            url:data.url
        }
        if(navigator.share){
            try{
                  await navigator.share(item)
        }catch(err){
                console.log("navigation share error",err?.name ?? "",err?.message as string)
            }
          
        }else{
            await navigator.clipboard.writeText(item.url)
            setCopied(true)
            setTimeout(()=>setCopied(false),2000)
        }
    }

    return {copied,share}
}