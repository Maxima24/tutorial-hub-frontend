'use client'
import { useSidebar } from '@/contexts/sideBarContext';
import React from 'react'

function page() {
  const [currentPage, setCurrentPage] = React.useState('notifications');
  const {isCollapsedDesktop} = useSidebar()
    
  return (
     <div className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50  ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>

      <div className="flex ">
          {currentPage === 'notifications' && (
          <div className="p-8 flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with your latest activities</p>
            </div>

            <div className=" flex flex-col">
              {/* Notification Filters */}
              <div className="flex gap-3 mb-6">
                {['All', 'Unread', 'Courses', 'Messages', 'System'].map((filter, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                      idx === 0
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Notifications List */}
              <div className="space-y-4 flex-1 ">
                {[
                  {
                    icon: '🎉',
                    title: 'Course Completed!',
                    message: 'Congratulations! You completed "Advanced React Patterns"',
                    time: '2 minutes ago',
                    unread: true,
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    icon: '💬',
                    title: 'New Message',
                    message: 'Sarah Johnson sent you a message',
                    time: '1 hour ago',
                    unread: true,
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    icon: '⭐',
                    title: 'New Review',
                    message: 'Mike Chen rated your course 5 stars',
                    time: '3 hours ago',
                    unread: false,
                    color: 'from-yellow-500 to-orange-500'
                  },
                  {
                    icon: '📚',
                    title: 'Course Update',
                    message: 'New content added to "TypeScript Fundamentals"',
                    time: '1 day ago',
                    unread: false,
                    color: 'from-purple-500 to-indigo-500'
                  },
                  {
                    icon: '🏆',
                    title: 'Achievement Unlocked',
                    message: 'You earned the "15 Day Streak" badge!',
                    time: '2 days ago',
                    unread: false,
                    color: 'from-pink-500 to-rose-500'
                  },
                  {
                    icon: '👥',
                    title: 'New Student',
                    message: 'Alex Rivera enrolled in your course',
                    time: '3 days ago',
                    unread: false,
                    color: 'from-teal-500 to-cyan-500'
                  }
                ].map((notif, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-2xl shadow p-6 hover:shadow transition-all cursor-pointer ${
                      notif.unread ? 'border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${notif.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                        {notif.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="font-semibold text-gray-900">{notif.title}</div>
                          {notif.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{notif.message}</p>
                        <div className="text-sm text-gray-500">{notif.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <button className="px-6 py-3 cursor-pointer border-2 border-gray-200 rounded-xl font-medium hover:border-blue-500 hover:text-blue-500 transition-all">
                  Load More Notifications
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
  )
}

export default page