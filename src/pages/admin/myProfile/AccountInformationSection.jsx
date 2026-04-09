import { Calendar, Clock } from "lucide-react";

export default function AccountInformationSection({ accountCreated, lastLogin }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Calendar className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
          <p className="text-sm text-gray-500">View your account details and activity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="p-2 bg-white rounded-lg">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Account Created</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{accountCreated}</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="p-2 bg-white rounded-lg">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Last Login</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{lastLogin}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
