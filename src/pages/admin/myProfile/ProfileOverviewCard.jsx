import { useRef } from "react";
import { Mail, Shield, Camera, Loader2 } from "lucide-react";

export default function ProfileOverviewCard({ user, name, isUploadingPfp, onPfpUpload }) {
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-32 h-32 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
            {user?.pfpUrl ? (
              <img src={user.pfpUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-4xl font-bold">
                {name ? name.substring(0, 2).toUpperCase() : "AD"}
              </span>
            )}
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            disabled={isUploadingPfp}
            onClick={openFilePicker}
          >
            {isUploadingPfp ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Camera className="w-5 h-5 text-white" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={onPfpUpload}
            disabled={isUploadingPfp}
          />
        </div>
        <div className="mt-6 text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            {user?.email}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full mt-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Administrator</span>
          </div>
        </div>
      </div>
    </div>
  );
}
