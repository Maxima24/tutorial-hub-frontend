// components/chat/ConversationItem.tsx
import { useGetUserDetails } from "@/service/mutations/auth";
import { Conversation } from "@/store/message-store";

interface ConversationItemProps {
  conversation: Conversation;
  selectedUserId: string | null;
  onSelectConversation: (userId: string) => void;
}

export function ConversationItem({
  conversation,
  selectedUserId,
  onSelectConversation,
}: ConversationItemProps) {
  // ✅ Safe hook call
  const { data: userDetails, isLoading } = useGetUserDetails(
    conversation.chatId
  );

  // const lastMessage = conversation.messages[conversation.messages.length - 1];
  console.log(conversation);

  return (
    <button
      onClick={() => onSelectConversation(conversation.chatId)}
      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">
            {isLoading ? "Loading..." : `chat ${conversation.chatId}`}
          </p>
          {/* {lastMessage && (
            <p className="text-sm text-gray-500 truncate">
              {lastMessage.content}
            </p>
          )} */}
        </div>
        {conversation.unreadCount > 0 && (
          <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </button>
  );
}
