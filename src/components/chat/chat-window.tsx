// components/chat/chat-window.tsx
import { useState, useEffect, useRef } from "react";
import { useMessaging } from "@/hooks/useMessaging";
import { useMessagesStore } from "@/store/message-store";
import { useUserStore } from "@/store/auth-store";
import { IParticipants, useChatStore } from "@/store/chat-store";


export function ChatWindow() {
  const [messageInput, setMessageInput] = useState("");
  const [activeConversation,setActiveConversation] = useState<any>()
  const { sendMessage, isConnected } = useMessaging();
  const selectedChat = useChatStore((s)=>s.currentChatId)
  const getChat = useChatStore((s)=>s.getChat)
  const containerRef = useRef<HTMLElement>(null)
  const getParticipantsData = useChatStore((s)=>s.getParticipants)

  const userId = useUserStore((state) => state.user?.id);
  // const conversation = useMessagesStore((state) =>
  //   state.getConversation(recipientId)
  // );
  
  function getMessages(){
  const messages = getChat(selectedChat)
  return messages
  console.log("This is the messages",messages)
  }
  function getParticipants(){
    const participants  = getParticipantsData(selectedChat)
    if(!participants) return ([] as IParticipants[])
    return participants
  }
  const userProfile = getParticipants().find((participant)=>participant.userId !== userId)
  const messagesData = getMessages()
  const messagesEndRef = useRef<HTMLDivElement>(null);

  
  


  //   useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);
 

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = messageInput.trim()
    if (!trimmedMessage || !userId) return;
     setMessageInput("");
    try {
      console.log({
        senderId: userId,
        recieverId: userProfile?.user.id,
        content: trimmedMessage,
      });
      if(!userProfile){
        console.error ("User profile cant be found")
        return 
      }
      await sendMessage({reciepientId:userProfile?.user.id!,
        content: trimmedMessage,
        isGroup:false}
      );
      
    } catch (error) {
      console.error("Failed to send message:", error);
      // You can add toast notification here
      setMessageInput(trimmedMessage)
    }
    
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col h-full rounded-lg mr-2 ring-1 ring-gray-200 backdrop-blur-md shadow-md">
      {/* Header */}
      <div className=" p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{userProfile?.user.name}</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-green-500">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" >
        {messagesData?.map((message) => {
          const isOwn = message.senderId === userId;
          console.log("This are the messages",message)

          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"} rounded-4xl`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 text-white rounded-[50%] bg-blue-400`}
              >
                <p className="break-words">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.createAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className=" p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!isConnected || !messageInput.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
