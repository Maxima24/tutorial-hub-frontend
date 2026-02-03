'use client';

import { Video, MessageCircle, Upload, Users, BookOpen, Award } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Video,
      title: 'Video Learning',
      description: 'Access thousands of high-quality video tutorials from expert instructors across various domains.',
      color: 'blue',
    },
    {
      icon: MessageCircle,
      title: 'Real-Time Messaging',
      description: 'Connect with learners and instructors instantly. Ask questions, share insights, and collaborate.',
      color: 'purple',
    },
    {
      icon: Upload,
      title: 'Share Your Knowledge',
      description: 'Upload your own tutorials and courses. Help others learn while building your instructor profile.',
      color: 'pink',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a vibrant community of learners and educators. Network, collaborate, and grow together.',
      color: 'indigo',
    },
    {
      icon: BookOpen,
      title: 'Structured Courses',
      description: 'Follow well-organized courses with step-by-step guidance from beginner to advanced levels.',
      color: 'cyan',
    },
    {
      icon: Award,
      title: 'Track Progress',
      description: 'Monitor your learning journey with progress tracking, achievements, and personalized recommendations.',
      color: 'emerald',
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
      gradient: 'from-blue-600 to-cyan-600',
    },
    purple: {
      bg: 'bg-purple-100',
      icon: 'text-purple-600',
      gradient: 'from-purple-600 to-pink-600',
    },
    pink: {
      bg: 'bg-pink-100',
      icon: 'text-pink-600',
      gradient: 'from-pink-600 to-rose-600',
    },
    indigo: {
      bg: 'bg-indigo-100',
      icon: 'text-indigo-600',
      gradient: 'from-indigo-600 to-purple-600',
    },
    cyan: {
      bg: 'bg-cyan-100',
      icon: 'text-cyan-600',
      gradient: 'from-cyan-600 to-blue-600',
    },
    emerald: {
      bg: 'bg-emerald-100',
      icon: 'text-emerald-600',
      gradient: 'from-emerald-600 to-teal-600',
    },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F7CFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm mb-6">
            <span>About LearnHub</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Your Gateway to{' '}
            <span className="bg-blue-500 bg-clip-text text-transparent">
              Unlimited Learning
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            LearnHub is more than just a learning platform. It's a thriving community where knowledge meets connection. Upload videos, share expertise, message fellow learners, and embark on a transformative educational journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature:any, index) => {
            const Icon = feature.icon;
            //@ts-ignore
            const colors = colorClasses[feature.color];
            return (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${colors.icon}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="relative">
          <div className="bg-blue-500 rounded-3xl p-12 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Transform Your Learning Experience?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our community today and unlock access to thousands of courses, connect with learners worldwide, and share your expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
                  Explore Courses
                </button>
                <button className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold text-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors">
                  Become an Instructor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}