import { useState } from "react"

export const useDownload = ({
    url, fileName
}: {
    url: string,
    fileName: string
}) => {
    const [isDownloading, setIsDownloading] = useState<boolean>(false)
    async function download() {
        try {
            if(!url || !fileName) return 
            setIsDownloading(true)
            const response = await fetch(url)
            const blob = await response.blob()
            console.log(blob)
            const blobUrl = URL.createObjectURL(blob)
            console.log("This is the blob url",blobUrl)
            const a = document.createElement("a")
            console.log("Thi is the new anchor elememet",a)
            a.href = blobUrl
            a.download = fileName  ?? inferName(url)
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(blobUrl)
        } catch (err) {
            console.error("Something went wrong could not download", err)
        } finally {
            setIsDownloading(false)
        }

    }

    function inferName(url: string) {
        try {
            const pathName = new URL(url).pathname
            return pathName.split("/").pop() ?? download


        } catch {
            return 'download'

        }
    }
    return { download, isDownloading }


}