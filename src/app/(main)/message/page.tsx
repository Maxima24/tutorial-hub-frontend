'use client'
import React, { useState } from 'react'
import { Send, Phone, Info, MoreVertical, Search } from 'lucide-react'
import { useUserStore } from '@/store/auth-store';
import { useMessaging } from '@/hooks/useMessaging';
const ConversationList = ({ conversations, onSelect }:{conversations:Record<any,any>[],onSelect:any}) => {
  return (
    <div className="w-80 border-r border-gray-200 fixed bg-white top-20  h-full overflow-y-auto">
      <h2 className="px-4 py-4 text-lg font-semibold border-b dark:border-gray-200">
        Messages
      </h2>

      <ul className="space-y-1 p-2">
        {conversations.map((chat,index) => (
          <li
            key={chat.id}
            onClick={()=> onSelect(chat.id)}
            className="flex cursor-pointer items-center space-x-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            {/* Avatar */}
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-white font-semibold`}
            >
              {chat.avatar}
            </div>

            {/* Details */}
            <div className="flex flex-col flex-1">
              <span className="font-medium text-sm">{chat.name}</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {chat.message}
              </span>
            </div>

            {/* Time + unread dot */}
            <div className="flex flex-col items-end text-xs text-neutral-400 dark:text-neutral-500">
              <span>{chat.time}</span>
              {chat.unread && (
                <span className="mt-1 w-2 h-2 rounded-full bg-blue-500"></span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default  function MessagePage() {
  const [message, setMessage] = useState({
    senderId:"",
    content:"",
    recieverId:""
  })
  const {sendMessage,messages:Messages,isConnected} =useMessaging()
  const [messages,setMessages] = useState([{
    id:"1",
    type:"recieved",
    text:"i love you babe",
    time: Date.now()
  },
{
    id:"1",
    type:"sent",
    text:"i knw",
    time: Date.now()
  },{
    id:"1",
    type:"recieved",
    text:"abi Good wan punish you nhi, u no sabi wetin u suppose talk back  ",
    time: Date.now()
  }])
  const [inputValue, setInputValue] = useState('')
  const [selectedChatId,setSelectedChatId] = useState(null)
   const user = useUserStore((state)=>state.user)
    React.useEffect(()=>{
  console.log(selectedChatId)
    
  },[selectedChatId])
   if(!user)  return null
  const conversations = [
    { id: "00691969-7277-44e9-8f6b-2279cc9bfab4", name: 'Anastasia', message: 'Thanks for the feedback!', time: '2m', avatar: 'SJ', color: 'from-pink-500 to-rose-500', unread: true },
     { id: "00691969-7277-43e9-8f6b-2279cc9bfab4", name: 'Faith', message: 'Thanks for the feedback!', time: '2m', avatar: 'SJ', color: 'from-pink-500 to-rose-500', unread: true }
    , ]
  const currentChat = conversations.find(c=> c.id === selectedChatId)
 


  const handleSendMessage = async  () => {
    if (inputValue.trim()) {
      setMessage({...message, 
        senderId:user?.id,
        content:inputValue,
        recieverId:currentChat?.id!
      }
    )
      }
     
      const payload = {
          senderId:user?.id,
        content:inputValue,
        recieverId:currentChat?.id!
      }
      console.log(payload)
    const messaged =  sendMessage(payload)
     setInputValue('')
    console.log(messaged)
    }
  
  return (
    <div className="flex  w-full  relative bg-gradient-to-br from-gray-50 to-gray-100">
     <ConversationList
        conversations={conversations}
        onSelect={setSelectedChatId}

      />
      {/* Chat Window */}

      {
      
        currentChat?(
             <div className=" ml-80 w-full h-screen overflow-hidden  flex flex-col bg-white">
        {/* Chat Header */}
        <div className="px-8 basis-1/16 py-2 border-b fixed w-full border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              SJ
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{currentChat.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex  items-center gap-3">
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Info className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="  px-8 py-4 mt-22 basis-2/3 overflow-y-auto ">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col ${message.type === 'sent' ? 'items-end' : 'items-start'} max-w-xl`}>
                <div
                  className={`px-6 py-3 rounded-2xl ${
                    message.type === 'sent'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-base">{message.text}</p>
                </div>
                <span className={`text-sm mt-2 ${message.type === 'sent' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="px-8 py-4 mt-24 basis-1/16 border-b  border-t border-blue-200 bg-white">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-base"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl transition-colors flex items-center justify-center font-medium"
            >
              <Send className="w-5 h-5 mr-2" />
              Send
            </button>
          </div>
        </div>
      </div>
        ):(
            <div className="h-full w-full flex items-center justify-center text-neutral-400">
            Select a conversation to start chatting
          </div>
        )
      }
     
    </div>
  )
}