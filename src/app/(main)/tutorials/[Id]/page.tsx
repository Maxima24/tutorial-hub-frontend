"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  MoreHorizontal,
  ChevronDown,
  Clock,
  CheckCircle,
  Star,
  MessageCircle,
} from "lucide-react";
import { useGetVideos } from "@/service/query/vides.query";
import { useMessaging } from "@/hooks/useMessaging";
import { useUserStore } from "@/store/auth-store";

function VideoPlayerPage() {
  const { socket, isConnected, sendMessage } = useMessaging();
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;

  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const moreOptionsRef = useRef<HTMLDivElement>(null);
  const userId = useUserStore((state) => state.user?.id);
  const { data: tutorialVideos, isLoading } = useGetVideos();

  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const isSeekingRef = useRef(false);
  const isScrubbingRef = useRef(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close more-options on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(e.target as Node))
        setIsMoreOptionsOpen(false);
    };
    if (isMoreOptionsOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMoreOptionsOpen]);

  useEffect(() => {
    if (tutorialVideos && videoId) {
      const video = tutorialVideos?.find((v: any) => String(v.id) === String(videoId));
      console.log(video)
      if(!video){
        console.error("The video not found",video)
      }
      setCurrentVideo(video);
    }
  }, [tutorialVideos, videoId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideo?.videoUrl) return;
    setCurrentTime(0);
    setDuration(0);
    setWatchedPercentage(0);
    setIsPlaying(false);

    const onLoadedMetadata = () => { if (!isNaN(video.duration)) setDuration(video.duration); };
    const onTimeUpdate = () => {
      if (!isSeekingRef.current) setCurrentTime(video.currentTime);
      if (video.duration > 0) {
        const pct = (video.currentTime / video.duration) * 100;
        setWatchedPercentage((prev) => Math.max(prev, pct));
      }
    };
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);
    const onEnded = () => setIsPlaying(false);

    video.load();
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded);
    };
  }, [currentVideo?.videoUrl]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node))
        setShowSettings(false);
    };
    if (showSettings) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSettings]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isScrubbingRef.current) seekWithClientX(e.clientX); };
    const onMouseUp = () => { isScrubbingRef.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => { window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("mouseup", onMouseUp); };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      switch (e.key) {
        case " ": case "k": case "K":
          e.preventDefault();
          video.paused ? (video.play(), setIsPlaying(true)) : (video.pause(), setIsPlaying(false));
          break;
        case "ArrowRight": case "l": case "L":
          e.preventDefault();
          video.currentTime = Math.min(video.currentTime + 5, video.duration); setCurrentTime(video.currentTime); break;
        case "ArrowLeft": case "j": case "J":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 5, 0); setCurrentTime(video.currentTime); break;
        case "ArrowUp":
          e.preventDefault();
          video.volume = Math.min(video.volume + 0.1, 1); setVolume(video.volume); setIsMuted(false); video.muted = false; break;
        case "ArrowDown":
          e.preventDefault();
          video.volume = Math.max(video.volume - 0.1, 0); setVolume(video.volume); if (video.volume === 0) setIsMuted(true); break;
        case "m": case "M":
          e.preventDefault(); video.muted = !video.muted; setIsMuted(video.muted); break;
        case "f": case "F":
          e.preventDefault();
          !document.fullscreenElement && containerRef.current ? containerRef.current.requestFullscreen() : document.exitFullscreen();
          break;
        default:
          if ("0123456789".includes(e.key)) {
            e.preventDefault();
            video.currentTime = video.duration * (parseInt(e.key) / 10);
            setCurrentTime(video.currentTime);
          }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const seekWithClientX = (clientX: number) => {
    const bar = document.getElementById("progress-bar-track");
    const video = videoRef.current;
    if (!bar || !video || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    video.currentTime = pct * duration;
    setCurrentTime(pct * duration);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const v = parseFloat(e.target.value);
    videoRef.current.volume = v;
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changePlaybackRate = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    !document.fullscreenElement ? containerRef.current.requestFullscreen() : document.exitFullscreen();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying)
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
  };

  const handleOption = async (option: string) => {
    setIsMoreOptionsOpen(false);
    if (option.toLowerCase() === "message user") {
      if (!userId || !isConnected || userId === currentVideo?.userId) return;
      await sendMessage({ isGroup: false, content: "Hi, I love your video content!", reciepientId: currentVideo.userId });
    }
  };

  const formatDuration = (value: number | string) => {
    if (typeof value === "string") return value;
    if (isNaN(value)) return "0:00";
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    const s = Math.floor(value % 60);
    return h > 0
      ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      : `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (isLoading  || (!tutorialVideos&& !currentVideo)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-[3px] border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-sm w-full">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play size={24} className="text-slate-400 ml-1" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Video not found</h2>
          <p className="text-sm text-slate-500 mb-6">This video may have been removed or is unavailable.</p>
          <button
            onClick={() => router.push("/tutorials")}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors text-sm"
          >
            Back to tutorials
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100">

      {/* ── Top Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/80 px-4 sm:px-6 py-3">
        <div className="max-w-[1920px] mx-auto flex items-center gap-3">
          <button
            onClick={() => router.push("/tutorials")}
            className="flex items-center justify-center w-9 h-9 hover:bg-slate-100 rounded-xl transition-colors group flex-shrink-0"
          >
            <ArrowLeft size={18} className="text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div className="min-w-0 flex-1">
            {/* Desktop: show video title */}
            <p className="text-xs text-slate-400 hidden sm:block">Now Playing</p>
            <h1 className="text-sm font-semibold text-slate-900 truncate hidden sm:block">
              {currentVideo.title}
            </h1>
            {/* Mobile: just "Tutorials" label */}
            <h1 className="text-sm font-semibold text-slate-700 sm:hidden">Back to Tutorials</h1>
          </div>
        </div>
      </header>

      <div className="pt-[57px] pb-10">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-4 sm:gap-5 px-3 sm:px-5 lg:px-6 pt-4">

          {/* ── Main Column ── */}
          <div className="flex-1 min-w-0">

            {/* ── Video Player ── */}
            <div
              ref={containerRef}
              className="relative bg-black w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => isPlaying && setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={currentVideo.videoUrl}
                preload="metadata"
                crossOrigin="anonymous"
                poster={typeof currentVideo.thumbnailUrl === "string" ? currentVideo.thumbnailUrl : undefined}
                className="w-full h-full cursor-pointer"
                onClick={togglePlay}
              />

              {/* Buffering */}
              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none">
                  <div className="animate-spin h-12 w-12 border-4 border-white/80 border-t-transparent rounded-full" />
                </div>
              )}

              {/* Paused play button */}
              {!isPlaying && !isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none">
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 sm:w-20 sm:h-20 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-2xl pointer-events-auto transition-transform hover:scale-105 active:scale-95"
                  >
                    <Play size={24} className="text-blue-600 ml-1 sm:hidden" />
                    <Play size={32} className="text-blue-600 ml-1 hidden sm:block" />
                  </button>
                </div>
              )}

              {/* Controls */}
              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Progress */}
                <div className="px-3 sm:px-4 pt-6 pb-1">
                  <div
                    id="progress-bar-track"
                    className="relative h-1 sm:h-1.5 bg-white/25 rounded-full cursor-pointer group/prog"
                    onMouseDown={(e) => { isScrubbingRef.current = true; seekWithClientX(e.clientX); }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover/prog:opacity-100 transition-opacity -ml-1.5"
                      style={{ left: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Control row */}
                <div className="flex items-center justify-between px-3 sm:px-4 pb-3 pt-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button onClick={togglePlay} className="text-white hover:text-blue-400 transition p-1.5">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <div className="flex items-center gap-1 group/vol">
                      <button onClick={toggleMute} className="text-white hover:text-blue-400 transition p-1.5">
                        {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                      <div className="w-0 group-hover/vol:w-16 sm:group-hover/vol:w-20 transition-all overflow-hidden hidden sm:block">
                        <input
                          type="range" min="0" max="1" step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 sm:w-20 accent-blue-400"
                        />
                      </div>
                    </div>

                    <span className="text-xs sm:text-sm text-white/90 font-medium tabular-nums">
                      {formatDuration(currentTime)}
                      <span className="text-white/40 mx-0.5 sm:mx-1">/</span>
                      {formatDuration(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="relative" ref={settingsRef}>
                      <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-white hover:text-blue-400 transition p-1.5"
                      >
                        <Settings size={18} />
                      </button>
                      {showSettings && (
                        <div className="absolute bottom-full right-0 mb-2 bg-slate-900/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 min-w-[148px] border border-white/10">
                          <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Playback Speed
                          </p>
                          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => changePlaybackRate(rate)}
                              className={`w-full text-left px-4 py-1.5 text-sm transition ${
                                playbackRate === rate
                                  ? "text-blue-400 bg-white/10 font-semibold"
                                  : "text-white/90 hover:bg-white/10"
                              }`}
                            >
                              {rate === 1 ? "Normal" : `${rate}×`}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button onClick={toggleFullscreen} className="text-white hover:text-blue-400 transition p-1.5">
                      <Maximize size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Video Info ── */}
            <div className="mt-3 sm:mt-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">

              {/* Title */}
              <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-900 leading-snug mb-3">
                {currentVideo.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-slate-400" />
                  {formatDuration(currentVideo.duration)}
                </span>
                {currentVideo.rating && (
                  <span className="flex items-center gap-1.5">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-slate-700">{currentVideo.rating}</span>
                  </span>
                )}
                {watchedPercentage >= 90 && (
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle size={13} />
                    Completed
                  </span>
                )}
              </div>

              {/* Action buttons — horizontal scroll row on mobile */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-0.5 px-0.5 mb-4">
                {/* Like / Dislike pill */}
                <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  <button
                    onClick={() => { setLiked(!liked); if (disliked) setDisliked(false); }}
                    className={`flex items-center gap-1.5 px-3 py-2 transition text-xs sm:text-sm font-medium ${
                      liked ? "bg-blue-600 text-white" : "hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <ThumbsUp size={15} />
                    <span>Like</span>
                  </button>
                  <div className="w-px h-5 bg-slate-300" />
                  <button
                    onClick={() => { setDisliked(!disliked); if (liked) setLiked(false); }}
                    className={`px-3 py-2 transition ${disliked ? "bg-slate-300 text-slate-800" : "hover:bg-slate-200 text-slate-600"}`}
                  >
                    <ThumbsDown size={15} />
                  </button>
                </div>

                <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-slate-700 flex-shrink-0 text-xs sm:text-sm font-medium">
                  <Share2 size={15} />
                  Share
                </button>

                <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-slate-700 flex-shrink-0 text-xs sm:text-sm font-medium">
                  <Download size={15} />
                  Save
                </button>

                {/* More options */}
                <div className="relative flex-shrink-0" ref={moreOptionsRef}>
                  <button
                    onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
                    className={`p-2 rounded-xl transition text-slate-700 ${
                      isMoreOptionsOpen ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    <MoreHorizontal size={17} />
                  </button>
                  {isMoreOptionsOpen && (
                    <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 min-w-[160px]">
                      <button
                        onClick={() => handleOption("Message User")}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition text-left"
                      >
                        <MessageCircle size={14} className="text-blue-500" />
                        Message User
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className={`text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line ${showDescription ? "" : "line-clamp-2"}`}>
                  {currentVideo.description || "No description available."}
                </p>
                {currentVideo.description?.length > 100 && (
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                  >
                    {showDescription ? "Show less" : "Show more"}
                    <ChevronDown size={13} className={`transition-transform ${showDescription ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>

              {/* Watch progress */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Watch Progress</span>
                  <span className="text-sm font-bold text-blue-600">{Math.round(watchedPercentage)}%</span>
                </div>
                <div className="h-2 bg-white/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${watchedPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Up Next Sidebar ── */}
          <aside className="lg:w-[360px] xl:w-[400px] flex-shrink-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900">Up Next</h3>
                <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                  {tutorialVideos?.filter((v: any) => v.id !== videoId).length ?? 0}
                </span>
              </div>

              {/* Scrollable on desktop, horizontal scroll on mobile */}
              <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-1 lg:pb-0 lg:max-h-[calc(100vh-200px)] scrollbar-hide">
                {tutorialVideos
                  ?.filter((v: any) => v.id !== videoId)
                  .slice(0, 12)
                  .map((video: any) => (
                    <div
                      key={video.id}
                      onClick={() => router.push(`/tutorials/${video.id}`)}
                      className="flex flex-col lg:flex-row gap-2 lg:gap-3 cursor-pointer hover:bg-slate-50 rounded-xl p-2 transition-colors group flex-shrink-0 w-44 sm:w-52 lg:w-auto"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full lg:w-36 h-24 lg:h-[76px] flex-shrink-0 rounded-lg overflow-hidden bg-slate-200">
                        {video.thumbnailUrl ? (
                          <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(min-width: 1024px) 144px, 208px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play size={20} className="text-slate-400 ml-0.5" />
                          </div>
                        )}
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                          {formatDuration(video.duration)}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                          {video.title}
                        </h4>
                        {video.rating && (
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Star size={11} className="text-yellow-400 fill-yellow-400" />
                            <span>{video.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default VideoPlayerPage;