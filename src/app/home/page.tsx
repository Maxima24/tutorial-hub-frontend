'use client'
import React, { useState } from 'react';
import { Home, BookOpen, Settings, MessageCircle, Bell, Menu, X, Play, Clock, TrendingUp, Award, ChevronRight, Search, Filter, Star } from 'lucide-react';
import SideBar from '@/components/sideBar';

export default function LearningPlatform() {
 const [currentPage, setCurrentPage] = React.useState('dashboard');

  // Dashboard data
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

  // Tutorials data

 

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
        <SideBar id={"home"} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentPage === 'dashboard' && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
              <p className="text-gray-600">Continue your learning journey</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Recent Courses */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All <ChevronRight size={18} />
                </button>
              </div>
              <div className="space-y-4">
                {recentCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Play className="text-white" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{course.instructor}</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{course.progress}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      

        {currentPage !== 'dashboard' && currentPage !== 'tutorials' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This page is under construction</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}