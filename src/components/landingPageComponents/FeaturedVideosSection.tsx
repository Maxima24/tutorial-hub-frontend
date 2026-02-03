'use client';

import { Play, Clock, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedVideosSection() {
  const videos = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
      duration: '24:15',
      views: '12.5K',
      category: 'Web Development',
      difficulty: 'Beginner',
    },
    {
      id: 2,
      title: 'Python Data Science Masterclass',
      instructor: 'Michael Chen',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop',
      duration: '42:30',
      views: '28.3K',
      category: 'Data Science',
      difficulty: 'Intermediate',
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Emma Williams',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
      duration: '18:45',
      views: '15.7K',
      category: 'Design',
      difficulty: 'Beginner',
    },
    {
      id: 4,
      title: 'Advanced JavaScript Patterns',
      instructor: 'David Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop',
      duration: '35:20',
      views: '22.1K',
      category: 'Programming',
      difficulty: 'Advanced',
    },
  ];

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm mb-4">
              <Play className="w-4 h-4" />
              <span>Featured Videos</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Popular{' '}
              <span className="bg-blue-500 bg-clip-text text-transparent">
                Tutorials
              </span>
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Explore our most-watched video tutorials from expert instructors
            </p>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gray-200">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black bg-opacity-75 text-white text-sm font-semibold rounded-lg flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>

                {/* Difficulty Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[video.difficulty]}`}>
                  {video.difficulty}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                  {video.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-medium">{video.instructor}</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/videos"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>View All Videos</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}