"use client"
import { useSidebar } from '@/contexts/sideBarContext';
import React from 'react'


function page() {
  const [currentPage, setCurrentPage] = React.useState('settings');
  const {isCollapsedDesktop} = useSidebar();
    
  return (
     <div className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50  ${isCollapsedDesktop ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>
        <div className=" "></div>
            {currentPage === 'settings' && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="md:text-3xl text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow p-4 space-y-2 sticky top-8">
                  {['Profile', 'Account', 'Notifications', 'Privacy', 'Appearance', 'Language'].map((item, idx) => (
                    <button
                      key={idx}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        idx === 0
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Profile Settings */}
                <div className="bg-white rounded-2xl shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      JD
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all mb-2">
                        Change Photo
                      </button>
                      <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        defaultValue="Passionate instructor helping students achieve their goals."
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
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