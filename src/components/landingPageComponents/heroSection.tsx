'use client';

import { ArrowRight, Play, Users, Video, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[url('/image.png')] bg-cover bg-center  via-white to-blue-50 ">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div> */}
      <div className='absolute inset-0 bg-black/60'></div>

      <div className="relative max-w-7xl z-10 mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center ">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-blue-700 rounded-full font-medium text-sm animate-fade-in">
              <span className="w-2 h-2 bg-blue-100 rounded-full animate-pulse"></span>
              <span className='text-white capitalize'>Learn anything faster</span>
            </div>

            <h1 className="text-5xl drop-shadow-2xl text-white sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight animate-slide-up">
              Master New Skills{' '}
              <span className=" bg-gradient-to-r from-white to-blue-500  bg-clip-text text-transparent">
                Faster
              </span>
            </h1>

            <p className="text-xl  text-white text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-slide-up animation-delay-200">
              Join thousands of learners worldwide. Upload, share, and learn from expert-led video tutorials. Connect with fellow learners and grow together.
            </p>

            {/* Stats */}
            {/* <div className="flex text-white flex-wrap justify-center lg:justify-start gap-8 pt-4 animate-slide-up animation-delay-400">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white text-gray-900">50K+</div>
                  <div className="text-sm text-white text-gray-600">Active Learners</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl text-white font-bold text-gray-900">10K+</div>
                  <div className="text-sm  tect-white text-gray-600">Video Tutorials</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 text-white">24/7</div>
                  <div className="text-sm text-gray-600">Community Support</div>
                </div>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-600">
              <Link
                href="/signup"
                className="group px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="group px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex text-white font-bold items-center justify-center lg:justify-start space-x-2 text-sm text-gray-600 animate-fade-in animation-delay-800">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"
                  ></div>
                ))}
              </div>
              <span>Join 50,000+ learners already on LearnHub</span>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative animate-fade-in animation-delay-400">
            <div className="relative">
              {/* Main Card */}
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Play className="w-10 h-10 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Learn Anything</h3>
                      <p className="text-gray-600">From expert instructors</p>
                    </div>
                  </div>
                </div>

                {/* Course Preview Cards */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      JS
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">JavaScript Mastery</div>
                      <div className="text-sm text-gray-600">4.5 hours • Beginner</div>
                    </div>
                    <div className="text-blue-600 font-semibold">Free</div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      RN
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">React Fundamentals</div>
                      <div className="text-sm text-gray-600">6.2 hours • Intermediate</div>
                    </div>
                    <div className="text-purple-600 font-semibold">Free</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold text-2xl animate-float z-20">
                100%
              </div>

              {/* <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-300 rounded-2xl shadow-xl flex items-center justify-center text-white animate-float animation-delay-2000 z-20">
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="text-xs">★★★★★</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}