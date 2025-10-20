'use client'
import { useSidebar } from '@/contexts/sideBarContext';
import { ChevronRight,CheckCircle,Video,DollarSign,Send, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
ChevronRight
function Page() {
     const [currentPage, setCurrentPage] = React.useState('dashboard');
     const [uploadStep,setUploadStep] = React.useState(1)
     const [uploadData,setUploadData] = React.useState<Record<string,string>>({})
     const {isCollapsedDesktop} = useSidebar();


  return (
      <div className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50  ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload New Tutorial</h1>
        <p className="text-gray-600">Share your knowledge with learners worldwide</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow md:p-8 p-4">
        {/* Progress Steps */}
        

        {/* Step 1: Basic Info */}
        {uploadStep === 1 && (
          <div className="">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
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
                    {uploadStep > step.num ? <CheckCircle size={24} /> : step.num}
                  </div>
                  <div className="text-sm font-medium mt-2 text-gray-700 whitespace-nowrap">{step.label}</div>
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
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tutorial Title *
                </label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  placeholder="e.g., Master React Hooks in 2024"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                    className="w-full px-4 py-3 text-gray-500 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option className='' value="">Select category</option>
                    <option value="react">React</option>
                    <option value="javascript">JavaScript</option>
                    <option value="css">CSS</option>
                    <option value="backend">Backend</option>
                    <option value="design">Design</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    value={uploadData.difficulty}
                    onChange={(e) => setUploadData({ ...uploadData, difficulty: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-gray-500 border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <input
                  type="text"
                  value={uploadData.duration}
                  onChange={(e) => setUploadData({ ...uploadData, duration: e.target.value })}
                  placeholder="e.g., 1h 30m"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={6}
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  placeholder="Describe what students will learn in this tutorial..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex justify-end items-start gap-4 pt-4">
                <button
                  onClick={() => setUploadStep(2)}
                  className="flex px-6 py-3  bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Upload Content */}
        {uploadStep === 2 && (
          <div className="">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Content</h2>
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
                    {uploadStep > step.num ? <CheckCircle size={24} /> : step.num}
                  </div>
                  <div className="text-sm whitespace-nowrap font-medium mt-2 text-gray-700">{step.label}</div>
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
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tutorial Video *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-900 font-medium mb-2">
                    Drop your video here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">MP4, MOV, or AVI (max 2GB)</p>
                  <input type="file" className="hidden" accept="video/*" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Image *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-900 font-medium mb-2">
                    Upload a thumbnail image
                  </p>
                  <p className="text-sm text-gray-500">JPG or PNG (1280x720 recommended)</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Add tags separated by commas (e.g., react, hooks, javascript)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setUploadStep(1)}
                  className="px-6 py-3 border-2 border-gray-100 rounded-xl font-medium hover:border-gray-300 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setUploadStep(3)}
                  className="flex px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer" 
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {uploadStep === 3 && (
          <div className="">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Set Pricing</h2>
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
                    {uploadStep > step.num ? <CheckCircle size={24} /> : step.num}
                  </div>
                  <div className="text-sm whitespace-nowrap font-medium mt-2 text-gray-700">{step.label}</div>
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
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <div className="flex items-center border-2 border-gray-100 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-all">
                  <DollarSign className="text-gray-500 mr-2" size={16} />
                  <input
                    type="number"
                    value={uploadData.price}
                    onChange={(e) => setUploadData({ ...uploadData, price: e.target.value })}
                    placeholder="Enter price"
                    className="w-full focus:outline-none text-gray-700"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setUploadStep(2)}
                  className="px-6 py-3 border-2 border-gray-100 rounded-xl font-medium hover:border-gray-200 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setUploadStep(4)}
                  className="flex px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {uploadStep === 4 && (
          <div className="">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
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
                    {uploadStep > step.num ? <CheckCircle size={24} /> : step.num}
                  </div>
                  <div className="text-sm whitespace-nowrap font-medium mt-2 text-gray-700">{step.label}</div>
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
            <div className='text-xl mb-4 '>Configuration Summary</div>
            <div className="space-y-4 text-gray-700 bg-gray-100 px-4 py-2 rounded-md">
              <p><strong>Title:</strong> {uploadData.title}</p>
              <p><strong>Category:</strong> {uploadData.category}</p>
              <p><strong>Difficulty:</strong> {uploadData.difficulty}</p>
              <p><strong>Duration:</strong> {uploadData.duration}</p>
              <p><strong>Description:</strong> {uploadData.description}</p>
              <p><strong>Price:</strong> ${uploadData.price}</p>
            </div>

            <div className="flex justify-between pt-8">
              <button
                onClick={() => setUploadStep(3)}
                className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => alert("Tutorial uploaded successfully!")}
                className="cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} /> Submit Tutorial
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
     </div>
      </div>
  )
}

export default Page