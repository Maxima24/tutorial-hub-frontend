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
} from "lucide-react";
import { useGetVideos } from "@/service/query/vides.query";
import { useMessaging } from "@/hooks/useMessaging";
import { useUserStore } from "@/store/auth-store";

function VideoPlayerPage() {
  const { socket, isConnected, sendMessage } = useMessaging();
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState<boolean>(false);
  const userId = useUserStore((state) => state.user?.id);
  const { data: tutorialVideos, isLoading } = useGetVideos();

  const [currentVideo, setCurrentVideo] = useState<any>(null);

  // Player state
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const isSeekingRef = useRef<boolean>(false);
  const isScrubbingRef = useRef<boolean>(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (tutorialVideos && videoId) {
      const video = tutorialVideos.find((v: any) => v.id === videoId);
      setCurrentVideo(video ?? null);
    }
  }, [tutorialVideos, videoId]);

  useEffect(() => {
    console.log(currentVideo);
  }, [currentVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideo?.videoUrl) return;

    // Reset state when source changes
    setCurrentTime(0);
    setDuration(0);
    setWatchedPercentage(0);
    setIsPlaying(false);

    const onLoadedMetadata = () => {
      if (!isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const onTimeUpdate = () => {
      if (!isSeekingRef.current) {
        setCurrentTime(video.currentTime);
      }

      if (video.duration > 0) {
        const percentage = (video.currentTime / video.duration) * 100;
        setWatchedPercentage((prev) => Math.max(prev, percentage));
      }
    };

    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);
    const onEnded = () => setIsPlaying(false);

    // Force browser to reload metadata
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

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.load();
  //   }
  // }, [currentVideo?.videoUrl]);
  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isScrubbingRef.current) return;
      seekWithClientX(e.clientX);
    };

    const handleMouseUp = () => {
      isScrubbingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video) return;

      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key) {
        case " ":
        case "k":
        case "K":
          e.preventDefault();
          if (video.paused) {
            video.play();
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
          break;

        case "ArrowRight":
        case "l":
        case "L":
          e.preventDefault();
          video.currentTime = Math.min(
            video.currentTime + 5,
            video.duration || video.currentTime
          );
          setCurrentTime(video.currentTime);
          break;

        case "ArrowLeft":
        case "j":
        case "J":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 5, 0);
          setCurrentTime(video.currentTime);
          break;

        case "ArrowUp":
          e.preventDefault();
          const newVolumeUp = Math.min(video.volume + 0.1, 1);
          video.volume = newVolumeUp;
          setVolume(newVolumeUp);
          setIsMuted(false);
          video.muted = false;
          break;

        case "ArrowDown":
          e.preventDefault();
          const newVolumeDown = Math.max(video.volume - 0.1, 0);
          video.volume = newVolumeDown;
          setVolume(newVolumeDown);
          if (newVolumeDown === 0) {
            setIsMuted(true);
          }
          break;

        case "m":
        case "M":
          e.preventDefault();
          const newMuted = !video.muted;
          video.muted = newMuted;
          setIsMuted(newMuted);
          break;

        case "f":
        case "F":
          e.preventDefault();
          if (!document.fullscreenElement && container) {
            container.requestFullscreen();
          } else if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          e.preventDefault();
          const percent = parseInt(e.key) / 10;
          video.currentTime = video.duration * percent;
          setCurrentTime(video.currentTime);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    videoRef.current.currentTime = percent * duration;
    setCurrentTime(percent * duration);
  };
  const handleOption = async (option: string) => {
    switch (option.toLowerCase()) {
      case "message user": {
        if (!userId) {
          console.error("User must be logged in to send a message");
          return;
        }
        console.log("socket instance:", socket);
        console.log("connected:", socket?.connected);

        if (!isConnected) {
          console.error("Socket not connected");
          socket?.connect();
          return;
        }
        if (userId === currentVideo.userId) {
          console.warn("User cant send a message to one's self");
          return;
        }

        const payload = {
          isGroup: false,
          content: "Hi I love your video content!!",
          reciepientId: currentVideo.userId,
        };


        await sendMessage(payload);
        return;
      }

      default:
        console.warn("Unknown option:", option);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    seekWithClientX(e.clientX);
  };
  const seekWithClientX = (clientX: number) => {
    const bar = progressBarRef.current;
    const video = videoRef.current;
    if (!bar || !video || !duration) return;
    const rect = bar.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percentage = x / rect.width;
    const time = percentage * duration;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const changePlaybackRate = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    isScrubbingRef.current = true;
    seekWithClientX(e.clientX);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        2000
      );
    }
  };

  const formatDuration = (value: number | string) => {
    if (typeof value === "string") return value;
    if (isNaN(value)) return "0:00";
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    const s = Math.floor(value % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    }
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-3 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Video not found
          </h2>
          <button
            onClick={() => router.push("/tutorials")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            Back to tutorials
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-4">
        <div className="max-w-[1920px] mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push("/tutorials")}
            className="p-2 hover:bg-slate-100 rounded-lg transition group"
          >
            <ArrowLeft
              size={20}
              className="text-slate-600 group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">
            Back to Tutorials
          </h1>
        </div>
      </header>

      <div className="pt-20 pb-8">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-6 px-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Video Player */}
            <div
              ref={containerRef}
              className="relative bg-black w-full aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => isPlaying && setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={currentVideo.videoUrl}
                preload="metadata"
                crossOrigin="anonymous"
                poster={
                  typeof currentVideo.thumbnailUrl === "string"
                    ? currentVideo.thumbnailUrl
                    : undefined
                }
                className="w-full h-full cursor-pointer"
                onClick={togglePlay}
              />

              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
                  <div className="animate-spin h-16 w-16 border-4 border-white border-t-transparent rounded-full" />
                </div>
              )}

              {/* Play Button Overlay */}
              {!isPlaying && !isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                  <button
                    onClick={togglePlay}
                    className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all shadow-2xl pointer-events-auto"
                  >
                    <Play size={32} className="text-blue-600 ml-1" />
                  </button>
                </div>
              )}

              {/* Controls Overlay */}
              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {/* Progress Bar */}
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  className="w-full mt-2 cursor-pointer"
                  onMouseDown={() => (isSeekingRef.current = true)}
                  onMouseUp={() => (isSeekingRef.current = false)}
                  onChange={(e) => {
                    const time = Number(e.target.value);
                    const video = videoRef.current;
                    if (!video) return;

                    video.currentTime = time;
                    setCurrentTime(time);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Control Buttons */}
                <div className="flex items-center justify-between px-4 pb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-blue-400 transition p-1"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>

                    <div className="flex items-center gap-2 group">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-blue-400 transition p-1"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX size={20} />
                        ) : (
                          <Volume2 size={20} />
                        )}
                      </button>
                      <div className="w-0 group-hover:w-20 transition-all overflow-hidden">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20"
                        />
                      </div>
                    </div>

                    <span className="text-sm text-white font-medium">
                      {formatDuration(currentTime)} / {formatDuration(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative" ref={settingsRef}>
                      <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-white hover:text-blue-400 transition p-1"
                      >
                        <Settings size={20} />
                      </button>
                      {showSettings && (
                        <div className="absolute bottom-full right-0 mb-2 bg-slate-900 rounded-xl shadow-2xl py-2 min-w-[140px]">
                          <div className="px-4 py-2 text-xs text-slate-400">
                            Playback speed
                          </div>
                          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(
                            (rate) => (
                              <button
                                key={rate}
                                onClick={() => changePlaybackRate(rate)}
                                className={`w-full text-left px-4 py-2 hover:bg-slate-800 text-sm transition ${
                                  playbackRate === rate
                                    ? "text-blue-400 bg-slate-800"
                                    : "text-white"
                                }`}
                              >
                                {rate === 1 ? "Normal" : `${rate}x`}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-blue-400 transition p-1"
                    >
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-3">
                {currentVideo.title}
              </h1>

              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {formatDuration(currentVideo.duration)}
                  </span>
                  {currentVideo.rating && (
                    <span className="flex items-center gap-1.5">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      {currentVideo.rating}
                    </span>
                  )}
                  {watchedPercentage >= 90 && (
                    <span className="flex items-center gap-1.5 text-green-600 font-medium">
                      <CheckCircle size={16} />
                      Completed
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden">
                    <button className="px-4 py-2 hover:bg-slate-200 transition flex items-center gap-2">
                      <ThumbsUp size={18} className="text-slate-700" />
                      <span className="text-sm font-medium text-slate-900">
                        Like
                      </span>
                    </button>
                    <div className="w-px h-6 bg-slate-300" />
                    <button className="px-4 py-2 hover:bg-slate-200 transition">
                      <ThumbsDown size={18} className="text-slate-700" />
                    </button>
                  </div>

                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-2">
                    <Share2 size={18} className="text-slate-700" />
                    <span className="text-sm font-medium text-slate-900">
                      Share
                    </span>
                  </button>

                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-2">
                    <Download size={18} className="text-slate-700" />
                    <span className="text-sm font-medium text-slate-900">
                      Download
                    </span>
                  </button>

                  <button
                    className="p-2  bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                    onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
                  >
                    <MoreHorizontal
                      size={18}
                      className="text-slate-700 relative"
                    />
                  </button>

                  {isMoreOptionsOpen && (
                    <div className="absolute flex 1flex-col gap-2 right-80 bg-gray-100 border-1  rounded-lg px-2 border-b-1 border-blue-200 py-4">
                      <ul>
                        {["Message User", "kill user"].map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="text-blue-400 py-1 border-b-1 border-gray-300 last:border-b-0 hover:text-blue-500 hover:cursor-pointer"
                              onClick={() => handleOption(item)}
                            >
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div
                  className={`text-sm text-slate-700 leading-relaxed ${
                    showDescription ? "" : "line-clamp-2"
                  }`}
                >
                  {currentVideo.description || "No description available."}
                </div>
                {currentVideo.description &&
                  currentVideo.description.length > 100 && (
                    <button
                      onClick={() => setShowDescription(!showDescription)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2 flex items-center gap-1"
                    >
                      {showDescription ? "Show less" : "Show more"}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          showDescription ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
              </div>

              {/* Progress Bar */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Watch Progress
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {Math.round(watchedPercentage)}%
                  </span>
                </div>
                <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${watchedPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <aside className="lg:w-[400px] xl:w-[420px]">
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Up Next</h3>
              <div className="space-y-3">
                {tutorialVideos
                  ?.filter((v: any) => v.id !== videoId)
                  .slice(0, 10)
                  .map((video: any) => (
                    <div
                      key={video.id}
                      onClick={() => router.push(`/tutorials/${video.id}`)}
                      className="flex gap-3 cursor-pointer hover:bg-slate-50 rounded-xl p-2 transition group"
                    >
                      <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200 shadow-md">
                        {video.thumbnailUrl ? (
                          <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="160px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="text-slate-400" size={24} />
                          </div>
                        )}
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                          {formatDuration(video.duration)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-slate-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          {video.rating && (
                            <div className="flex items-center gap-1">
                              <Star
                                size={12}
                                className="text-yellow-400 fill-yellow-400"
                              />
                              <span>{video.rating}</span>
                            </div>
                          )}
                        </div>
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
