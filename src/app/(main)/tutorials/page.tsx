"use client";
import React, { useEffect, useRef } from "react";
import {
  BookOpen,
  Play,
  Clock,
  Star,
  Search,
  Filter,
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
  const { videos, searchQuery, setSearchQuery, filteredVideos } = useVideosStore();
  const { data: tutorialVideos, isLoading } = useGetVideos();
  const displayedVideos = searchQuery ? filteredVideos : videos;

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    if (tutorialVideos) console.log("Fetched tutorials", tutorialVideos);
  }, [tutorialVideos?.length]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* ── Header ── */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Explore Tutorials
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Master new skills with expert-led courses
            </p>
          </div>

          {/* ── Search & Filter ── */}
          <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-black text-sm pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors placeholder:text-gray-400 bg-white"
              />
            </div>
            <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl transition-colors flex items-center gap-2 font-medium text-sm shadow-sm shadow-blue-500/20 flex-shrink-0">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          {/* ── Loading ── */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
              <p className="mt-4 text-gray-500 text-sm">Loading tutorials...</p>
            </div>
          )}

          {/* ── Empty state ── */}
          {!isLoading && tutorialVideos?.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="mx-auto h-14 w-14 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No tutorials found</h3>
              <p className="text-sm text-gray-500">Check back later for new content</p>
            </div>
          )}

          {/* ── Grid ── */}
          {!isLoading && tutorialVideos && tutorialVideos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {tutorialVideos.map((tutorial: any) => (
                <div
                  key={tutorial.id}
                  className="flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500">
                    {tutorial.thumbnailUrl ? (
                      <Image
                        src={tutorial.thumbnailUrl}
                        alt={tutorial.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="text-white/30" size={56} />
                      </div>
                    )}

                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-white ml-0.5" size={22} />
                      </div>
                    </div>

                    {/* Difficulty badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-semibold text-gray-700">
                      {tutorial.difficulty}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5">
                    <div className="text-xs font-semibold text-blue-600 mb-1.5 uppercase tracking-wide">
                      {tutorial.category || "General"}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                      {tutorial.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{formatDuration(tutorial.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={14} />
                        <span className="font-semibold text-gray-700">
                          {tutorial.rating || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <span className="text-xs text-gray-500">
                        {tutorial.students || 0} students
                      </span>
                      <button
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:shadow-md hover:shadow-blue-500/25 transition-all"
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
      </div>
    </div>
  );
}

export default Page;