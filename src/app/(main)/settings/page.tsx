"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  User,
  Lock,
  Bell,
  Globe,
  Trash2,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  ShieldAlert,
  Save,
  AlertTriangle,
  CheckCircle2,
  Video,
} from "lucide-react";
import { MiniSidebar, SidebarItem } from "@/components/minisidebar";
import { api } from "@/service/api";
import { useUserStore } from "@/store/auth-store";

/* ─── Page-specific nav items ─── */
const settingsNavItems: SidebarItem[] = [
  { id: "profile",      label: "Profile",       icon: User,     href: "" },
  { id: "account",      label: "Account",       icon: Lock,     href: "" },
  { id: "notification", label: "Notifications", icon: Bell,     href: "" },
  { id: "appearance",   label: "Appearance",    icon: Globe,    href: "" },
  { id: "language",     label: "Language",      icon: Video,    href: "" },
];

type SettingsPage = "profile" | "account" | "notification" | "appearance" | "language";

/* ─── Mobile tab strip ─── */
const MobileTabStrip = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: SettingsPage;
  setCurrentPage: (p: SettingsPage) => void;
}) => (
  <div className="lg:hidden w-full mb-4">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
      <div className="flex overflow-x-auto scrollbar-hide gap-1">
        {settingsNavItems.map(({ id, label, icon: Icon }) => {
          const isActive = currentPage === id;
          return (
            <button
              key={id}
              onClick={() => setCurrentPage(id as SettingsPage)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

/* ─── Main Page ─── */
export default function SettingsPage() {
  const [currentPage, setCurrentPage] = useState<SettingsPage>("profile");
  const user = useUserStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account preferences</p>
      </div>

      {/* Mobile: horizontal scrollable tab strip */}
      <MobileTabStrip currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
        {/* Desktop: vertical sidebar in state-driven mode */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <MiniSidebar
            items={settingsNavItems}
            activeId={currentPage}
            onSelect={(id) => setCurrentPage(id as SettingsPage)}
          />
        </div>

        {/* Content — single currentPage state drives both nav surfaces */}
        <div className="flex-1 min-w-0">
          {currentPage === "profile"      && <ProfilePanel user={user} />}
          {currentPage === "account"      && <AccountPanel />}
          {currentPage === "notification" && <NotificationsPanel />}
          {currentPage === "appearance"   && <PlaceholderPanel title="Appearance" desc="Theme and display settings coming soon." icon={Globe} />}
          {currentPage === "language"     && <PlaceholderPanel title="Language & Region" desc="Language preferences coming soon." icon={Globe} />}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROFILE PANEL
───────────────────────────────────────────── */
const ProfilePanel = ({ user }: { user: any }) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [imgUrl, setImgPreviewUrl] = useState<string>();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", bio: "" });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select a valid image file."); return; }
    if (file.size > 2 * 1024 * 1024) { setError("Image is too large. Max size is 2MB."); return; }
    setError("");
    setSelectedImage(file);
    setImgPreviewUrl(URL.createObjectURL(file));
  };

  const handleProfileUpload = async () => {
    try {
      const imageData = new FormData();
      imageData.append("image", selectedImage!);
      const imageResponse = await fetch("/api/upload-image", { method: "POST", body: imageData });
      if (!imageResponse.ok) throw new Error("Failed to upload image");
      const validImageData = await imageResponse.json();
      await api.patch(`/users/${user?.id}`, {
        bio: formData.bio,
        email: formData.email,
        name: formData.firstName + " " + formData.lastName,
        avatarUrl: validImageData.data.url,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to save changes.");
    }
  };

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("") ?? "JD";

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Profile Information</h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 pb-6 border-b border-gray-100">
          <div className="relative w-24 h-24 flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {imgUrl ? (
                <Image src={imgUrl} alt="avatar" fill className="object-cover rounded-full" />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </label>
            <input id="avatar-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageSelect} />
          </div>

          <div className="text-center sm:text-left">
            <p className="font-semibold text-gray-900">{user?.name ?? "John Doe"}</p>
            <p className="text-sm text-gray-500 mb-3">{user?.email ?? "john.doe@example.com"}</p>
            <label htmlFor="avatar-upload" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium cursor-pointer hover:shadow-md transition-all">
              Change Photo
            </label>
            <p className="text-xs text-gray-400 mt-1.5">JPG, PNG or GIF · Max 2MB</p>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
              <input type="text" defaultValue="John" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm" onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm" onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm" onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea rows={3} defaultValue="Passionate instructor helping students achieve their goals." className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none" onChange={(e) => setFormData((p) => ({ ...p, bio: e.target.value }))} />
            <p className="text-xs text-gray-400 mt-1">Brief description about yourself.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          {success && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mr-auto">
              <CheckCircle2 size={16} /> Saved successfully
            </div>
          )}
          <button className="px-6 py-2.5 border-2 border-gray-200 rounded-xl font-medium text-sm hover:border-gray-300 transition-colors">Cancel</button>
          <button onClick={handleProfileUpload} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium text-sm hover:shadow-md transition-all">
            <Save size={15} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ACCOUNT PANEL
───────────────────────────────────────────── */
const AccountPanel = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChangePassword = () => {
    setPwError("");
    if (!passwords.current || !passwords.newPass || !passwords.confirm) { setPwError("Please fill in all fields."); return; }
    if (passwords.newPass.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (passwords.newPass !== passwords.confirm) { setPwError("New passwords do not match."); return; }
    // await api.patch('/auth/change-password', passwords)
    setPwSuccess(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPwSuccess(false), 3000);
  };

  const strength = (() => {
    const p = passwords.newPass;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"][strength];

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Lock size={18} className="text-blue-600" /></div>
          <div><h2 className="text-lg font-bold text-gray-900">Change Password</h2><p className="text-xs text-gray-500">Update your account password</p></div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
            <div className="relative">
              <input type={showCurrent ? "text" : "password"} value={passwords.current} placeholder="Enter current password" className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm" onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))} />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <input type={showNew ? "text" : "password"} value={passwords.newPass} placeholder="At least 8 characters" className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm" onChange={(e) => setPasswords((p) => ({ ...p, newPass: e.target.value }))} />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showNew ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {passwords.newPass && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-gray-200"}`} />
                  ))}
                </div>
                <p className={`text-xs font-medium ${["", "text-red-500", "text-yellow-600", "text-blue-500", "text-green-600"][strength]}`}>{strengthLabel}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={passwords.confirm}
                placeholder="Repeat new password"
                className={`w-full px-4 py-3 pr-12 rounded-xl border-2 focus:outline-none transition-colors text-sm ${passwords.confirm && passwords.confirm !== passwords.newPass ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-blue-500"}`}
                onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {passwords.confirm && passwords.confirm !== passwords.newPass && <p className="text-xs text-red-500 mt-1">Passwords do not match</p>}
          </div>

          {pwError && <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl"><AlertTriangle size={15} /> {pwError}</div>}
          {pwSuccess && <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-4 py-3 rounded-xl"><CheckCircle2 size={15} /> Password changed successfully!</div>}
        </div>

        <div className="flex justify-end mt-5">
          <button onClick={handleChangePassword} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium text-sm hover:shadow-md transition-all">
            <Lock size={15} /> Update Password
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center"><ShieldAlert size={18} className="text-purple-600" /></div>
          <div><h2 className="text-lg font-bold text-gray-900">Active Sessions</h2><p className="text-xs text-gray-500">Devices currently signed in</p></div>
        </div>
        <div className="space-y-3">
          {[
            { device: "Chrome on Windows", location: "Lagos, Nigeria", current: true, time: "Now" },
            { device: "Safari on iPhone", location: "Lagos, Nigeria", current: false, time: "2 days ago" },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${session.current ? "bg-green-500" : "bg-gray-300"}`} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{session.device}</p>
                  <p className="text-xs text-gray-500">{session.location} · {session.time}</p>
                </div>
              </div>
              {session.current
                ? <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium">This device</span>
                : <button className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">Revoke</button>}
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center"><Trash2 size={18} className="text-red-500" /></div>
          <div><h2 className="text-lg font-bold text-gray-900">Danger Zone</h2><p className="text-xs text-gray-500">Irreversible account actions</p></div>
        </div>
        <div className="p-4 border border-red-200 rounded-xl bg-red-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Delete Account</p>
              <p className="text-xs text-gray-500 mt-0.5">Permanently remove your account and all data. This cannot be undone.</p>
            </div>
            <button onClick={() => setShowDeleteModal(true)} className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors">
              <Trash2 size={14} /> Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><AlertTriangle size={22} className="text-red-500" /></div>
              <div><h3 className="font-bold text-gray-900">Delete Account</h3><p className="text-xs text-gray-500">This action is permanent</p></div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Type <span className="font-bold text-gray-900">DELETE</span> to confirm.</p>
            <input type="text" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} placeholder="Type DELETE to confirm" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none text-sm mb-4" />
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setDeleteInput(""); }} className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium hover:border-gray-300 transition-colors">Cancel</button>
              <button disabled={deleteInput !== "DELETE"} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors">Delete Forever</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   NOTIFICATIONS PANEL
───────────────────────────────────────────── */
type NotifToggleProps = { label: string; desc: string; checked: boolean; onChange: () => void };

const NotifToggle = ({ label, desc, checked, onChange }: NotifToggleProps) => (
  <div className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
    <div className="flex-1 mr-4">
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
    </div>
    <button onClick={onChange} className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? "bg-blue-500" : "bg-gray-200"}`}>
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  </div>
);

const NotificationsPanel = () => {
  const [notifSettings, setNotifSettings] = useState({
    inAppCourseUpdates: true,
    inAppNewMessages: true,
    inAppAchievements: true,
    inAppSystemAlerts: false,
    emailWeeklyDigest: true,
    emailCourseReminders: true,
    emailNewTutorials: false,
    emailPromotion: false,
    pushReminders: true,
    pushLiveEvents: false,
    smsAlerts: false,
  });
  const toggle = (key: keyof typeof notifSettings) => setNotifSettings((p) => ({ ...p, [key]: !p[key] }));
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Bell size={18} className="text-blue-600" /></div>
          <div><h2 className="text-base font-bold text-gray-900">In-App Notifications</h2><p className="text-xs text-gray-500">Alerts inside LearnHub</p></div>
        </div>
        <NotifToggle label="Course Updates" desc="When a course you're enrolled in gets new content" checked={notifSettings.inAppCourseUpdates} onChange={() => toggle("inAppCourseUpdates")} />
        <NotifToggle label="New Messages" desc="When an instructor or peer messages you" checked={notifSettings.inAppNewMessages} onChange={() => toggle("inAppNewMessages")} />
        <NotifToggle label="Achievements & Badges" desc="When you earn a new achievement" checked={notifSettings.inAppAchievements} onChange={() => toggle("inAppAchievements")} />
        <NotifToggle label="System Alerts" desc="Maintenance windows and platform updates" checked={notifSettings.inAppSystemAlerts} onChange={() => toggle("inAppSystemAlerts")} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center"><Mail size={18} className="text-purple-600" /></div>
          <div><h2 className="text-base font-bold text-gray-900">Email Notifications</h2><p className="text-xs text-gray-500">Sent to your registered email</p></div>
        </div>
        <NotifToggle label="Weekly Digest" desc="A summary of your progress every Monday" checked={notifSettings.emailWeeklyDigest} onChange={() => toggle("emailWeeklyDigest")} />
        <NotifToggle label="Course Reminders" desc="Reminders to continue courses in progress" checked={notifSettings.emailCourseReminders} onChange={() => toggle("emailCourseReminders")} />
        <NotifToggle label="New Tutorial Alerts" desc="When new tutorials are published" checked={notifSettings.emailNewTutorials} onChange={() => toggle("emailNewTutorials")} />
        <NotifToggle label="Promotions & Offers" desc="Special discounts and platform news" checked={notifSettings.emailPromotion} onChange={() => toggle("emailPromotion")} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center"><Smartphone size={18} className="text-orange-500" /></div>
          <div><h2 className="text-base font-bold text-gray-900">Push & SMS</h2><p className="text-xs text-gray-500">Mobile and text message alerts</p></div>
        </div>
        <NotifToggle label="Study Reminders" desc="Daily nudge to stay on track with your streak" checked={notifSettings.pushReminders} onChange={() => toggle("pushReminders")} />
        <NotifToggle label="Live Event Alerts" desc="Notifications when live sessions go live" checked={notifSettings.pushLiveEvents} onChange={() => toggle("pushLiveEvents")} />
        <NotifToggle label="SMS Alerts" desc="Text messages for critical account activity" checked={notifSettings.smsAlerts} onChange={() => toggle("smsAlerts")} />
      </div>

      <div className="flex items-center justify-end gap-4">
        {saved && <div className="flex items-center gap-2 text-green-600 text-sm font-medium"><CheckCircle2 size={16} /> Preferences saved!</div>}
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium text-sm hover:shadow-md transition-all"
        >
          <Save size={15} /> Save Preferences
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PLACEHOLDER PANEL
───────────────────────────────────────────── */
const PlaceholderPanel = ({ title, desc, icon: Icon }: { title: string; desc: string; icon: React.ElementType }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center justify-center text-center min-h-64">
    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4"><Icon size={24} className="text-blue-500" /></div>
    <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-sm text-gray-500 max-w-xs">{desc}</p>
  </div>
);