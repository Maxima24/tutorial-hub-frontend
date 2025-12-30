import {
  CheckCircle,
  ImageIcon,
  Video,
  X,
  Tag,
  Upload,
  AlertCircle,
} from "lucide-react";
import React from "react";
import { Dispatch, SetStateAction } from "react";
import { UploadData } from "../page";

type secondPageProps = {
  uploadStep: number;
  setUploadStep: Dispatch<SetStateAction<number>>;
  setUploadData: Dispatch<SetStateAction<UploadData>>;
  uploadData: UploadData;
  setError: Dispatch<SetStateAction<string>>;
  selectedVideo: File | null;
  selectedImage: File | null;
  setSelectedVideo: Dispatch<SetStateAction<File | null>>;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
  previewUrl: string | undefined;
  setPreviewUrl: Dispatch<SetStateAction<string | undefined>>;
};
const SecondPage = ({
  uploadStep,
  setUploadStep,
  uploadData,
  setUploadData,
  setError,
  selectedVideo,
  selectedImage,
  setSelectedVideo,
  setSelectedImage,
  previewUrl,
  setPreviewUrl,
}: secondPageProps) => {
  const [imgPreviewUrl, setImgPreviewUrl] = React.useState<string | undefined>(
    undefined
  );
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");
  const [isDragging, setIsDragging] = React.useState({
    video: false,
    image: false,
  });
  const [uploadProgress, setUploadProgress] = React.useState({
    video: 0,
    image: 0,
  });

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected");
      return;
    }

    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file");
      return;
    }

    const maxSize = 300 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Video file is too large. Maximum is 300MB.");
      return;
    }

    setError("");
    setSelectedVideo(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    const maxSize = 300 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image is too large. Max size is 30MB.");
      return;
    }

    setError("");
    setSelectedImage(file);
    const preview = URL.createObjectURL(file);
    setImgPreviewUrl(preview);
  };
  console.log(selectedImage, "THis is the selected image ");
  const handleDragOver = (e: React.DragEvent, type: "video" | "image") => {
    e.preventDefault();
    setIsDragging({ ...isDragging, [type]: true });
  };

  const handleDragLeave = (e: React.DragEvent, type: "video" | "image") => {
    e.preventDefault();
    setIsDragging({ ...isDragging, [type]: false });
  };

  const handleDrop = (e: React.DragEvent, type: "video" | "image") => {
    e.preventDefault();
    setIsDragging({ ...isDragging, [type]: false });

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (type === "video") {
        const event = { target: { files: [file] } } as any;
        handleVideoSelect(event);
      } else {
        const event = { target: { files: [file] } } as any;
        handleImageSelect(event);
      }
    }
  };

  const removeVideo = () => {
    setSelectedVideo(null);
    setPreviewUrl(undefined);
    setError("");
  };

  const removeThumbnail = () => {
    setSelectedImage(null);
    setImgPreviewUrl(undefined);
    setError("");
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.endsWith(",") && value.trim().length > 1) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    } else {
      setTagInput(value);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const canContinue = selectedVideo !== null;

  return (
    <>
      {uploadStep === 2 && (
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Upload Content
            </h2>
            <p className="text-gray-600">
              Add your tutorial video and additional details
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Basic Info" },
                { num: 2, label: "Content" },
                { num: 3, label: "Pricing" },
                { num: 4, label: "Review" },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        uploadStep > step.num
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105"
                          : uploadStep === step.num
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-110 ring-4 ring-blue-100"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {uploadStep > step.num ? (
                        <CheckCircle size={28} />
                      ) : (
                        step.num
                      )}
                    </div>
                    <div
                      className={`text-sm font-medium mt-3 transition-colors whitespace-nowrap ${
                        uploadStep >= step.num
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </div>
                  </div>
                  {idx < 3 && (
                    <div className="flex-1 mx-4 hidden sm:block">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            uploadStep > step.num
                              ? "w-full bg-gradient-to-r from-green-500 to-emerald-500"
                              : "w-0"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Video Upload Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-blue-600" />
                <label className="text-lg font-semibold text-gray-900">
                  Tutorial Video
                </label>
                <span className="text-red-500 text-lg">*</span>
              </div>

              {!previewUrl ? (
                <div
                  className={`group border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    isDragging.video
                      ? "border-blue-500 bg-blue-50 scale-[1.02]"
                      : "border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md"
                  }`}
                  onClick={() =>
                    document.getElementById("video-upload")?.click()
                  }
                  onDragOver={(e) => handleDragOver(e, "video")}
                  onDragLeave={(e) => handleDragLeave(e, "video")}
                  onDrop={(e) => handleDrop(e, "video")}
                >
                  <div
                    className={`transition-transform duration-300 ${
                      isDragging.video ? "scale-110" : "group-hover:scale-105"
                    }`}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                      <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-gray-900 font-semibold text-lg mb-2">
                      {isDragging.video
                        ? "Drop your video here"
                        : "Drop your video here or click to browse"}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      Supported formats: MP4, MOV, AVI
                    </p>
                    <p className="text-xs text-gray-400">
                      Maximum file size: 500MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative group rounded-2xl overflow-hidden shadow-lg">
                    <video
                      src={previewUrl}
                      controls
                      className="w-full max-h-96 bg-black"
                    />
                    <button
                      onClick={removeVideo}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                      title="Remove video"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                    <CheckCircle
                      size={20}
                      className="text-green-600 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {selectedVideo?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedVideo && formatFileSize(selectedVideo.size)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <input
                id="video-upload"
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleVideoSelect}
              />
            </div>

            {/* Thumbnail Upload Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                <label className="text-lg font-semibold text-gray-900">
                  Thumbnail Image
                </label>
                <span className="text-sm text-gray-500 font-normal">
                  (Optional)
                </span>
              </div>

              {!imgPreviewUrl ? (
                <div
                  className={`group border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    isDragging.image
                      ? "border-purple-500 bg-purple-50 scale-[1.02]"
                      : "border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:border-purple-400 hover:bg-purple-50/50 hover:shadow-md"
                  }`}
                  onClick={() =>
                    document.getElementById("thumbnail-image")?.click()
                  }
                  onDragOver={(e) => handleDragOver(e, "image")}
                  onDragLeave={(e) => handleDragLeave(e, "image")}
                  onDrop={(e) => handleDrop(e, "image")}
                >
                  <div
                    className={`transition-transform duration-300 ${
                      isDragging.image ? "scale-110" : "group-hover:scale-105"
                    }`}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                      <ImageIcon className="w-10 h-10 text-purple-600" />
                    </div>
                    <p className="text-gray-900 font-semibold text-lg mb-2">
                      {isDragging.image
                        ? "Drop your image here"
                        : "Upload a thumbnail image"}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      Supported formats: JPG, PNG
                    </p>
                    <p className="text-xs text-gray-400">
                      Recommended: 1280x720 • Max 5MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative group rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={imgPreviewUrl}
                      alt="Thumbnail preview"
                      className="w-full max-h-80 object-cover"
                    />
                    <button
                      onClick={removeThumbnail}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                      title="Remove thumbnail"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                    <CheckCircle
                      size={20}
                      className="text-green-600 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {selectedImage?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedImage && formatFileSize(selectedImage.size)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <input
                type="file"
                id="thumbnail-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
              />
            </div>

            {/* Tags Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-indigo-600" />
                <label className="text-lg font-semibold text-gray-900">
                  Tags
                </label>
                <span className="text-sm text-gray-500 font-normal">
                  (Optional)
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap px-4 py-3 rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 bg-white transition-all min-h-[52px]">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium hover:shadow-md transition-shadow"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                        title="Remove tag"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInput}
                    onKeyDown={handleTagKeyDown}
                    placeholder={
                      tags.length === 0
                        ? "e.g., react, hooks, javascript"
                        : "Add more..."
                    }
                    className="flex-1 min-w-[150px] outline-none bg-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  Press Enter or use comma to add tags
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 gap-4">
            <button
              onClick={() => setUploadStep(1)}
              className="px-8 py-3.5 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => canContinue && setUploadStep(3)}
              disabled={!canContinue}
              className={`px-8 py-3.5 rounded-xl font-semibold transition-all ${
                canContinue
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SecondPage;
