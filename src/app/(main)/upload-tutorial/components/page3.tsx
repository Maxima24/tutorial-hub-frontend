import { CheckCircle, DollarSign } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { UploadData } from "../page";

const ThirdPage = ({
  uploadStep,
  setUploadStep,
  uploadData,
  setUploadData,
}: {
  uploadStep: number;
  setUploadStep: Dispatch<SetStateAction<number>>;
  setUploadData: Dispatch<SetStateAction<UploadData>>;
  uploadData: UploadData;
}) => {
  return (
    <>
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
                  onChange={(e) =>
                    setUploadData({
                      ...uploadData,
                      price: e.target.value,
                    })
                  }
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
    </>
  );
};

export default ThirdPage;
