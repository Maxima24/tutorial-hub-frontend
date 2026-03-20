// components/chat/conversation-item.tsx
import { useUserStore } from "@/store/auth-store";
import { IParticipants, useChatStore } from "@/store/chat-store";
import React, { Dispatch } from "react";

interface ConversationItemProps {
  conversation: any;
  selectedUserId: string | null;
  chatId: string;
  onSelectConversation: (userId: string) => void;
  setSelectedConversation: Dispatch<React.SetStateAction<any>>;
}

function Avatar({ name, avatarUrl, size = 10 }: { name?: string; avatarUrl?: string | null; size?: number }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name ?? "avatar"}
        className={`w-${size} h-${size} rounded-full object-cover flex-shrink-0`}
      />
    );
  }

  return (
    <div
      className={`w-${size} h-${size} rounded-full flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm`}
    >
      {initials}
    </div>
  );
}

export function ConversationItem({
  conversation,
  selectedUserId,
  chatId,
  onSelectConversation,
  setSelectedConversation,
}: ConversationItemProps) {
  const user = useUserStore((state) => state.user);
  const getParticipants = useChatStore((s) => s.getParticipants);
  const selectedChatId = useChatStore((s) => s.currentChatId);
  const setCurrentChatId = useChatStore((s) => s.setCurrentChatId);

  const participants = getParticipants(chatId);
  const otherParticipant: IParticipants | undefined = participants.find(
    (p) => p.user.id !== user?.id
  );

  const lastMessage = conversation?.messages?.[conversation.messages.length - 1];
  const isActive = selectedChatId === chatId;

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    return isToday
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <button
      onClick={() => {
        setCurrentChatId(chatId);
        if (otherParticipant) onSelectConversation(otherParticipant.user.id);
        setSelectedConversation(conversation);
      }}
      className={`w-full px-4 py-3 text-left transition-all duration-150 rounded-xl mx-1 my-0.5
        ${isActive
          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
          : "hover:bg-white/70 text-gray-800"
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar
            name={otherParticipant?.user.name}
            avatarUrl={otherParticipant?.user.avatarUrl}
            size={10}
          />
          {/* Online dot — placeholder, wire up real presence if available */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className={`font-semibold text-sm truncate ${isActive ? "text-white" : "text-gray-900"}`}>
              {otherParticipant?.user.name ?? "Unknown"}
            </p>
            {lastMessage && (
              <span className={`text-xs flex-shrink-0 ${isActive ? "text-blue-100" : "text-gray-400"}`}>
                {formatTime(lastMessage.createdAt)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-1 mt-0.5">
            <p className={`text-xs truncate ${isActive ? "text-blue-100" : "text-gray-500"}`}>
              {lastMessage
                ? lastMessage.senderId === user?.id
                  ? `You: ${lastMessage.content}`
                  : lastMessage.content
                : "No messages yet"}
            </p>

            {conversation?.unreadCount > 0 && !isActive && (
              <span className="ml-1 flex-shrink-0 bg-blue-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

export { Avatar };