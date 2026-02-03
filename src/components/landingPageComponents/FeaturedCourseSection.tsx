'use client';

import { BookOpen, Clock, Users, Star, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedCoursesSection() {
  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Angela Yu',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
      duration: '52 hours',
      students: '12,453',
      rating: 4.8,
      lessons: 42,
      level: 'beginner',
      category: 'WEB DEVELOPMENT',
      price: 'Free',
    },
    {
      id: 2,
      title: 'Machine Learning A-Z',
      instructor: 'Kirill Eremenko',
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop',
      duration: '44 hours',
      students: '8,234',
      rating: 4.9,
      lessons: 38,
      level: 'intermediate',
      category: 'DATA SCIENCE',
      price: 'Free',
    },
    {
      id: 3,
      title: 'Advanced React & Redux',
      instructor: 'Stephen Grider',
      thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop',
      duration: '28 hours',
      students: '15,678',
      rating: 4.7,
      lessons: 24,
      level: 'intermediate',
      category: 'FRONTEND',
      price: 'Free',
    },
  ];

  const levelColors = {
    beginner: { bg: 'bg-green-100', text: 'text-green-700', label: 'Beginner' },
    intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Intermediate' },
    advanced: { bg: 'bg-red-100', text: 'text-red-700', label: 'Advanced' },
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium text-sm mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Featured Courses</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Top Rated{' '}
              <span className="bg-blue-500  bg-clip-text text-transparent">
                Courses
              </span>
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Comprehensive courses designed to take you from zero to hero
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => {
            const levelStyle = levelColors[course.level];
            return (
              <div
                key={course.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        View Course
                      </button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg uppercase tracking-wide">
                    {course.category}
                  </div>

                  {/* Level Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${levelStyle.bg} ${levelStyle.text}`}>
                    {levelStyle.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">by {course.instructor}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-bold text-gray-900">{course.rating}</span>
                      <span className="text-gray-600 text-sm">({course.students})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{course.students} students</span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}