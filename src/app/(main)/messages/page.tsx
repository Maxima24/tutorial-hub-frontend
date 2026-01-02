// app/messages/page.tsx (or wherever your messages page is)
"use client";

import { useState, useEffect } from "react";
import { ChatWindow } from "@/components/chat/chat-window";
import { ConversationsList } from "@/components/chat/conversations-list";
import { useMessaging } from "@/hooks/useMessaging";
import { useUserStore } from "@/store/auth-store";
import { useMessagesStore } from "@/store/message-store";
import { join } from "path";

export default function MessagesPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any>();
  const { socket, isConnected, getChat } = useMessaging();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  useEffect(() => {
    getChat();
  }, [token]);
  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      useMessagesStore.getState().addMessage(message);
    });

    // Get existing messages
    socket.emit("getMyMessages");

    socket.on("myMessages", (data) => {
      useMessagesStore.getState().hydrateConversations(data);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("myMessages");
    };
  }, [socket]);
  return (
    <div className="h-screen flex">
      {/* Conversations Sidebar */}
      <div className="w-80">
        <ConversationsList
          onSelectConversation={setSelectedUserId}
          selectedUserId={selectedUserId}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedUserId ? (
          <ChatWindow
            recipientId={selectedUserId}
            recipientName={`User ${selectedUserId}`}
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
