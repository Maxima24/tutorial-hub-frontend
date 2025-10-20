'use client'
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Play, Clock, Users, Star, BarChart, Award, CheckCircle, Lock, Heart, Share2, Download, MessageCircle, ThumbsUp, ChevronDown, ChevronUp, Calendar, Video, FileText, Code 
} from 'lucide-react';
import useTutorialsStore from '@/store/tutorial-store';
import { useParams, useRouter } from 'next/navigation';
import {useSidebar} from "@/contexts/sideBarContext"

export default function TutorialDetailPage() {
  const { id } = useParams();
  const tutorialId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { searchedTutorial: tutorial, getTutorialById } = useTutorialsStore();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (tutorialId) {
      getTutorialById(tutorialId);
    }
  }, [tutorialId]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'exercise': return <Code size={16} />;
      case 'quiz': return <FileText size={16} />;
      case 'project': return <Award size={16} />;
      default: return <Play size={16} />;
    }
  };
  const {isCollapsedDesktop} = useSidebar();

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50  ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
              <button 
                className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors" 
                onClick={() => router.back()}
              >
                <ArrowLeft size={20} />
                Back to Tutorials
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Content */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      {tutorial?.category}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      {tutorial?.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-yellow-400/90 text-yellow-900 rounded-full text-sm font-semibold">
                      Bestseller
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold">{tutorial?.title}</h1>
                  <p className="text-xl text-blue-100">{tutorial?.description}</p>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="fill-yellow-400 text-yellow-400" size={20} />
                      <span className="font-bold text-lg">{tutorial?.rating}</span>
                      <span className="text-blue-100">{tutorial?.reviews.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={20} />
                      <span>{tutorial?.students} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <span>{tutorial?.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">
                        {tutorial?.instructor.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">Created by {tutorial?.instructor.name}</div>
                        <div className="text-sm text-blue-100">{tutorial?.instructor.title}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Card - Preview/Enrollment */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-8">
                    <div className={`${tutorial?.thumbnail} h-48 flex items-center justify-center relative group cursor-pointer`}>
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-white ml-1" size={32} />
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        Preview
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-baseline gap-3 mb-6">
                        <div className="text-4xl font-bold text-gray-900">${tutorial?.price}</div>
                        <div className="text-xl text-gray-400 line-through">${tutorial?.originalPrice}</div>
                        <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">
                          50% OFF
                        </div>
                      </div>

                      {!isEnrolled ? (
                        <>
                          <button
                            onClick={() => setIsEnrolled(true)}
                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all mb-3"
                          >
                            Enroll Now
                          </button>
                          <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors mb-4">
                            Add to Cart
                          </button>
                        </>
                      ) : (
                        <button className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all mb-4 flex items-center justify-center gap-2">
                          <CheckCircle size={24} />
                          Enrolled - Start Learning
                        </button>
                      )}

                      <div className="text-center text-sm text-gray-500 mb-4">
                        30-Day Money-Back Guarantee
                      </div>

                      <div className="border-t border-gray-200 pt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Video size={16} />
                          <span>12.5 hours video</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Download size={16} />
                          <span>Downloadable resources</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Award size={16} />
                          <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MessageCircle size={16} />
                          <span>Q&A support</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4 mt-4 flex gap-2">
                        <button
                          onClick={() => setIsFavorite(!isFavorite)}
                          className={`flex-1 px-4 py-2 border-2 rounded-lg font-semibold transition-all ${
                            isFavorite
                              ? 'border-red-500 text-red-500 bg-red-50'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <Heart className={isFavorite ? 'fill-red-500' : ''} size={18} />
                        </button>
                        <button className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Main Content */}
        
                            <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200">
                {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-semibold capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tutorial?.WhatYouLearn.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                      <ul className="space-y-2">
                        {tutorial?.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        This comprehensive course covers everything you need to know about React Hooks. 
                        Whether you're a beginner looking to understand the basics or an experienced developer 
                        wanting to master advanced patterns, this course has you covered.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        You'll build real-world projects, learn best practices, and gain the confidence to use 
                        React Hooks effectively in your own applications. By the end of this course, you'll be 
                        able to build complex React applications using modern patterns and techniques.
                      </p>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
                      <div className="text-sm text-gray-600">
                        {tutorial?.curriculum.length} modules • {tutorial?.curriculum.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                      </div>
                    </div>

                    {tutorial?.curriculum.map((module, moduleIdx) => (
                      <div key={moduleIdx} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedModule(expandedModule === moduleIdx ? -1 : moduleIdx)}
                          className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                              {moduleIdx + 1}
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-gray-900">{module.title}</div>
                              <div className="text-sm text-gray-600">{module.lessons.length} lessons • {module.duration}</div>
                            </div>
                          </div>
                          {expandedModule === moduleIdx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        {expandedModule === moduleIdx && (
                          <div className="border-t border-gray-200">
                            {module.lessons.map((lesson, lessonIdx) => (
                              <div
                                key={lessonIdx}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="text-blue-600">{getTypeIcon(lesson.type)}</div>
                                  <span className="text-gray-900">{lesson.title}</span>
                                  {lesson.preview && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                                      Preview
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-gray-600">{lesson.duration}</span>
                                  {!isEnrolled && !lesson.preview && <Lock size={16} className="text-gray-400" />}
                                  {(isEnrolled || lesson.preview) && <Play size={16} className="text-blue-600 cursor-pointer" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === 'instructor' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Instructor</h2>
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                        {tutorial?.instructor.avatar}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tutorial?.instructor.name}</h3>
                        <p className="text-gray-600 mb-4">{tutorial?.instructor.title}</p>
                        <div className="flex flex-wrap gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Star className="fill-yellow-400 text-yellow-400" size={16} />
                            <span className="font-semibold">{tutorial?.instructor.rating} Instructor Rating</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} />
                            <span>{tutorial?.instructor.students} Students</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Play size={16} />
                            <span>{tutorial?.instructor.courses} Courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Sarah is a Senior React Developer with over 8 years of experience building web applications. 
                      She has worked with major tech companies and has a passion for teaching and sharing her knowledge.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Her courses are known for their clarity, practical approach, and real-world examples. 
                      With over 50,000 students worldwide, Sarah continues to inspire and educate aspiring developers.
                    </p>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                        Write a Review
                      </button>
                    </div>

                    <div className="space-y-6">
                      {tutorial?.reviews.map((review, idx) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-xl">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {review.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="font-bold text-gray-900">{review.name}</div>
                                  <div className="text-sm text-gray-500">{review.date}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(Number(review.rating))].map((_, i) => (
                                    <Star key={i} className="fill-yellow-400 text-yellow-400" size={16} />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-3">{review.comment}</p>
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                  <ThumbsUp size={16} />
                                  Helpful ({review.helpful})
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Additional Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BarChart size={18} />
                    <span>Skill Level</span>
                  </div>
                  <span className="font-semibold text-gray-900">{tutorial?.difficulty}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={18} />
                    <span>Students</span>
                  </div>
                  <span className="font-semibold text-gray-900">{tutorial?.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} />
                    <span>Duration</span>
                  </div>
                  <span className="font-semibold text-gray-900">{tutorial?.duration}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />
                    <span>Last Updated</span>
                  </div>
                  <span className="font-semibold text-gray-900">{tutorial?.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award size={18} />
                    <span>Certificate</span>
                  </div>
                  <span className="font-semibold text-green-600">Yes</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Courses</h3>
              <div className="space-y-4">
                {[
                  { title: 'Advanced TypeScript', price: 39.99, color: 'from-purple-400 to-indigo-500' },
                  { title: 'Next.js Complete Guide', price: 44.99, color: 'from-green-400 to-emerald-500' },
                  { title: 'Redux Toolkit Mastery', price: 34.99, color: 'from-orange-400 to-red-500' }
                ].map((course, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={`w-16 h-16 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Play className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm mb-1">{course.title}</div>
                      <div className="text-blue-600 font-bold">${course.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
