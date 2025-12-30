"use client";
import { useMiniSidebar } from "@/contexts/miniSideBarContext";
import {
  ChevronRight,
  CheckCircle,
  Video,
  DollarSign,
  Send,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useCreateVideo } from "@/service/mutations/video";
import { useUserStore } from "@/store/auth-store";
import FirstPage from "./components/page1";
import SecondPage from "./components/page2";
import ThirdPage from "./components/page3";
import FourthPage from "./components/page4";
ChevronRight;
export interface UploadData {
  title: string;
  category: string;
  difficulty: string;
  description: string;
  tags: string[];
  thumbnail: string;
  duration: string | null;
  price: string;
}
function Page() {
  const { mutateAsync: createVideo, isPending } = useCreateVideo();
  /**
   * useState HOOks
   */
  const [currentPage, setCurrentPage] = React.useState("dashboard");
  const [uploadStep, setUploadStep] = React.useState(1);
  const [uploadData, setUploadData] = React.useState<UploadData>({
    title: "",
    category: "",
    difficulty: "",
    description: "",
    tags: [],
    thumbnail: "",
    duration: null,
    price: "",
  });
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(
    undefined
  );
  const [selectedVideo, setSelectedVideo] = React.useState<File | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [uploadSucess, setUploadSuccess] = React.useState<boolean>(false);
  const userId = useUserStore((store) => store.user?.id);
  const [error, setError] = React.useState<string>("");
  const { isCollapsedDesktop } = useMiniSidebar();
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [imgUploadSuccess, setImgUploadSuccess] =
    React.useState<boolean>(false);

  const handleRemoveImage = () => {};

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 `}
    >
      <div className="flex-1 overflow-auto">
        <div className="md:p-8 p-4">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => setCurrentPage("tutorials")}
              className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 transition-colors"
            >
              <ChevronRight className="rotate-180" size={20} />
              Back to Tutorials
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Upload New Tutorial
            </h1>
            <p className="text-gray-600">
              Share your knowledge with learners worldwide
            </p>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow md:p-8 p-4">
            {/* Progress Steps */}

            {/* Step 1: Basic Info */}
            <FirstPage
              uploadStep={uploadStep}
              setUploadStep={setUploadStep}
              uploadData={uploadData}
              setUploadData={setUploadData}
            />

            {/* Step 2: Upload Content */}
            <SecondPage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
              setError={setError}
              uploadStep={uploadStep}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              setUploadStep={setUploadStep}
              uploadData={uploadData}
              setUploadData={setUploadData}
            />
            {/* Step 3: Pricing */}
            <ThirdPage
              uploadStep={uploadStep}
              setUploadStep={setUploadStep}
              uploadData={uploadData}
              setUploadData={setUploadData}
            />
            {/* Step 4: Review */}
            <FourthPage
              uploadStep={uploadStep}
              setUploadStep={setUploadStep}
              userId={userId!}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              uploadData={uploadData}
              selectedVideo={selectedVideo}
              setError={setError}
              setSelectedVideo={setSelectedVideo}
              setPreviewUrl={setPreviewUrl}
              setUploadSuccess={setUploadSuccess}
              setUploading={setUploading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
