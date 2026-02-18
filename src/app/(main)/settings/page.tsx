"use client"
import { MiniSidebar } from '@/components/minisidebar';
import {useMiniSidebar} from "@/contexts/miniSideBarContext"
import React from 'react'
import Image from "next/image"
import { api } from '@/service/api';
import { useUserStore } from '@/store/auth-store';

function page() {
  const [currentPage, setCurrentPage] = React.useState('settings');
  const [error,setError] = React.useState<string>()
  const user = useUserStore((state)=>state.user)
  const [selectedImage,setSelectedImage] = React.useState<File>()
  const [imgUrl,setImgPreviewUrl] = React.useState<string>()
  const [formData,setFormData] = React.useState({
    firstName: "",
    lastName:"",
    email:"",
    bio:"",
  })
  const {isCollapsedDesktop} = useMiniSidebar();
      const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
    
        if (!file) {
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

const handleProfileUpload = async()=>{
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
      const payload ={
        bio:formData.bio,
        email:formData.email,
        name:formData.firstName + " " + formData.lastName,
        avatarUrl:validImageData.data.url
        
      }
      
    const upload =  await api.patch(`/users/${user?.id}`,{
      ...payload
     })
     if(!upload){
      console.error("The upload was not successful")
     }
      
  
}
  return (
     <div className={`flex w-full flex-row min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 `}>
          
        {/* <MiniSidebar/> */}
            {currentPage === 'settings' && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className=" text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>

            <div className="max-w-screen flex ">
              {/* Settings Navigation */}
             <MiniSidebar/>

              {/* Settings Content */}
              <div className=" ml-4 w-full flex-1 lg:col-span-2 space-y-6">
                {/* Profile Settings */}
                <div className="bg-white rounded-2xl shadow shadow-blue-200/80 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  {/* Avatar Upload */}
                  <div className="flex items-center  gap-6 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden relative ">
                      {
                        
                        imgUrl?(
                          <div>
                                  <Image
                          src={imgUrl}
                          alt="profile-url"
                          fill
                          className='object-cover'
                       
                          />
                          </div>
                        
                        ):"JD"
                      }
                    </div>
                    <div>
                      <input className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all mb-2"
                      type='file'
                    onChange={handleImageSelect
                      } />
                        
                      
                      <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4" onSubmit={handleProfileUpload}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                          onChange={(e)=>setFormData((prev)=>({
                            ...prev,firstName:e.target.value
                          }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                                                    onChange={(e)=>setFormData((prev)=>({
                            ...prev,lastName:e.target.value
                          }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                                                  onChange={(e)=>setFormData((prev)=>({
                            ...prev,email:e.target.value
                          }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        defaultValue="Passionate instructor helping students achieve their goals."
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                                                  onChange={(e)=>setFormData((prev)=>({
                            ...prev,bio:e.target.value
                          }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all" onClick={()=>handleProfileUpload()}>
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Account Security */}
                {/* <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">Add an extra layer of security</div>
                      </div>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-900">Change Password</div>
                        <div className="text-sm text-gray-600">Last changed 3 months ago</div>
                      </div>
                      <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-medium hover:border-gray-400 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}

        
     </div>
  )
}

export default page