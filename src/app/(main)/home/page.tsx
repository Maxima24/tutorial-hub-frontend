"use client";
import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Play,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
} from "lucide-react";
import { useMiniSidebar } from "@/contexts/miniSideBarContext";
import { useUserStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

const LearningPlatform = () => {
  const [currentPage, setCurrentPage] = React.useState("dashboard");
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const { isCollapsedDesktop } = useMiniSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const stats = [
    {
      label: "Courses Enrolled",
      value: "12",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Hours Learned",
      value: "48",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Streak Days",
      value: "15",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Certificates",
      value: "5",
      icon: Award,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const recentCourses = [
    {
      title: "Advanced React Patterns",
      progress: 65,
      duration: "2h 30m",
      instructor: "Sarah Johnson",
    },
    {
      title: "Python for Data Science",
      progress: 80,
      duration: "1h 45m",
      instructor: "Emma Davis",
    },
    {
      title: "UI/UX Design Mastery",
      progress: 40,
      duration: "3h 15m",
      instructor: "Mike Chen",
    },
    {
      title: "Node.js Advanced",
      progress: 55,
      duration: "2h 10m",
      instructor: "James Lee",
    },
    {
      title: "TypeScript Deep Dive",
      progress: 90,
      duration: "1h 20m",
      instructor: "Priya Sharma",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-4 rounded-lg p-2">
      <div className="flex-1 overflow-auto">
        {currentPage === "dashboard" && (
          <div className="mt-4 pb-8">

            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    Welcome back, {user?.name} 👋
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Rank badge — inline on mobile, right-aligned on sm+ */}
                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0">
                  <div className="text-xs text-gray-500 sm:mb-1">Your Rank</div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl sm:text-3xl">🏆</div>
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                      Gold
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid — 2 cols on mobile, 4 on lg */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-white rounded-2xl p-4 sm:p-6 shadow hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="text-white" size={20} />
                        </div>
                        <div className="text-xs font-semibold text-green-500 flex items-center gap-1">
                          <TrendingUp size={12} />
                          +12%
                        </div>
                      </div>

                      <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 mb-2 leading-tight">
                        {stat.label}
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                          <span>This Week</span>
                          <span className="font-semibold">85%</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${stat.color} h-full transition-all duration-500`}
                            style={{ width: "85%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Learning */}
            <div className="bg-white rounded-2xl shadow pt-5 sm:pt-6">
              {/* Section header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-6">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                    Continue Learning
                  </h2>
                  <p className="text-xs sm:text-base text-gray-500 mt-0.5">
                    Pick up where you left off
                  </p>
                </div>
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium flex items-center gap-1 transition-colors whitespace-nowrap">
                  View All <ChevronRight size={16} />
                </button>
              </div>

              {/*
                Mobile: vertical stacked list
                sm+: horizontal scroll row
              */}
              {/* Horizontal scroll — hidden on xs, visible on sm+ */}
              <div className="hidden sm:flex overflow-x-auto scrollbar-hide gap-4 w-full pb-6 px-6">
                {recentCourses.map((course, idx) => (
                  <CourseCard key={idx} course={course} />
                ))}
              </div>

              {/* Vertical stack — visible only on xs */}
              <div className="flex flex-col gap-3 sm:hidden pb-5 px-4">
                {recentCourses.map((course, idx) => (
                  <CourseCardMobile key={idx} course={course} />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Desktop card (horizontal scroll) ─── */
const CourseCard = ({
  course,
}: {
  course: {
    title: string;
    progress: number;
    duration: string;
    instructor: string;
  };
}) => (
  <div className="flex-shrink-0 flex snap-start flex-col justify-between shadow rounded-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all cursor-pointer border-2 border-transparent hover:border-blue-100 w-72">
    <div className="relative bg-gray-50 p-5 pb-8 rounded-t-md">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow">
        <Play className="text-white" size={24} />
      </div>
    </div>
    <CourseCardBody course={course} />
  </div>
);

/* ─── Mobile card (full-width row) ─── */
const CourseCardMobile = ({
  course,
}: {
  course: {
    title: string;
    progress: number;
    duration: string;
    instructor: string;
  };
}) => (
  <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm active:bg-blue-50 transition-colors cursor-pointer">
    {/* Thumbnail */}
    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow">
      <Play className="text-white" size={20} />
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-gray-900 text-sm truncate mb-0.5">
        {course.title}
      </h3>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
          {course.instructor
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <span className="text-xs text-gray-500 truncate">{course.instructor}</span>
        <span className="text-gray-300">·</span>
        <span className="flex items-center gap-0.5 text-xs text-gray-400 whitespace-nowrap">
          <Clock size={10} />
          {course.duration}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <span className="text-xs font-bold text-purple-600 whitespace-nowrap">
          {course.progress}%
        </span>
      </div>
    </div>
  </div>
);

/* ─── Shared body for desktop card ─── */
const CourseCardBody = ({
  course,
}: {
  course: {
    title: string;
    progress: number;
    duration: string;
    instructor: string;
  };
}) => (
  <div className="flex-1 min-w-0 p-5">
    <div className="flex items-start justify-between mb-2 gap-2">
      <h3 className="font-bold text-gray-900 text-base leading-snug">
        {course.title}
      </h3>
      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0">
        <Clock size={11} />
        {course.duration}
      </div>
    </div>

    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {course.instructor
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <span className="font-medium text-sm">{course.instructor}</span>
      </div>
      <span className="text-xs text-gray-400">
        {Math.floor(course.progress / 10)} / {Math.ceil(course.progress / 10)} lessons
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-700"
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {course.progress}%
      </div>
    </div>
  </div>
);

export default LearningPlatform;