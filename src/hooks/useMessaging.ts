// hooks/useMessaging.ts
"use client";

import { useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "@/store/auth-store";
import { useMessagesStore } from "@/store/message-store";
import { api } from "@/service/api";
import { join } from "path";
import { useChatStore } from "@/store/chat-store";

let socket: Socket | null = null;

interface Message {
  id: string;
  content: string;
  senderId: string;
  recieverId: string;
  createdAt: string;
}

interface SendMessagePayload {
  isGroup: boolean;
  reciepientId:string
  content:string
  
}

export function useMessaging() {
  const token = useUserStore((s) => s.token);
  const user = useUserStore((s) => s.user); 
  const setChats = useChatStore((s) => s.setChats);
  const appendMessage = useChatStore((s)=>s.appendMessage)

  // ✅ Initialize socket once per token
  const getChat = useCallback(async () => {
  if (!user?.id) return [];

  try {
    const { data } = await api.get("/chats/getChats", {
      params: { userId: user.id },
    });

    console.log("API data:", data);

    // If API returns { chats: [...] }
    const chatsArray = data.chats || data; // depends on your API
    setChats(chatsArray);

    return chatsArray;
  } catch (err) {
    console.error("Failed to fetch chats", err);
    return [];
  }
}, [user?.id, setChats]);
  useEffect(() => {
  if (!token || !user?.id || socket) return;

  console.log("🚀 Initializing socket connection");

  socket = io(process.env.NEXT_PUBLIC_API_URL, {
    auth: { token },
    autoConnect: true,
    transports: ["websocket", "polling"],
  });

  socket.on("connect", async () => {
    console.log("✅ Socket connected:", socket?.id);

    const userChatData = await getChat(); // this now correctly fetches
    console.log("User chats:", userChatData);
  });

  socket.on("receiveMessage", (message:any) => {
    console.log("📨 Received message:", message);
    appendMessage(message);
  });

  return () => {
    console.log("🧹 Cleaning up socket");
    socket?.off();
    socket?.disconnect();
    socket = null;
  };
}, [token, user?.id, getChat, appendMessage]);

  // ✅ Fetch messages for a specific conversation
  const fetchMessages = useCallback((otherUserId: string) => {
    if (!socket || !socket.connected) {
      return Promise.reject(new Error("Socket not connected"));
    }

    return new Promise<Message[]>((resolve, reject) => {
      socket!.emit("getMessages", { otherUserId }, (response: any) => {
        if (response?.status === "error") {
          reject(new Error(response.message));
        } else {
          console.log("📬 Messages received:", response.messages?.length);
          resolve(response.messages || []);
        }
      });
    });
  }, []);
 


  // ✅ Send a message safely
  const sendMessage = useCallback(
    (payload: SendMessagePayload) => {
      if (!socket || !socket.connected) {
        return Promise.reject(new Error("Socket not connected"));
      }

      return new Promise((resolve, reject) => {
        console.log(payload);
        socket!.emit("sendMessage", payload, (response: any) => {
          if (response?.error || response?.status === "error") {
            reject(new Error(response.error || response.message));
          } else {
            if (response?.message) appendMessage(response.message);
            resolve(response);
          }
        });
      });
    },
    [appendMessage]
  );

  return {
    socket,
    sendMessage,
    fetchMessages,
    getChat, // Export this new function
    isConnected: socket?.connected ?? false,
  };
}
