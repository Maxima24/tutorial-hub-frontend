import { useRef, useState } from "react"

export interface shareData{
    title:string,
    text : string 
    url: string
}

export const useShare = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const sharingRef = useRef(false); // 👈 tracks if share is in progress

  const share = async (data: shareData) => {
    if (sharingRef.current) return; // 👈 if already sharing, do nothing

    const item = {
      title: data.title,
      text: `${data.text} at ${data.url}`,
      url: data.url,
    };

    if (navigator.share) {
      try {
        sharingRef.current = true; // 👈 mark as sharing
        await navigator.share(item);
      } catch (err) {
        const error = err as Error;
        if (error.name !== "AbortError") {
          console.error("share error:", error.name, error.message);
        }
      } finally {
        sharingRef.current = false; // 👈 always reset when done
      }
    } else {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return { copied, share };
};