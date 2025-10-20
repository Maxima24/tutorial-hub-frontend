'use client'
import { useSidebar } from '@/contexts/sideBarContext';
import React, { useState, useMemo } from 'react';
import { CheckIcon, MessageCircle, Star, Book, User, CheckCircle } from 'lucide-react';
import { AppNotification } from '@/interfaces/notificationInterface';
import { Sidebar } from '@/components';

function Page() {
  const [currentPage] = React.useState('notifications');
  const { isCollapsedDesktop } = useSidebar();
  const [sortOrder, setSortOrder] = useState<"All" | "Unread" | "Courses" | "Messages" | "System" | null>("All");

  const notifications: AppNotification[] = [
    {
      icon: CheckCircle,
      title: 'Course Completed!',
      message: 'Congratulations! You completed "Advanced React Patterns"',
      time: '2 minutes ago',
      unread: true,
      type: "Courses"
    },
    {
      icon: MessageCircle,
      title: 'New Message',
      message: 'Sarah Johnson sent you a message',
      time: '1 hour ago',
      unread: true,
      type: "Messages"
    },
    {
      icon: Star,
      title: 'New Review',
      message: 'Mike Chen rated your course 5 stars',
      time: '3 hours ago',
      unread: false,
      type: "System"
    },
    {
      icon: Book,
      title: 'Course Update',
      message: 'New content added to "TypeScript Fundamentals"',
      time: '1 day ago',
      unread: false,
      type: "Courses"
    },
    {
      icon: CheckIcon,
      title: 'Achievement Unlocked',
      message: 'You earned the "15 Day Streak" badge!',
      time: '2 days ago',
      unread: false,
      type: "Messages"
    },
    {
      icon: User,
      title: 'New Student',
      message: 'Alex Rivera enrolled in your course',
      time: '3 days ago',
      unread: false,
      type: "Messages"
    }
  ];

  const filteredNotifications = useMemo(() => {
    switch (sortOrder) {
      case "Unread":
        return notifications.filter((n) => n.unread);
      case "Courses":
        return notifications.filter((n) => n.type === "Courses");
      case "Messages":
        return notifications.filter((n) => n.type === "Messages");
      case "System":
        return notifications.filter((n) => n.type === "System");
      default:
        return notifications;
    }
  }, [sortOrder]);

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>
      <div className="flex">
        {currentPage === 'notifications' && (
          <div className="p-4 sm:p-6 md:p-8 w-full ">
            {/* Header */}
            <div className="mb-6 sm:mb-8  sm:text-left">
              <h1 className="text-2xl  font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600 text-sm sm:text-base mb-4">Stay updated with your latest activities</p>

            {/* Filters */}
            <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide pb-2">
              {['All', 'Unread', 'Courses', 'Messages', 'Review'].map((filter, idx) => (
                <button
                  key={idx}
                  onClick={() => setSortOrder(filter as any)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg cursor-pointer font-medium text-sm sm:text-base transition-all  ${
                    sortOrder === filter
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Notifications */}
            <div className="space-y-4 py-4 rounded-md bg-white ">
              {filteredNotifications.map((notif, idx) => (
                <div
                  key={idx}
                  className={`not-first:border-t border-neutral-200 md:px-8 px-4 transition-all cursor-pointer w-full max-w-full ${
                    notif.unread ? '' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4 mt-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-200/40 rounded-xl flex items-center justify-center">
                      <notif.icon className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{notif.title}</p>
                        {notif.unread && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></span>}
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base mb-1">{notif.message}</p>
                      <span className="text-xs sm:text-sm text-gray-500">{notif.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 border-2 text-neutral-500 border-gray-200 rounded-xl font-medium hover:border-blue-500 hover:text-blue-500 transition-all text-sm sm:text-base">
                Load More Notifications
              </button>
            </div>
          </div>

      </div> )}
     </div>
    </div>
  );
}

export default Page;
