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
    chats: any
    setChats: (chats:any) =>void
}
interface DecryptedChatObject{
  participants:any,
  messages:any,

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
      chats: "",
      setChats : (chats)=> set(()=>({
          
      }))
    }),
    {
      name: "messages-storage",
      // partialize: (state) => ({
      //   conversations: Array.from(state.conversations.entries()),
      //   activeChatId: state.activeChatId,
      // }),
      // onRehydrateStorage: () => (state) => {
      //   if (!state) return;
      //   state.conversations = new Map(
      //     state.conversations as unknown as [string, Conversation][]
      //   );
      // },
    }
  )
);
