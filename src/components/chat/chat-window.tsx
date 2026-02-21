// components/chat/chat-window.tsx
import { useState, useEffect, useRef, useMemo } from "react";
import { ReplyMessagePayload, useMessaging } from "@/hooks/useMessaging";
import { useUserStore } from "@/store/auth-store";
import { IMessage, IParticipants, useChatStore } from "@/store/chat-store";
import { PopUpMenu } from "./popup-menu";

export function ChatWindow() {
  const [messageInput, setMessageInput] = useState("");
  const { sendMessage, replyMessage, isConnected } = useMessaging();
  const [replyTo, setReplyTo] = useState<any>()
  const [messageForAction, setMessageForAction] = useState<any>()
  const [popupOpen, setPopupOpen] = useState(false)
  const [messages,setMessages] = useState<any>()
  const selectedChat = useChatStore((s) => s.currentChatId);
const chat = useChatStore((state) =>
  selectedChat ? state.chats.get(selectedChat) : null
);

const messagesData = chat?.messages || [];


  const getParticipantsData = useChatStore((s) => s.getParticipants);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: Boolean
    anchorEl: HTMLElement | null,
    messageId: string
    isOwn: boolean | null
  } | null>(null)
  useEffect(() => {
    console.log(contextMenu)
  }, [contextMenu, setContextMenu])

  const userId = useUserStore((state) => state.user?.id);

 

  function getParticipants() {
    const participants = getParticipantsData(selectedChat);
    if (!participants) return [] as IParticipants[];
    return participants;
  }
  function handleRightClick({e, message, isOwn}:{
    e: React.MouseEvent<HTMLDivElement>, message: any, isOwn: boolean}
  ) {
    e.preventDefault()
    console.log("The right click button has just been used")
    setMessageForAction(message)
    setContextMenu({
      visible: true,
      anchorEl: e.currentTarget,
      messageId: message.id,
      isOwn
    })
  }

  const userProfile = getParticipants().find(
    (participant) => participant.userId !== userId
  );
 

  /**   Hanlde reply functionality */
  const getFlattenedMessages = (messages: IMessage[]) => {
  const flattened: any[] = []

  messages.forEach(message => {
    flattened.push({
      ...message,
      type: "message",
    })

    message.replies?.forEach(reply => {
      flattened.push({
        ...reply,
        type: "reply",
        parentMessage: message,
      })
    })
  })

  // sort by time ascending
  flattened.sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  )

  return flattened
}

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData, messagesData?.length]); // Added length as dependency

  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage || !userId) return;
    setMessageInput("");

    try {
      if (!userProfile) {
        console.error("User profile cant be found");
        return;
      }
      if (replyTo) {
      await replyMessage({
        reciepientId: userProfile?.user.id!,
        content: trimmedMessage,
        isGroup: false,
        // If replying to a reply, target the root parent
        messageId: replyTo.type === "reply" ? replyTo.parentMessage.id : replyTo.id,
      });
      setReplyTo(null); // ✅ clear reply state
    } else {
        await sendMessage({
          reciepientId: userProfile?.user.id!,
          content: trimmedMessage,
          isGroup: false,
        });
      }

    } catch (error) {
      console.error("Failed to send message:", error);
      setMessageInput(trimmedMessage);
    }
  };
  const flattenedMessage = useMemo(()=>{
    if(!messagesData) return []
    return getFlattenedMessages(messagesData)
  },[messagesData])


  console.log({flattenedMessage})
 

  return (
    <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col h-full rounded-lg mr-2 ring-1 ring-gray-200 backdrop-blur-md shadow-md">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{userProfile?.user.name}</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"
                }`}
            />
            <span className="text-sm text-green-500">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
       
{flattenedMessage?.map(item => {
  const isOwn = item.senderId === userId
  return (
    <div
      key={item.id}
      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div className="max-w-[70%] rounded-lg p-3 bg-blue-400 text-white"
      onContextMenu={(e)=>handleRightClick({
        e,isOwn,message:item
      })}>

        {/* Show reference preview if reply */}
        {item.type === "reply" && (
          <div className="bg-blue-300 text-xs p-1 rounded mb-1 opacity-80">
            replying to: {item.parentMessage.content}
          </div>
        )}
        
        <p>{item.content}</p>

        <span className="text-xs opacity-70">
          {new Date(item.createdAt).toLocaleTimeString()}
        </span>

      </div>
    </div>
  )
})}
     
      <div ref={messagesEndRef} />
    </div>

     {
        contextMenu && contextMenu.visible && (
          <PopUpMenu
            anchorEl={contextMenu.anchorEl}
            messageId={contextMenu.messageId}
            setPopupOpen={setContextMenu}
            isOwn={contextMenu.isOwn}
            setReplyTo={setReplyTo}
            messageObject={messageForAction}
          />
        )
      }


      {/* Input */ }
  <form onSubmit={handleSendMessage} className="p-4">

    {/* Reply preview */}
    {replyTo && (
      <div className="mb-2 bg-gray-100 border-l-4 border-blue-500 p-2 rounded-md flex justify-between items-center">

        <div className="overflow-hidden">
          <p className="text-xs text-gray-500">
            Replying to {replyTo.senderId === userId ? "yourself" : "user"}
          </p>

          <p className="text-sm truncate max-w-[250px]">
            {replyTo.content}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setReplyTo(null)}
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

      </div>
    )}

    {/* Your existing input */}
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

    </div >
  );
}