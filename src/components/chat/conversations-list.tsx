// components/chat/conversations-list.tsx
import { useMessagesStore } from "@/store/message-store";
import { ConversationItem } from "./conversation-item";

interface ConversationsListProps {
  onSelectConversation: (userId: string) => void;
  selectedUserId: string | null;
}

export function ConversationsList({
  onSelectConversation,
  selectedUserId,
}: ConversationsListProps) {
  const conversations = useMessagesStore((state) => state.conversations);

  return (
    <div className="border-r h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>

      <div className="divide-y">
        {Array.from(conversations.values()).map((conversation) => (
          <ConversationItem
            key={conversation.chatId}
            conversation={conversation}
            selectedUserId={selectedUserId}
            onSelectConversation={onSelectConversation}
          />
        ))}

        {conversations.size === 0 && (
          <div className="p-8 text-center text-gray-500">
            No conversations yet
          </div>
        )}
      </div>
    </div>
  );
}
