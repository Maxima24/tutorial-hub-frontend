import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUserStore } from '@/store/auth-store';

interface Message {
  id: string;
  content: string;
  senderId: string;
  recieverId: string;
  createdAt: string;
}

interface SendMessagePayload {
  senderId: string;
  content: string;
  recieverId: string;
}

export function useMessaging() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const token = useUserStore.getState().token;

  // Initialize socket connection
  useEffect(() => {
    if (!token) {
      console.log('No token available');
      return;
    }

    const newSocket = io('http://localhost:3002', {
      auth: {
        token: token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    });

    newSocket.on('receiveMessage', (message: Message) => {
      console.log('Message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const sendMessage = useCallback(
    (payload: SendMessagePayload) => {
      if (!socket || !isConnected) {
        console.error('Socket not connected');
        return;
      }

      socket.emit('sendMessage', payload, (response: any) => {
        console.error('Server response:', response);
      });
    },
    [socket, isConnected]
  );

  return {
    socket,
    messages,
    isConnected,
    sendMessage,
  };
}