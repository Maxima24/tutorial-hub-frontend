// hooks/useMessaging.ts
"use client";

import { useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "@/store/auth-store";
import { useMessagesStore } from "@/store/message-store";
import { api } from "@/service/api";
import { join } from "path";

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
  content: string;
  reciepientId: string;
}

export function useMessaging() {
  const token = useUserStore((s) => s.token);
  const user = useUserStore((s) => s.user);
  const addMessage = useMessagesStore((s) => s.addMessage);
  const setChats = useMessagesStore((s) => s.setChats);
  const setMessages = useMessagesStore((s) => s.hydrateConversations); // Assuming you have this
  const hydrateConversations = useMessagesStore((s) => s.hydrateConversations);

  // ✅ Initialize socket once per token
  useEffect(() => {
    if (!token || socket) return;

    console.log("🚀 Initializing socket connection");

    socket = io("http://localhost:8000", {
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      transports: ["websocket", "polling"],
    });

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket?.id);

      // IIFE to handle async
      (async () => {
        try {
          const userChatData = await getChat();
          console.log("this is the user chats", userChatData);

          // now pass the real array to the store
          setChats(userChatData, user?.id!);
        } catch (err) {
          console.error("Failed to fetch user chats:", err);
        }
      })();
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    socket.on("receiveMessage", (message: Message) => {
      console.log("📨 Received message:", message);
      addMessage(message);
    });

    // Clean up only if token changes / user logs out
    return () => {
      console.log("🧹 Cleaning up socket");
      socket?.off();
      socket?.disconnect();
      socket = null;
    };
  }, [token, addMessage, hydrateConversations]);

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
  const getChat = useCallback(async () => {
    const { data } = await api.get("/chats/getChats", {
      params: {
        userId: user?.id,
      },
    });
    console.log(data);
    return data;
  }, [token, socket]);

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
            if (response?.message) addMessage(response.message);
            resolve(response);
          }
        });
      });
    },
    [addMessage]
  );

  return {
    socket,
    sendMessage,
    fetchMessages,
    getChat, // Export this new function
    isConnected: socket?.connected ?? false,
  };
}
