'use client'
import React from 'react'
import { Search } from 'lucide-react';

import { Sidebar } from '@/components/sidebar';
function page() {
    const [currentPage, setCurrentPage] = React.useState('messages');
  return (
     <div className="flex h-screen bg-gradient-to-br from-slat e-50 via-blue-50 to-indigo-50">
         {/* <Sidebar /> */}

<Sidebar/>
     <div className="flex-1 overflow-auto">
                     {currentPage === 'messages' && (
          <div className="p-8 h-full">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
              <p className="text-gray-600">Connect with students and instructors</p>
            </div>

            <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Conversations List */}
              <div className="col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
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
                <div className="flex-1 overflow-y-auto">
                  {[
                    { name: 'Sarah Johnson', message: 'Thanks for the feedback!', time: '2m', unread: 2, avatar: 'SJ', color: 'from-pink-500 to-rose-500' },
                    { name: 'Mike Chen', message: 'When is the next session?', time: '1h', unread: 0, avatar: 'MC', color: 'from-blue-500 to-cyan-500' },
                    { name: 'Emma Davis', message: 'Great tutorial on React!', time: '3h', unread: 1, avatar: 'ED', color: 'from-purple-500 to-indigo-500' },
                    { name: 'Alex Rivera', message: 'Can you help with this code?', time: '1d', unread: 0, avatar: 'AR', color: 'from-green-500 to-emerald-500' },
                    { name: 'Lisa Wang', message: 'Assignment submitted', time: '2d', unread: 0, avatar: 'LW', color: 'from-orange-500 to-amber-500' }
                  ].map((conv, idx) => (
                    <div
                      key={idx}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        idx === 0 ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${conv.color} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
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

              {/* Chat Window */}
              <div className="col-span-2 bg-white rounded-2xl shadow-lg flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      SJ
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Sarah Johnson</div>
                      <div className="text-xs text-green-500 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Online
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                      <p className="text-gray-900">Hi! I just finished the React Hooks tutorial. It was amazing!</p>
                      <div className="text-xs text-gray-500 mt-1">10:30 AM</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                      <p className="text-white">That's great to hear! Do you have any questions?</p>
                      <div className="text-xs text-blue-100 mt-1">10:32 AM</div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                      <p className="text-gray-900">Yes! Can you explain useEffect dependencies in more detail?</p>
                      <div className="text-xs text-gray-500 mt-1">10:35 AM</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                      <p className="text-white">Of course! The dependency array controls when the effect runs...</p>
                      <div className="text-xs text-blue-100 mt-1">10:37 AM</div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
     </div>
     </div>
  )
}

export default page