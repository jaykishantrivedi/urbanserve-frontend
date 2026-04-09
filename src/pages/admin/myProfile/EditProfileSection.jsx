import { User } from "lucide-react";

export default function EditProfileSection({ name, onNameChange, isUpdatingProfile, onSaveProfile }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <User className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Edit Profile Information</h3>
          <p className="text-sm text-gray-500">Update your display name</p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
          Full Name
        </label>
        <div className="relative max-w-2xl">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Enter your full name"
            disabled={isUpdatingProfile}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onSaveProfile}
          disabled={isUpdatingProfile}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
        >
          {isUpdatingProfile ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
