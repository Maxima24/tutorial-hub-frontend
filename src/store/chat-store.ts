import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IChatStore {
  chats: Map<string, Ichat>;
  setChats: (chats: Ichat[]) => void;
  appendMessage: (message: IMessage) => void;
  getChat: (chatId: string) => IMessage[];
  getParticipants:(chatId:string) => IParticipants[]
  currentChatId: string;
  setCurrentChatId: (chatId: string) => void;
  clearCurrentChatId: () => void
}
interface IUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  createdAt: string;
  password: string;
  updatedAt: string;
  verified: boolean;
}

 export interface IParticipants {
  id: string;
  chatId: string;
  userId: string;
  user: IUser;
}
interface ISender {
  id: string;
  name: string;
  email: string;
}
interface IMessage {
  id: string;
  senderId: string;
  content: string;
  createAt: string;
  updatedAt: string;
  chatId: string;
  sender: ISender;
}
interface Ichat {
  id: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  participants: IParticipants[];
  messages: IMessage[];
}
export const useChatStore = create<IChatStore>()(
  persist(
    (set, get) => ({
      chats: new Map(),
      currentChatId: "",
      setCurrentChatId: (chatId: string) =>
        set(() => ({
          currentChatId: chatId,
        })),
      clearCurrentChatId:()=> set(()=>({
            currentChatId:""
        })),
        getParticipants:(chatId)=> {
            const participants  = get().chats.get(chatId)?.participants
            return participants || []
        },
      setChats: (chatsArray) =>
        set(() => ({
          chats: new Map(chatsArray.map((chat) => [chat.id, chat])),
        })),
      appendMessage: (message) =>
        set((state) => {
          const chat = state.chats.get(message.chatId);
          if (!chat) return state;
          const messageIds = new Set(chat.messages.map((m) => m.id));
          if (messageIds.has(message.id)) return state;
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, message].sort(
              (a, b) => Number(a.createAt) - Number(b.createAt),
            ),
          };
          const updatedChats = new Map(state.chats);
          updatedChats.set(message.chatId, updatedChat);
          return { chats: updatedChats };
        }),
      getChat: (chatId: string) => {
        console.log("THe currentChatId is ", chatId)
        const currentChat = get().chats.get(chatId);
        return currentChat?.messages || ([] as IMessage[])
      },
    }),
    {
      name: "Chats-Store",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              chats: new Map(state.chats),
            },
          };
        },
        setItem: (name, value) => {
          const str = JSON.stringify({
            state: {
              ...value.state,
              chats: Array.from(value.state.chats.entries()),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
