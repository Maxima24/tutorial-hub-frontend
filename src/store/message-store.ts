import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  chatId: string;
  content: string;
  senderId: string;
  createdAt: string;
}

export interface Conversation {
  chatId: string;
  messages: Message[];
  unreadCount: number;
}
export interface ChatObject {
  chatId: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageAt: string;
}

/* -------------------- Store -------------------- */
interface MessagesState {
  conversations: Map<string, Conversation>; // chatId → Conversation
  activeChatId: string | null;

  hydrateConversations: (
    data: { chatId: string; messages: Message[] }[]
  ) => void;
  setChats: (chats: any, currentUserId: string) => void;
  chats: ChatObject[] | null;
  addMessage: (message: Message) => void;
  setActiveChat: (chatId: string | null) => void;
  markAsRead: (chatId: string) => void;
  clearConversations: () => void;
  getConversation: (chatId: string) => Conversation | undefined;
}

/* -------------------- Helpers -------------------- */
const sortMessages = (messages: Message[]) =>
  messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

/* -------------------- Store -------------------- */
export const useMessagesStore = create<MessagesState>()(
  persist(
    (set, get) => ({
      conversations: new Map(),
      activeChatId: null,
      chats: null,

      hydrateConversations: (data) => {
        set((state) => {
          const conversations = new Map(state.conversations);

          data.forEach(({ chatId, messages }) => {
            conversations.set(chatId, {
              chatId,
              messages: sortMessages([...messages]),
              unreadCount: 0,
            });
          });

          return { conversations };
        });
      },

      addMessage: (message) => {
        set((state) => {
          const conversations = new Map(state.conversations);
          const chatId = message.chatId;

          const existing = conversations.get(chatId) || {
            chatId,
            messages: [],
            unreadCount: 0,
          };

          // Deduplicate
          if (existing.messages.some((m) => m.id === message.id)) {
            return state;
          }

          const updatedMessages = [...existing.messages, message];
          sortMessages(updatedMessages);

          const isActive = state.activeChatId === chatId;

          conversations.set(chatId, {
            ...existing,
            messages: updatedMessages,
            unreadCount: isActive ? 0 : existing.unreadCount + 1,
          });

          return { conversations };
        });
      },
      setChats: (chats, currentUserId) => {
        // assuming you have currentUserId in your store or pass it as argument
        // or pass as param if you don't have it in state

        const conversationLists = chats.map((chat) => {
          const otherParticipant = chat.participants.find(
            (p) => p.user.id !== currentUserId
          );

          const lastMessage = chat.messages[chat.messages.length - 1];

          return {
            chatId: chat.id,
            name: chat.name || otherParticipant?.user.name || "Unknown",
            avatarUrl: otherParticipant?.user.avatarUrl || "",
            lastMessage: lastMessage?.content || "",
            lastMessageAt: lastMessage?.createAt || chat.createdAt,
          };
        });

        set({ conversations: conversationLists });
      },
      setActiveChat: (chatId) => {
        set({ activeChatId: chatId });
        if (chatId) get().markAsRead(chatId);
      },

      markAsRead: (chatId) => {
        set((state) => {
          const conversations = new Map(state.conversations);
          const convo = conversations.get(chatId);

          if (!convo || convo.unreadCount === 0) return state;

          conversations.set(chatId, {
            ...convo,
            unreadCount: 0,
          });

          return { conversations };
        });
      },

      clearConversations: () => {
        set({ conversations: new Map(), activeChatId: null });
      },

      getConversation: (chatId) => get().conversations.get(chatId),
    }),
    {
      name: "messages-storage",
      partialize: (state) => ({
        conversations: Array.from(state.conversations.entries()),
        activeChatId: state.activeChatId,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.conversations = new Map(
          state.conversations as unknown as [string, Conversation][]
        );
      },
    }
  )
);
