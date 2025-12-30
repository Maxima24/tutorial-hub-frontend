import { Dispatch, SetStateAction, useState } from "react";
import { CheckCircle } from "lucide-react"; // assuming you use lucide-react
import { UploadData } from "../page";

type FirstPageProps = {
  uploadStep: number;
  setUploadStep: Dispatch<SetStateAction<number>>;
  setUploadData: Dispatch<SetStateAction<UploadData>>;
  uploadData: UploadData;
};

export const FirstPage = ({
  uploadStep,
  setUploadStep,
  uploadData,
  setUploadData,
}: FirstPageProps) => {
  return (
    <>
      {uploadStep === 1 && (
        <div className="">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Basic Information
          </h2>

          {/* Steps */}
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
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {uploadStep > step.num ? (
                        <CheckCircle size={24} />
                      ) : (
                        step.num
                      )}
                    </div>
                    <div className="text-sm font-medium mt-2 text-gray-700 whitespace-nowrap">
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

          {/* Form */}
          <div className="space-y-6">
            {/* Tutorial Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tutorial Title *
              </label>
              <input
                type="text"
                value={uploadData.title}
                onChange={(e) =>
                  setUploadData({ ...uploadData, title: e.target.value })
                }
                placeholder="e.g., Master React Hooks in 2024"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category & Difficulty */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={uploadData.category}
                  onChange={(e) =>
                    setUploadData({
                      ...uploadData,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 text-gray-500 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select category</option>
                  <option value="react">Technology & Programming</option>
                  <option value="javascript">
                    Data & Artificial Intelligence
                  </option>
                  <option value="css">Business & Entrepreneurship</option>
                  <option value="backend">Design & Creativity</option>
                  <option value="design">Personal Development</option>
                  <option value="mobile">Academics & Education </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level *
                </label>
                <select
                  value={uploadData.difficulty}
                  onChange={(e) =>
                    setUploadData({
                      ...uploadData,
                      difficulty: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl text-gray-500 border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select difficulty</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                rows={6}
                value={uploadData.description}
                onChange={(e) =>
                  setUploadData({
                    ...uploadData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe what students will learn in this tutorial..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Continue Button */}
            <div className="flex justify-end items-start gap-4 pt-4">
              <button
                onClick={() => setUploadStep(2)}
                className="flex px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default FirstPage;
