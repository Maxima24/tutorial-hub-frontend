// app/messages/page.tsx (or wherever your messages page is)
"use client";

import { useState, useEffect } from "react";
import { ChatWindow } from "@/components/chat/chat-window";
import { ConversationsList } from "@/components/chat/conversations-list";
import { useMessaging } from "@/hooks/useMessaging";
import { useUserStore } from "@/store/auth-store";
import { useMessagesStore } from "@/store/message-store";
import { join } from "path";
import { useChatStore } from "@/store/chat-store";

export default function MessagesPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any>();
  const [converListObject,setConverListObject] = useState<any>()
  const [selectedConversation,setSelectedConversation] = useState<any>()
  const { socket, isConnected, getChat } = useMessaging();
  const user = useUserStore((state) => state.user);
  const chats  = useChatStore((s)=>s.chats)
  const selectedChat = useChatStore((s)=>s.currentChatId)
  const token = useUserStore((state) => state.token);
  
  useEffect(()=>{
    console.log(converListObject) 
  },[converListObject])

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      useChatStore.getState().appendMessage(message);
    });

    // Get existing messages
    socket.emit("getMyMessages");

    return () => {
      socket.off("receiveMessage");
      socket.off("myMessages");
    };
  }, [socket]);
  return (
    <div className="h-[95vh] flex bg-white">
      {/* Conversations Sidebar */}
      <div className="w-80 mr-2">
        <ConversationsList
          conversations ={chats}
          onSelectConversation={setSelectedUserId}
          setSelectedConversation = {setSelectedConversation}
          selectedUserId={selectedUserId}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 h-[95vh] mt-4 ">
        {selectedChat ? (
          <ChatWindow
            conversations = {selectedConversation}
            
            recipientName={`${selectedUserId}`}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );

  // return (
  //   <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded">
  //     <div>User: {user?.email || "Not logged in"}</div>
  //     <div>Token: {token ? "✅" : "❌"}</div>
  //     <div>Socket: {socket ? "✅" : "❌"}</div>
  //     <div>Connected: {isConnected ? "✅" : "❌"}</div>
  //     <div>Socket ID: {socket?.id || "N/A"}</div>
  //   </div>
  // );
}
