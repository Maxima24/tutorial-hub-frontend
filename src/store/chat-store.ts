import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IChatStore {
  chats: Map<string, Ichat>;
  replyTo: Map<string, IMessage>;
  setChats: (chats: Ichat[]) => void;
  setReplyto: (replyToMessage: IMessage[]) => void;
  appendMessage: (message: IMessage) => void;
  appendReply: (replyObject: IReply) => void;
  getChat: (chatId: string) => IMessage[];
  getParticipants: (chatId: string) => IParticipants[];
  currentChatId: string;
  setCurrentChatId: (chatId: string) => void;
  clearCurrentChatId: () => void;
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
 export interface IMessage {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  chatId: string;
  sender: ISender;
  replies: IReply[];
}
interface Ichat {
  id: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  participants: IParticipants[];
  messages: IMessage[];
}
 export interface IReply {
  id: string;
  message: string;
  messageId: string;
  senderId: string;
  parentReplyId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  chatId: string;
}
export const useChatStore = create<IChatStore>()(
  persist(
    (set, get) => ({
      chats: new Map(),
      replyTo: new Map(),
      currentChatId: "",
      setCurrentChatId: (chatId: string) =>
        set(() => ({
          currentChatId: chatId,
        })),
      setReplyto: (replyObjects) =>
        set(() => ({
          replyTo: new Map(
            replyObjects.map((replyObject) => [replyObject.id, replyObject]),
          ),
        })),
    appendReply: (replyObject) =>
  set((state) => {
    const chat = state.chats.get(replyObject.chatId);

    if (!chat) return state;

    // check duplicate reply
    const replyIds = new Set(
      chat.messages.flatMap(m =>
        m.replies?.map(r => r.id) || []
      )
    );

    if (replyIds.has(replyObject.id)) return state;

    // update messages immutably
    const updatedMessages = chat.messages.map(message => {
      if (message.id === replyObject.messageId) {
        return {
          ...message,
          replies: [...(message.replies || []), replyObject],
        };
      }
      return message;
    });

    const updatedChat = {
      ...chat,
      messages: updatedMessages,
    };

    // update Map immutably
    const newChats = new Map(state.chats);
    newChats.set(replyObject.chatId, updatedChat);

    return {
      chats: newChats
    };
  }),

      clearCurrentChatId: () =>
        set(() => ({
          currentChatId: "",
        })),
      getParticipants: (chatId) => {
        const participants = get().chats.get(chatId)?.participants;
        return participants || [];
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
              (a, b) => Number(a.createdAt) - Number(b.createdAt),
            ),
          };
          const updatedChats = new Map(state.chats);
          updatedChats.set(message.chatId, updatedChat);
          return { chats: updatedChats };
        }),
      getChat: (chatId: string) => {
        console.log("THe currentChatId is ", chatId);
        const currentChat = get().chats.get(chatId);
        return currentChat?.messages || ([] as IMessage[]);
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
