// components/chat/conversations-list.tsx
import { useMessagesStore } from "@/store/message-store";
import { ConversationItem } from "./conversation-item";
import { useUserStore } from "@/store/auth-store";
import { Dispatch } from "react";
import { useChatStore } from "@/store/chat-store";

interface ConversationsListProps {
  onSelectConversation: (userId: string) => void;
  conversations: any
  selectedUserId: string | null;
  setSelectedConversation: Dispatch<React.SetStateAction<any>>
}

export function ConversationsList({
  onSelectConversation,
  conversations,
  selectedUserId,
  setSelectedConversation
}: ConversationsListProps) {
  // const conversations = useMessagesStore((state) => state.conversations);
  const user = useUserStore((state)=>state.user)
  const chats  = useChatStore((s)=>s.chats)
  const chatArray = Array.from(chats.values())
  console.log("THis is the current conversations",conversations)

  return (
    <div className="border border-transparent h-full overflow-y-auto  rounded-lg mt-4 mb-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ring-2 ring-gray-200">
      <div className="p-4 ">
        <h2 className="text-lg font-semibold">Chats</h2>
      </div>
 
      <div className="bg-none">
     {  chatArray.map((conversation:any) => (
          
          <ConversationItem
            key={conversation?.id}
            chatId = {conversation.id}
            conversation={conversation}
            selectedUserId={selectedUserId}
            setSelectedConversation = {setSelectedConversation}
            onSelectConversation={onSelectConversation}
          />
        ))}

        {conversations?.size === 0 && (
          <div className="p-8 text-center text-gray-500">
            No conversations yet
          </div>
        )} 
      </div>
    </div>
  );
}
