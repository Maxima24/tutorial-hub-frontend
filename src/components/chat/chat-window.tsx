// components/chat/chat-window.tsx
import { useState, useEffect, useRef } from "react";
import { useMessaging } from "@/hooks/useMessaging";
import { useMessagesStore } from "@/store/message-store";
import { useUserStore } from "@/store/auth-store";

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
}

export function ChatWindow({ recipientId, recipientName }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");
  const [activeConversation,setActiveConversation] = useState<any>()
  const { sendMessage, isConnected } = useMessaging();
  const userId = useUserStore((state) => state.user?.id);
  const conversation = useMessagesStore((state) =>
    state.getConversation(recipientId)
  );
  

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set this conversation as active when component mounts
    setActiveConversation(recipientId);

    return () => {
      // Clear active conversation when unmounting
      setActiveConversation(null);
    };
  }, [recipientId, setActiveConversation]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageInput.trim() || !userId) return;

    try {
      console.log({
        senderId: userId,
        recieverId: recipientId,
        content: messageInput.trim(),
      });
      await sendMessage({
         recipientId,
        content: messageInput.trim(),
      });
      setMessageInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
      // You can add toast notification here
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{recipientName}</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-500">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation?.messages.map((message) => {
          const isOwn = message.senderId === userId;

          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
                }`}
              >
                <p className="break-words">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!isConnected || !messageInput.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
