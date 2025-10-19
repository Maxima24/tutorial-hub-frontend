'use client'
import React from 'react';
import { Home, BookOpen, Settings, MessageCircle, Bell, Menu, X, Play, Clock, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { useSidebar } from '@/contexts/sideBarContext';

export default function LearningPlatform() {
  const [currentPage, setCurrentPage] = React.useState('dashboard'); 
  const {isCollapsedDesktop} = useSidebar();
  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { label: 'Hours Learned', value: '48', icon: Clock, color: 'from-purple-500 to-pink-500' },
    { label: 'Streak Days', value: '15', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { label: 'Certificates', value: '5', icon: Award, color: 'from-green-500 to-emerald-500' }
  ];

  const recentCourses = [
    { title: 'Advanced React Patterns', progress: 65, duration: '2h 30m', instructor: 'Sarah Johnson' },
    { title: 'UI/UX Design Mastery', progress: 40, duration: '3h 15m', instructor: 'Mike Chen' },
    { title: 'Python for Data Science', progress: 80, duration: '1h 45m', instructor: 'Emma Davis' }
  ];

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50  ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>
      <div className="flex-1 overflow-auto">
        {currentPage === 'dashboard' && (
          <div className="lg:p-8 p-4">
            {/* Header with Time Greeting */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="md:text-3xl text-2xl font-bold text-gray-900 mb-3">
                    Welcome back, John! 👋
                  </h1>
                  <p className="text-lg text-gray-600">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Your Rank</div>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl">🏆</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                      Gold
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="text-white" size={26} />
                        </div>
                        <div className="text-xs font-semibold text-green-500 flex items-center gap-1">
                          <TrendingUp size={14} />
                          +12%
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                      <div className=" pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>This Week</span>
                          <span className="font-semibold">85%</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className={`bg-gradient-to-r ${stat.color} h-full transition-all duration-500`} style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Learning */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
                    <p className="text-sm text-gray-500 mt-1">Pick up where you left off</p>
                  </div>
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium flex items-center gap-1 transition-colors">
                    View All <ChevronRight size={18} />
                  </button>
                </div>
                <div className="space-y-2">
                  {recentCourses.map((course, idx) => (
                    <div key={idx} className="md:flex flex-col gap-5 md:p-5 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all cursor-pointer border-2 border-transparent hover:border-blue-100">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow group-hover:shadow group-hover:scale-110 transition-all duration-300">
                          <Play className="text-white" size={28} />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors flex items-center justify-center">
                          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{course.title}</h3>
                          <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            <Clock size={12} />
                            {course.duration}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {course.instructor.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{course.instructor}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          {/* ✅ fixed parseInt bug */}
                          <span>{Math.floor(course.progress / 10)} / {Math.ceil(course.progress / 10)} lessons</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-700 relative overflow-hidden" style={{ width: `${course.progress}%` }}>
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {course.progress}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed & Learning Goals remain unchanged */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
