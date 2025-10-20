

import { ArrowLeft, Edit, Send } from "lucide-react";
import Link from "next/link";
import Conversationchat from "../../conversation-chat";


type BlogPageProps = {
  params:Promise< {
    username: string;
  }>;
};


export default async function BlogPage({params}: BlogPageProps) {
  const {username} = await params;
  

  //const Icon = blog.icon; // 

  return (
    <div className="w-full min-h-screen fixed mt-25 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
      <Conversationchat/>
    </div>
  )
}
