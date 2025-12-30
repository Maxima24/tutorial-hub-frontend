"use client";
import React, { useEffect, useRef } from "react";
import {
  Home,
  BookOpen,
  Settings,
  MessageCircle,
  Bell,
  Menu,
  X,
  Play,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  Search,
  Filter,
  Star,
} from "lucide-react";
import useVideosStore from "@/store/videos-store";
import { useRouter } from "next/navigation";
import { useMiniSidebar } from "@/contexts/miniSideBarContext";
import { useGetVideos } from "@/service/query/vides.query";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const isMounted = useRef(false);
  const { isCollapsedDesktop } = useMiniSidebar();
  const { videos, searchQuery, setSearchQuery, filteredVideos } =
    useVideosStore();
  const { data: tutorialVideos, isLoading } = useGetVideos();
  const [currentPage, setCurrentPage] = React.useState("tutorials");
  const displayedVideos = searchQuery ? filteredVideos : videos;

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (tutorialVideos) {
      console.log("This are the gotten data", tutorialVideos);
    }
  }, [tutorialVideos?.length]);

  // Helper function to format duration from seconds to minutes
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50`}
    >
      <div className="flex-1 overflow-auto">
        {/** main content */}
        {currentPage === "tutorials" && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Explore Tutorials
              </h1>
              <p className="text-gray-600 text-[18px]">
                Master new skills with expert-led courses
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-4 mb-8">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-black pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30 border-2 border-gray-200 rounded-xl transition-colors flex items-center gap-2 font-medium cursor-pointer">
                <Filter size={20} />
                Filter
              </button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading tutorials...</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && tutorialVideos?.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tutorials found
                </h3>
                <p className="text-gray-600">
                  Check back later for new content
                </p>
              </div>
            )}

            {/* Tutorials Grid */}
            {!isLoading && tutorialVideos && tutorialVideos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorialVideos.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="flex flex-col justify-between bg-white rounded-2xl shadow overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  >
                    <div className="h-48 relative flex items-center justify-center overflow-hidden">
                      {tutorial.thumbnailUrl ? (
                        <Image
                          src={tutorial.thumbnailUrl}
                          alt={tutorial.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        // Fallback placeholder when no thumbnail
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500">
                          <BookOpen className="text-white/30" size={64} />
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                          <Play className="text-white ml-1" size={28} />
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold z-10">
                        {tutorial.difficulty}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                        {tutorial.category || "General"}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {tutorial.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{formatDuration(tutorial.duration)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star
                            className="fill-yellow-400 text-yellow-400"
                            size={16}
                          />
                          <span className="font-semibold">
                            {tutorial.rating || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-600">
                          {tutorial.students || 0} students
                        </span>
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => router.push(`/tutorials/${tutorial.id}`)}
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;