// components/chat/ConversationItem.tsx
import { useGetUserDetails } from "@/service/mutations/auth";
import { useUserStore } from "@/store/auth-store";
import { IParticipants, useChatStore } from "@/store/chat-store";
import { Conversation } from "@/store/message-store";
import Image from "next/image";
import React, { Dispatch, useEffect, useState } from "react";

interface ConversationItemProps {
  conversation: any
  selectedUserId: string | null;
  chatId:string
  onSelectConversation: (userId: string) => void;
  setSelectedConversation: Dispatch<React.SetStateAction<any>>
}

export function ConversationItem({
  conversation,
  selectedUserId,
  chatId,
  onSelectConversation,
  setSelectedConversation
}: ConversationItemProps) {
  // ✅ Safe hook call
  const user = useUserStore((state) => state.user)
  const { data: userDetails, isLoading } = useGetUserDetails(
    user?.id ?? ""
  );
  const getParticipants = useChatStore((s)=>s.getParticipants)
 
  const selectedChatId = useChatStore((s)=>s.currentChatId)
  const setCurrentChatId = useChatStore((s)=>s.setCurrentChatId)
  function getParticipantsData(chatId:string){
    if(!chatId) return
     const participants = getParticipants(chatId)
     if(!participants) return []
     return participants
  } 
  const participants = getParticipantsData(chatId)
  // const lastMessage = conversation.messages[conversation.messages.length - 1];
  console.log("FUck the conversation", conversation);
  console.log("Conversation", conversation.id)

  const DetermineSender= ():IParticipants =>{
    console.log("THis is the Participants",participants)
    const senderObject = participants?.find((participant:any)=> participant.user.id !== user?.id)
    if(!senderObject) return ({} as IParticipants)
    console.log("This is the sender object",senderObject)
    return senderObject || ({} as IParticipants)
    
  }
  console.log("THis is the sender object",DetermineSender())
  const userId = DetermineSender()?.user.id
  
  return (
    <button
      onClick={() => setCurrentChatId( chatId)}
      className={`w-full p-4 rounded-lg  text-left  hover:cursor-pointer
      `}
    >
      <div className="flex items-start justify-between mx-1 ">
        <div className="flex-1 min-w-0">
          <div>
            <Image
              src={user?.avatarUrl!}
              fill
              alt="User image"
              className="object-cover rounded-full"

            />
          </div>
          <p className=" text-left font-medium truncate">
            {
              
                ` ${DetermineSender()?.user?.name}`
             
            }
          </p>
          {/* {lastMessage && (
            <p className="text-sm text-gray-500 truncate">
              {lastMessage.content}
            </p>
          )} */}
        </div>
        {conversation?.unreadCount > 0 && (
          <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </button>
  );
}
