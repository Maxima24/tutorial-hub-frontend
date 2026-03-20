// app/messages/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ChatWindow } from "@/components/chat/chat-window";
import { ConversationsList } from "@/components/chat/conversations-list";
import { useMessaging } from "@/hooks/useMessaging";
import { useUserStore } from "@/store/auth-store";
import { useChatStore } from "@/store/chat-store";

export default function MessagesPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>();
  const { socket, isConnected, getChat } = useMessaging();
  const user = useUserStore((state) => state.user);
  const chats = useChatStore((s) => s.chats);
  const selectedChat = useChatStore((s) => s.currentChatId);
  const clearCurrentChatId = useChatStore((s) => s.clearCurrentChatId);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (message) => {
      useChatStore.getState().appendMessage(message);
    });
    socket.emit("getMyMessages");
    return () => {
      socket.off("receiveMessage");
      socket.off("myMessages");
    };
  }, [socket]);

  // On mobile: if a chat is selected, show the chat window; otherwise show the list
  const showChatOnMobile = !!selectedChat;

  return (
    <div className="h-[95vh] flex bg-white overflow-hidden">
      {/*
        Desktop: side-by-side
        Mobile: show one panel at a time
      */}

      {/* Conversations sidebar */}
      <div
        className={`
          w-full sm:w-80 sm:mr-2 flex-shrink-0
          ${showChatOnMobile ? "hidden sm:flex" : "flex"}
          flex-col
        `}
      >
        <ConversationsList
          conversations={chats}
          onSelectConversation={setSelectedUserId}
          setSelectedConversation={setSelectedConversation}
          selectedUserId={selectedUserId}
        />
      </div>

      {/* Chat window */}
      <div
        className={`
          flex-1 h-full sm:mt-4
          ${showChatOnMobile ? "flex" : "hidden sm:flex"}
          flex-col
        `}
      >
        {selectedChat ? (
          <ChatWindow onBack={clearCurrentChatId} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}