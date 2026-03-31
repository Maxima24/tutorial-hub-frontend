"use client";
import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Play,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  Star,
  Users,
  Flame,
  Zap,
  ArrowRight,
  GraduationCap,
  BarChart2,
  CheckCircle2,
} from "lucide-react";
import { useMiniSidebar } from "@/contexts/miniSideBarContext";
import { useUserStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

/* ─── Types ─── */
type Course = {
  title: string;
  progress: number;
  duration: string;
  instructor: string;
};

type Tutorial = {
  id: number;
  title: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  students: number;
  rating: number | null;
  thumbnail: string; // gradient fallback
  instructor: string;
  isNew?: boolean;
  isTrending?: boolean;
};

/* ─── Mock data ─── */
const stats = [
  {
    label: "Courses Enrolled",
    value: "12",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    label: "Hours Learned",
    value: "48",
    icon: Clock,
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    label: "Streak Days",
    value: "15",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  // {
  //   label: "Certificates",
  //   value: "5",
  //   icon: Award,
  //   color: "from-green-500 to-emerald-500",
  //   bg: "bg-green-50",
  //   text: "text-green-600",
  // },
];

const recentCourses: Course[] = [
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

const featuredTutorials: Tutorial[] = [
  {
    id: 1,
    title: "EEE 301: Microelectronics & PMOS Electrostatics",
    category: "ENGINEERING",
    level: "intermediate",
    duration: "4:34",
    students: 0,
    rating: null,
    thumbnail: "from-blue-400 to-indigo-600",
    instructor: "John Doe",
    isTrending: true,
  },
  {
    id: 2,
    title: "MTH 101 – PHY 101 (3rd Edition)",
    category: "GENERAL",
    level: "beginner",
    duration: "0:04",
    students: 0,
    rating: null,
    thumbnail: "from-teal-400 to-cyan-600",
    instructor: "John Doe",
    isNew: true,
  },
  {
    id: 3,
    title: "Third Iteration – Full Walkthrough",
    category: "GENERAL",
    level: "beginner",
    duration: "0:21",
    students: 0,
    rating: null,
    thumbnail: "from-slate-600 to-gray-800",
    instructor: "John Doe",
  },
  {
    id: 4,
    title: "The First Tutorial",
    category: "GENERAL",
    level: "intermediate",
    duration: "0:04",
    students: 0,
    rating: null,
    thumbnail: "from-teal-500 to-blue-600",
    instructor: "John Doe",
  },
];

const weekActivity = [40, 70, 55, 90, 60, 80, 45]; // Mon–Sun

/* ─── Main Component ─── */
const LearningPlatform = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const { isCollapsedDesktop } = useMiniSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex flex-col min-h-screen rounded-lg p-2 sm:p-4 bg-gray-50/60">
      <div className="flex-1 overflow-auto pb-10">

        {/* ── Hero / Welcome Banner ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 mb-6 sm:mb-8 shadow-lg">
          {/* decorative circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute top-4 right-16 w-20 h-20 bg-white/5 rounded-full" />
          <div className="absolute -bottom-6 left-24 w-28 h-28 bg-blue-500/30 rounded-full" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {greeting()}, {user?.name ?? "Learner"} 👋
              </h1>
              <p className="text-blue-200 text-sm sm:text-base max-w-md">
                You're on a <span className="text-white font-bold">15-day streak</span>. Keep it up — you're in the top 10% this week!
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => router.push("/tutorials")}
                  className="flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow"
                >
                  <Play size={15} />
                  Continue Learning
                </button>
                <button
                  onClick={() => router.push("/tutorials")}
                  className="flex items-center gap-2 bg-white/10 text-white font-medium px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/20"
                >
                  Browse Tutorials
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Rank badge */}
            <div className="flex-shrink-0 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-5 py-4 text-center min-w-[120px]">
              <p className="text-blue-200 text-xs mb-1 font-medium uppercase tracking-wide">Your Rank</p>
              <div className="text-3xl mb-1">🏆</div>
              <div className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Gold
              </div>
              <p className="text-blue-200 text-xs mt-1">Top 10%</p>
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden group border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <span className="text-xs font-semibold text-green-500 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                    <TrendingUp size={10} /> +12%
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-0.5">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium mb-3 leading-tight">{stat.label}</div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                    <span>This Week</span>
                    <span className={`font-bold ${stat.text}`}>85%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`bg-gradient-to-r ${stat.color} h-full rounded-full`} style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Main 2-column grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">

          {/* Continue Learning (takes 2/3) */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Continue Learning</h2>
                <p className="text-xs text-gray-500 mt-0.5">Pick up where you left off</p>
              </div>
              <button
                onClick={() => router.push("/courses")}
                className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors"
              >
                View All <ChevronRight size={15} />
              </button>
            </div>

            {/* Desktop horizontal scroll */}
            <div className="hidden sm:flex overflow-x-auto scrollbar-hide gap-4 pb-6 px-5 sm:px-6">
              {recentCourses.map((course, idx) => (
                <CourseCard key={idx} course={course} />
              ))}
            </div>

            {/* Mobile vertical */}
            <div className="flex flex-col gap-3 sm:hidden pb-5 px-4">
              {recentCourses.map((course, idx) => (
                <CourseCardMobile key={idx} course={course} />
              ))}
            </div>
          </div>

          {/* Weekly Activity (1/3) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Weekly Activity</h2>
                <p className="text-xs text-gray-500 mt-0.5">Hours studied per day</p>
              </div>
              <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                <BarChart2 size={18} className="text-purple-600" />
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-28 mb-3">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-md overflow-hidden bg-gray-100 flex items-end" style={{ height: "96px" }}>
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${i === 3 ? "bg-gradient-to-t from-blue-600 to-blue-400" : "bg-gradient-to-t from-blue-200 to-blue-100"}`}
                      style={{ height: `${weekActivity[i]}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{day}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">6.5 <span className="text-sm font-normal text-gray-400">hrs</span></p>
                <p className="text-xs text-gray-500">Total this week</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+2.1 hrs</p>
                <p className="text-xs text-gray-500">vs last week</p>
              </div>
            </div>

            {/* Goals */}
            <div className="mt-4 space-y-2.5">
              {[
                { label: "Daily Goal (2h)", value: 75 },
                { label: "Weekly Goal (10h)", value: 65 },
              ].map((g, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{g.label}</span>
                    <span className="font-semibold text-blue-600">{g.value}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${g.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Featured Tutorials ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Featured Tutorials</h2>
              <p className="text-xs text-gray-500 mt-0.5">Handpicked videos to watch next</p>
            </div>
            <button
              onClick={() => router.push("/tutorials")}
              className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors"
            >
              Explore All <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {featuredTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </div>

        {/* ── Achievement + Quick Links row ── */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-5 sm:mt-6">

          {/* Recent Achievements */}
          {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
              <Award size={18} className="text-yellow-500" />
            </div>
            <div className="space-y-3">
              {[
                { icon: "🔥", label: "15-Day Streak", desc: "Studied 15 days in a row", done: true },
                { icon: "⚡", label: "Speed Learner", desc: "Completed 3 courses in a week", done: true },
                { icon: "📚", label: "Bookworm", desc: "Enrolled in 10+ courses", done: true },
                { icon: "🎯", label: "Perfect Week", desc: "Hit daily goal every day", done: false },
              ].map((a, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${a.done ? "bg-gray-50" : "bg-gray-50/40 opacity-50"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${a.done ? "bg-yellow-100" : "bg-gray-100"}`}>
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{a.label}</p>
                    <p className="text-xs text-gray-500 truncate">{a.desc}</p>
                  </div>
                  {a.done && <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div> */}

          {/* Quick Actions */}
          {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Play, label: "Resume Course", desc: "TypeScript Deep Dive", color: "from-blue-500 to-cyan-500", href: "/courses" },
                { icon: GraduationCap, label: "My Certificates", desc: "5 earned so far", color: "from-purple-500 to-pink-500", href: "/certificates" },
                { icon: BookOpen, label: "Browse Tutorials", desc: "New videos added", color: "from-orange-500 to-red-500", href: "/tutorials" },
                { icon: Zap, label: "Daily Challenge", desc: "New today!", color: "from-green-500 to-emerald-500", href: "/challenge" },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    onClick={() => router.push(action.href)}
                    className="flex flex-col items-start gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left group"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow group-hover:scale-105 transition-transform`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{action.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div> */}

        {/* </div>  */}
      </div>
    </div>
  );
};

/* ─── Tutorial Card (matches tutorials page style) ─── */
const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => {
  const levelColors: Record<string, string> = {
    beginner: "bg-emerald-100 text-emerald-700",
    intermediate: "bg-blue-100 text-blue-700",
    advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="group rounded-xl overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 cursor-pointer bg-white">
      {/* Thumbnail */}
      <div className={`relative bg-gradient-to-br ${tutorial.thumbnail} aspect-video flex items-center justify-center overflow-hidden`}>
        {/* Play button */}
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30">
          <Play size={20} className="text-white ml-0.5" />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${levelColors[tutorial.level]} capitalize`}>
            {tutorial.level}
          </span>
        </div>
        {tutorial.isNew && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            NEW
          </div>
        )}
        {tutorial.isTrending && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <TrendingUp size={8} /> HOT
          </div>
        )}

        {/* Duration overlay */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
          <Clock size={9} /> {tutorial.duration}
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5">
        <p className="text-[10px] font-bold text-blue-600 tracking-widest mb-1">{tutorial.category}</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">
          {tutorial.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
              {tutorial.instructor.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="truncate">{tutorial.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={10} />
            <span>{tutorial.students}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-amber-500">
            <Star size={11} className="fill-amber-400" />
            <span className="text-gray-500">{tutorial.rating ?? "N/A"}</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Desktop Course Card ─── */
const CourseCard = ({ course }: { course: Course }) => (
  <div className="flex-shrink-0 w-64 snap-start flex flex-col rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden bg-white group">
    <div className="relative bg-gradient-to-br from-blue-400 to-purple-600 p-5 pb-8">
      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-105 transition-transform">
        <Play className="text-white" size={22} />
      </div>
    </div>
    <CourseCardBody course={course} />
  </div>
);

/* ─── Mobile Course Card ─── */
const CourseCardMobile = ({ course }: { course: Course }) => (
  <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm active:bg-blue-50 transition-colors cursor-pointer">
    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow">
      <Play className="text-white" size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-gray-900 text-sm truncate mb-0.5">{course.title}</h3>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
          {course.instructor.split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="text-xs text-gray-500 truncate">{course.instructor}</span>
        <span className="text-gray-300">·</span>
        <span className="flex items-center gap-0.5 text-xs text-gray-400 whitespace-nowrap">
          <Clock size={10} /> {course.duration}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full" style={{ width: `${course.progress}%` }} />
        </div>
        <span className="text-xs font-bold text-purple-600 whitespace-nowrap">{course.progress}%</span>
      </div>
    </div>
  </div>
);

/* ─── Shared Course Card Body ─── */
const CourseCardBody = ({ course }: { course: Course }) => (
  <div className="flex-1 p-4">
    <div className="flex items-start justify-between gap-2 mb-2">
      <h3 className="font-bold text-gray-900 text-sm leading-snug">{course.title}</h3>
      <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-semibold whitespace-nowrap flex-shrink-0">
        <Clock size={9} /> {course.duration}
      </div>
    </div>

    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
      <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
        {course.instructor.split(" ").map((n) => n[0]).join("")}
      </div>
      <span className="truncate font-medium">{course.instructor}</span>
    </div>

    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-700"
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <div className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {course.progress}%
      </div>
    </div>
  </div>
);

export default LearningPlatform;