import { Mail } from "lucide-react";
import { Switch } from "./FieldPrimitives";

export default function NotificationChannelsSection({
  emailNotifications,
  onEmailNotificationsChange,
  smsNotifications,
  onSmsNotificationsChange,
  pushNotifications,
  onPushNotificationsChange,
  onSave,
  isUpdating,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Mail className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Notification Channels (Admin)</h3>
          <p className="text-sm text-gray-500">Enable or disable global outbound notification relays</p>
        </div>
      </div>

      <div className="space-y-4 max-w-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Email Notifications</p>
            <p className="text-xs text-gray-500">Send transactional emails using Mail relays</p>
          </div>
          <Switch
            id="email-notif"
            checked={emailNotifications}
            onChange={onEmailNotificationsChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
            <p className="text-xs text-gray-500">Dispatch SMS alerts for urgent bookings</p>
          </div>
          <Switch id="sms-notif" checked={smsNotifications} onChange={onSmsNotificationsChange} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Push Notifications</p>
            <p className="text-xs text-gray-500">Device-level native push notifications</p>
          </div>
          <Switch
            id="push-notif"
            checked={pushNotifications}
            onChange={onPushNotificationsChange}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isUpdating}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save Notification Settings"}
        </button>
      </div>
    </div>
  );
}
