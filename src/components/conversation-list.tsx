'use client'
import React, { useState } from 'react'
import { Send, Phone, Info, MoreVertical, Search } from 'lucide-react'

export default function MessagePage() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'received', text: 'Hi! I just finished the React Hooks tutorial. It was amazing!', time: '10:30 AM' },
    { id: 2, type: 'sent', text: 'That\'s great to hear! Do you have any questions?', time: '10:32 AM' },
    { id: 3, type: 'received', text: 'Yes! Can you explain useEffect dependencies in more detail?', time: '10:35 AM' },
    { id: 4, type: 'sent', text: 'Of course! The dependency array controls when the effect runs...', time: '10:37 AM' },
  ])
  const [inputValue, setInputValue] = useState('')

  const conversations = [
    { id: 1, name: 'Sarah Johnson', message: 'Thanks for the feedback!', time: '2m', avatar: 'SJ', color: 'from-pink-500 to-rose-500', unread: true },
    { id: 2, name: 'Mike Chen', message: 'When is the next session?', time: '1h', avatar: 'MC', color: 'from-blue-500 to-cyan-500', unread: false },
    { id: 3, name: 'Emma Davis', message: 'Great tutorial on React!', time: '3h', avatar: 'ED', color: 'from-purple-500 to-pink-500', unread: false },
    { id: 4, name: 'Alex Rivera', message: 'Can you help with this code?', time: '1d', avatar: 'AR', color: 'from-green-500 to-emerald-500', unread: false },
    { id: 5, name: 'Lisa Wang', message: 'Assignment submitted', time: '3d', avatar: 'LW', color: 'from-orange-500 to-red-500', unread: false },
  ]

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        type: 'sent',
        text: inputValue,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
      setInputValue('')
    }
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Conversations Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`px-4 py-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors ${
                conv.unread ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${conv.color} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                  {conv.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conv.message}</p>
                </div>
                {conv.unread && <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="px-8 py-5 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              SJ
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sarah Johnson</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
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
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
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
        <div className="px-8 py-6 border-t border-gray-200 bg-white">
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
    </div>
  )
}