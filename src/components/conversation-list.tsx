'use client';
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface Conversation {
  name: string;
  message: string;
  time: string;
  unread: number;
  avatar: string;
  color: string;
}

function ConversationList() {
  const router = useRouter();

  const conversations: Conversation[] = [
    { name: 'Sarah Johnson', message: 'Thanks for the feedback!', time: '2m', unread: 2, avatar: 'SJ', color: 'from-pink-500 to-rose-500' },
    { name: 'Mike Chen', message: 'When is the next session?', time: '1h', unread: 0, avatar: 'MC', color: 'from-blue-500 to-cyan-500' },
    { name: 'Emma Davis', message: 'Great tutorial on React!', time: '3h', unread: 1, avatar: 'ED', color: 'from-purple-500 to-indigo-500' },
    { name: 'Alex Rivera', message: 'Can you help with this code?', time: '1d', unread: 0, avatar: 'AR', color: 'from-green-500 to-emerald-500' },
    { name: 'Lisa Wang', message: 'Assignment submitted', time: '2d', unread: 0, avatar: 'LW', color: 'from-orange-500 to-amber-500' },
    { name: 'Alex Rivera', message: 'Can you help with this code?', time: '1d', unread: 0, avatar: 'AR', color: 'from-green-500 to-emerald-500' },
    { name: 'Alex Rivera', message: 'Can you help with this code?', time: '1d', unread: 0, avatar: 'AR', color: 'from-green-500 to-emerald-500' },
    { name: 'Alex Rivera', message: 'Can you help with this code?', time: '1d', unread: 0, avatar: 'AR', color: 'from-green-500 to-emerald-500' },
  ];

  const [showChat, setShowChat] = useState(false)
  

  // Function to handle click on conversation
  const handleSelect = (conv: Conversation) => {
    const username = conv.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/message/chat/${username}`);
    setShowChat(true);
  };

  return (
    <div className="bg-white rounded-md shadow overflow-hidden flex flex-col items-stretch md:w-1/3 w-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide ">
        {conversations.map((conv, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(conv)}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
              idx === 0 ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${conv.color} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
              >
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-gray-900 truncate">{conv.name}</div>
                  <div className="text-xs text-gray-500 flex-shrink-0 ml-2">{conv.time}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 truncate">{conv.message}</div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ml-2">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversationList;
