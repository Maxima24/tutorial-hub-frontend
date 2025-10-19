'use client'
import React from 'react'
import { Home, BookOpen, Settings, MessageCircle, Bell, Menu, X, Play, Clock, TrendingUp, Award, ChevronRight, Search, Filter, Star } from 'lucide-react';
import SideBar from '@/components/sideBar';
import useVideosStore from '@/store/videos-store';


function Page() {
  const {videos,searchQuery,setSearchQuery,filteredVideos}= useVideosStore()
     const [currentPage, setCurrentPage] = React.useState('tutorials');
     const displayedVideos = searchQuery?filteredVideos:videos
  return (
    <div className='flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
          <SideBar id={"tutorials"} />
             <div className="flex-1 overflow-auto">
                  {/** main content */}
          {currentPage === 'tutorials' && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Tutorials</h1>
              <p className="text-gray-600">Master new skills with expert-led courses</p>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e)=> setSearchQuery(e.target.value)}
                  className="w-full text-black pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <button className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors flex items-center gap-2 font-medium">
                <Filter size={20} />
                Filter
              </button>
            </div>

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVideos.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                >
                  <div className={`h-48 ${tutorial.thumbnail} relative flex items-center justify-center`}>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-white ml-1" size={28} />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      {tutorial.difficulty}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                      {tutorial.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{tutorial.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                        <span className="font-semibold">{tutorial.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-600">{tutorial.students} students</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
             </div>


      
    </div>
  )
}

export default Page