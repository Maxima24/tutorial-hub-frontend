import { useCreateVideo } from "@/service/mutations/video";
import { useUserStore } from "@/store/auth-store";
import { CheckCircle, Send } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type fourthPageProps = {
  uploadStep: number;
  setUploadStep: Dispatch<SetStateAction<number>>;
  setUploading: Dispatch<SetStateAction<boolean>>;
  uploadData: Record<any, any>;
  setError: Dispatch<SetStateAction<string>>;
  selectedVideo: File | null;
  selectedImage: File | null;
  setSelectedVideo: Dispatch<SetStateAction<File | null>>;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
  setUploadSuccess: Dispatch<SetStateAction<boolean>>;
  setPreviewUrl: Dispatch<SetStateAction<string | undefined>>;
  userId: string;
};
const FourthPage = ({
  uploadStep,
  setUploadStep,
  uploadData,
  selectedVideo,
  selectedImage,
  setError,
  setSelectedVideo,
  setPreviewUrl,
  setUploadSuccess,
  setUploading,
}: fourthPageProps) => {
  const userId = useUserStore((store) => store.user?.id);
  const { mutateAsync: createVideo, isPending } = useCreateVideo();
  const removeVideo = () => {
    setSelectedVideo(null);
    setPreviewUrl(undefined);
    setError("");
  };
  console.log(uploadData);
  console.log(selectedImage);
  const handleSubmit = async () => {
    if (!selectedVideo) {
      setError("Please Select a video to upload");
      return
    }
    if (!selectedImage) {
      setError("Please select a thumbnail to upload");
      return
    }
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      const imageData = new FormData();
      imageData.append("image", selectedImage!);
      const imageResponse = await fetch("/api/upload-image", {
        method: "POST",
        body: imageData,
      });
      if (!imageResponse.ok) {
        const error = await imageResponse.json();
        throw new Error(error.error || " Failed to upload Image");
      }
      const validImageData = await imageResponse.json();
      formData.append("video", selectedVideo);
      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload video");
      }
      const data = await response.json();
      setUploadSuccess(true);
      console.log(
        "Video and image Upload successful",
        data,
        "image Data is given as",
        validImageData
      );
      const payload = {
        ...uploadData,
        videoUrl: data.data.url,
        thumbnailUrl: validImageData.data.url,
        videoPublicId: data.data.publicId,
        duration: data.data.duration,
        userId,
      };
      console.log("Final Upload Data", payload);
      setTimeout(() => {
        removeVideo();
      }, 2000);
      createVideo(payload);
    } catch (err: any) {
      setError(err.message || "Failed to upload Video");
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      {uploadStep === 4 && (
        <div className="">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Review & Submit
          </h2>
          <div className="mb-8">
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
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        uploadStep > step.num
                          ? "bg-green-500 text-white"
                          : uploadStep === step.num
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {uploadStep > step.num ? (
                        <CheckCircle size={24} />
                      ) : (
                        step.num
                      )}
                    </div>
                    <div className="text-sm whitespace-nowrap font-medium mt-2 text-gray-700">
                      {step.label}
                    </div>
                  </div>
                  {idx < 3 && (
                    <div
                      className={`h-1 flex-1 transition-all ${
                        uploadStep > step.num ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-xl mb-4 ">Configuration Summary</div>
          <div className="space-y-4 text-gray-700 bg-gray-100 px-4 py-2 rounded-md">
            <p>
              <strong>Title:</strong> {uploadData.title}
            </p>
            <p>
              <strong>Category:</strong> {uploadData.category}
            </p>
            <p>
              <strong>Difficulty:</strong> {uploadData.difficulty}
            </p>
            <p>
              <strong>Duration:</strong> {uploadData.duration}
            </p>
            <p>
              <strong>Description:</strong> {uploadData.description}
            </p>
            <p>
              <strong>Price:</strong> ${uploadData.price}
            </p>
          </div>

          <div className="flex justify-between pt-8">
            <button
              onClick={() => setUploadStep(3)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => handleSubmit()}
              className="cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} /> Submit Tutorial
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default FourthPage;
