"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  updateProfile,
  changePassword,
  deleteAccount,
  uploadAvatar,
  deleteAvatar as deleteAvatarApi,
  uploadBanner, // Ensure this exists in your API file
} from "@/lib/profile-api";
import UserAvatar from "@/components/UserAvatar";
import {
  ArrowLeft,
  Edit2,
  User,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Upload,
  Trash2,
  Camera,
  Mail,
  Hash,
  GraduationCap,
  Shield,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// --- HELPER COMPONENTS ---

const TabButton = ({
  active,
  onClick,
  icon: Icon,
  label,
  variant = "default",
}: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 w-full sm:w-auto
      ${
        active
          ? variant === "danger"
            ? "bg-red-50 text-red-700 shadow-sm ring-1 ring-red-200"
            : "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
      }`}
  >
    <Icon
      size={16}
      className={
        active
          ? variant === "danger"
            ? "text-red-600"
            : "text-blue-600"
          : "text-slate-400"
      }
    />
    {label}
  </button>
);

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, logout, verify2FA } = useAuth();
  
  // Refs
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // --- STATE MANAGEMENT ---

  // Navigation
  const [activeTab, setActiveTab] = useState<"general" | "security" | "danger">("general");

  // General Profile
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Delete Account
  const [showDeleteSection, setShowDeleteSection] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Avatar & Banner
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Initialize Data
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    if (user) {
      setName(user.name);
      setBio(user.bio || "");
    }
  }, [token, user, router]);

  // --- HANDLERS ---

  const handleSave = async () => {
    if (!name.trim()) {
      setMessage({ type: "error", text: "Name cannot be empty" });
      return;
    }
    try {
      setLoading(true);
      setMessage(null);
      const response = await updateProfile(name, bio);
      if (user && token) {
        verify2FA({ ...user, name: response.user.name, bio: response.user.bio }, token);
      }
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (error: any) {
      setMessage({ type: "error", text: error.response?.data?.error || "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ type: "error", text: "All password fields are required" });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "New password must be at least 6 characters" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" });
      return;
    }
    try {
      setPasswordLoading(true);
      setPasswordMessage(null);
      await changePassword(currentPassword, newPassword);
      setPasswordMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setPasswordMessage({ type: "error", text: error.response?.data?.error || "Failed to change password" });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteMessage({ type: "error", text: "Password is required" });
      return;
    }
    if (deleteConfirmText !== "DELETE") {
      setDeleteMessage({ type: "error", text: 'You must type "DELETE" to confirm' });
      return;
    }
    try {
      setDeleteLoading(true);
      setDeleteMessage(null);
      await deleteAccount(deletePassword, deleteConfirmText);
      setDeleteMessage({ type: "success", text: "Account deleted successfully. Redirecting..." });
      setTimeout(() => {
        logout();
        router.push("/");
      }, 2000);
    } catch (error: any) {
      setDeleteMessage({ type: "error", text: error.response?.data?.error || "Failed to delete account" });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Avatar Handlers
  const handleAvatarUpload = async (file: File) => {
    try {
      setAvatarLoading(true);
      setAvatarMessage(null);
      if (file.size > 2 * 1024 * 1024) {
        setAvatarMessage({ type: "error", text: "Image size must be less than 2MB" });
        return;
      }
      const response = await uploadAvatar(file);
      if (user && token) {
        verify2FA({ ...user, avatar_url: response.avatar_url }, token);
      }
      setAvatarMessage({ type: "success", text: "Avatar uploaded successfully!" });
      setShowAvatarDialog(false);
      setAvatarPreview(null);
      setTimeout(() => setAvatarMessage(null), 3000);
    } catch (error: any) {
      setAvatarMessage({ type: "error", text: error.response?.data?.error || "Failed to upload avatar" });
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleAvatarDelete = async () => {
    try {
      setAvatarLoading(true);
      setAvatarMessage(null);
      await deleteAvatarApi();
      if (user && token) {
        verify2FA({ ...user, avatar_url: null }, token);
      }
      setAvatarMessage({ type: "success", text: "Avatar deleted successfully!" });
      setShowAvatarDialog(false);
      setAvatarPreview(null);
      setTimeout(() => setAvatarMessage(null), 3000);
    } catch (error: any) {
      setAvatarMessage({ type: "error", text: error.response?.data?.error || "Failed to delete avatar" });
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setAvatarMessage({ type: "error", text: "Please select an image file" });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Banner Handler
  const handleBannerFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select an image file for the banner" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: "Banner image must be less than 5MB" });
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setBannerPreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      setBannerLoading(true);
      const response = await uploadBanner(file); 
      if (user && token) {
        verify2FA({ ...user, banner_url: response.banner_url }, token);
      }
      setMessage({ type: "success", text: "Banner updated successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.response?.data?.error || "Failed to upload banner" });
      setBannerPreview(null);
    } finally {
      setBannerLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-slate-50 to-slate-100">
      {/* Texture Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>
      
      {/* --- HERO SECTION --- */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 relative z-10">
        
        {/* Editable Banner */}
        <div className="relative h-64 w-full overflow-hidden group">
          {user.banner_url || bannerPreview ? (
            <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform hover:scale-105"
                style={{ backgroundImage: `url(${bannerPreview || user.banner_url})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700">
               <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {bannerLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 backdrop-blur-sm">
                <div className="flex flex-col items-center text-white">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <span className="text-sm font-medium">Updating Banner...</span>
                </div>
            </div>
          )}

          <div className="absolute top-6 left-6 z-10">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <input 
                type="file" 
                ref={bannerInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleBannerFileSelect}
            />
            <Button
              size="sm"
              variant="secondary"
              className="gap-2 bg-white/90 hover:bg-white text-slate-800 shadow-md border-0"
              onClick={() => bannerInputRef.current?.click()}
              disabled={bannerLoading}
            >
              <ImageIcon size={16} />
              Edit Cover
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-6 pb-6">
            
            {/* Avatar Section */}
            <div className="-mt-16 flex flex-col items-center md:items-start z-10">
              <div className="relative group">
                <div className="ring-4 ring-white rounded-full bg-white shadow-2xl relative">
                  <UserAvatar user={user} size="xl" className="w-32 h-32 text-4xl" />
                  <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></span>
                </div>
                <button
                  onClick={() => setShowAvatarDialog(true)}
                  className="absolute bottom-1 right-1 p-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 hover:scale-110 shadow-lg transition-all duration-200 border-2 border-white"
                  title="Change profile picture"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div className="mt-4 text-center md:text-left space-y-1">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{user.name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
                        <Shield size={12} className="fill-blue-700/20" />
                        {user.role.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 shadow-sm">
                        <GraduationCap size={12} />
                        {user.faculty || "Faculty Not Set"}
                    </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex-1 flex flex-col justify-end">
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 mt-4 md:mt-0">
                <TabButton active={activeTab === "general"} onClick={() => setActiveTab("general")} icon={User} label="General Info" />
                <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} icon={Lock} label="Security" />
                <TabButton active={activeTab === "danger"} onClick={() => setActiveTab("danger")} icon={AlertTriangle} label="Danger Zone" variant="danger" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDEBAR */}
          <div className="space-y-6">
            
            {/* Account Status (Reverted to Clean Green Card) */}
            <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  <h3 className="font-medium text-green-900">Active Member</h3>
                </div>
                <p className="text-sm text-green-800/80 mb-3">
                  Your IEM membership is currently active and verified.
                </p>
                <div className="text-xs font-mono text-green-700 bg-green-100/50 px-2 py-1 rounded inline-block">
                  ID: {user.membership_number}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Info */}
            <Card className="border-slate-200 shadow-sm bg-white/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Mail className="w-4 h-4" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email</p>
                    <p className="text-sm text-slate-500 break-all">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><GraduationCap className="w-4 h-4" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Faculty</p>
                    <p className="text-sm text-slate-500">{user.faculty}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Hash className="w-4 h-4" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Matric No.</p>
                    <p className="text-sm font-mono text-slate-500 bg-slate-100 px-2 rounded inline-block">
                      {user.matric_number}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* GENERAL TAB */}
            {activeTab === "general" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-slate-200 shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-slate-100">
                    <div>
                      <CardTitle className="text-lg">Profile Details</CardTitle>
                      <CardDescription>Update your public profile information</CardDescription>
                    </div>
                    {!isEditing && (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="gap-2">
                        <Edit2 size={14} /> Edit
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {message && (
                      <Alert className={`${message.type === "error" ? "bg-red-50 border-red-200 text-red-800" : "bg-green-50 border-green-200 text-green-800"}`}>
                        <AlertDescription>{message.text}</AlertDescription>
                      </Alert>
                    )}
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-900">Full Name</label>
                        {isEditing ? (
                          <Input value={name} onChange={(e) => setName(e.target.value)} />
                        ) : (
                          <p className="text-sm text-slate-600 py-2 border-b border-slate-100">{user.name}</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-900">Bio</label>
                        {isEditing ? (
                          <>
                            <textarea
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                              placeholder="Tell us about yourself..."
                              maxLength={500}
                            />
                            <p className="text-xs text-slate-500 text-right">{bio.length}/500</p>
                          </>
                        ) : (
                          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg italic">
                            {user.bio || "No bio provided yet."}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  {isEditing && (
                    <div className="bg-slate-50/80 border-t border-slate-100 flex justify-end gap-3 py-4 px-6">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setIsEditing(false);
                          setName(user.name);
                          setBio(user.bio || "");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-slate-200 shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Password & Authentication</CardTitle>
                    <CardDescription>Manage your sign-in settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {passwordMessage && (
                      <Alert className={`${passwordMessage.type === "error" ? "bg-red-50 border-red-200 text-red-800" : "bg-green-50 border-green-200 text-green-800"}`}>
                        <AlertDescription>{passwordMessage.text}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Current Password</label>
                        <div className="relative">
                          <Input type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                          <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">New Password</label>
                          <div className="relative">
                            <Input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Confirm New Password</label>
                          <div className="relative">
                            <Input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="bg-slate-50/80 border-t border-slate-100 flex justify-end py-4 px-6">
                    <Button onClick={handleChangePassword} disabled={passwordLoading}>
                      {passwordLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* DANGER TAB */}
            {activeTab === "danger" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Warning: These actions are irreversible. Please proceed with caution.
                  </AlertDescription>
                </Alert>
                <Card className="border-red-100 shadow-sm bg-white/80">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-900">Delete Account</CardTitle>
                    <CardDescription>Permanently remove your account and all data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {deleteMessage && (
                      <Alert className={`${deleteMessage.type === "error" ? "bg-red-50 border-red-200 text-red-800" : "bg-green-50 border-green-200 text-green-800"}`}>
                        <AlertDescription>{deleteMessage.text}</AlertDescription>
                      </Alert>
                    )}
                    {!showDeleteSection ? (
                      <Button variant="destructive" onClick={() => setShowDeleteSection(true)}>
                        Start Deletion Process
                      </Button>
                    ) : (
                      <div className="space-y-4 p-4 border border-red-100 rounded-lg bg-red-50/30">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium text-red-900">Confirm Password</label>
                          <Input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} className="bg-white" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium text-red-900">Type <span className="font-bold">DELETE</span> to confirm</label>
                          <Input value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} className="bg-white" />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleteLoading} className="flex-1">
                            {deleteLoading ? "Deleting..." : "Permanently Delete"}
                          </Button>
                          <Button variant="outline" onClick={() => setShowDeleteSection(false)} className="flex-1 bg-white">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* AVATAR DIALOG */}
      {showAvatarDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <Card className="w-full max-w-md mx-4 shadow-2xl border-0 ring-1 ring-white/10 bg-white">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Upload a new photo (max 2MB)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {avatarPreview ? (
                <div className="flex justify-center py-4">
                  <img src={avatarPreview} alt="Preview" className="w-40 h-40 rounded-full object-cover ring-4 ring-slate-100 shadow-md" />
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 hover:bg-slate-50 transition-colors">
                  <label htmlFor="avatar-upload" className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-full"><Upload size={24} /></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900">Click to upload</p>
                      <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                    </div>
                  </label>
                  <input type="file" accept="image/*" onChange={handleAvatarFileSelect} className="hidden" id="avatar-upload" />
                </div>
              )}
              {avatarMessage && (
                <p className={`text-sm text-center ${avatarMessage.type === "error" ? "text-red-600" : "text-green-600"}`}>
                  {avatarMessage.text}
                </p>
              )}
              <div className="flex gap-3">
                {user.avatar_url && !avatarPreview && (
                  <Button variant="destructive" onClick={handleAvatarDelete} className="flex-1" disabled={avatarLoading}>
                    <Trash2 size={16} className="mr-2" /> Remove
                  </Button>
                )}
                {avatarPreview ? (
                  <>
                    <Button variant="outline" onClick={() => { setAvatarPreview(null); setAvatarMessage(null); }} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={() => { const input = document.getElementById("avatar-upload") as HTMLInputElement; if (input?.files?.[0]) handleAvatarUpload(input.files[0]); }} className="flex-1 bg-blue-600" disabled={avatarLoading}>
                      {avatarLoading ? "Uploading..." : "Save Photo"}
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setShowAvatarDialog(false)} className="w-full">Close</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}