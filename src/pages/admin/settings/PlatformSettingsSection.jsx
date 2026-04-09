import { Globe } from "lucide-react";
import { Input, Label } from "./FieldPrimitives";

export default function PlatformSettingsSection({
  platformName,
  onPlatformNameChange,
  currency,
  onCurrencyChange,
  timeFormat,
  onTimeFormatChange,
  onSave,
  isUpdating,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Globe className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Platform Settings</h3>
          <p className="text-sm text-gray-500">Configure basic platform settings and preferences</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="platform-name">Platform Name</Label>
          <Input
            id="platform-name"
            type="text"
            value={platformName}
            onChange={(e) => onPlatformNameChange(e.target.value)}
            className="max-w-md"
            placeholder="Enter platform name"
          />
          <p className="text-xs text-gray-500">This name will appear across the platform</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="max-w-md w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="INR">₹ INR - Indian Rupee</option>
            <option value="USD">$ USD - US Dollar</option>
            <option value="EUR">€ EUR - Euro</option>
            <option value="GBP">£ GBP - British Pound</option>
          </select>
          <p className="text-xs text-gray-500">Default currency for all transactions</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time-format">Time Format</Label>
          <select
            id="time-format"
            value={timeFormat}
            onChange={(e) => onTimeFormatChange(e.target.value)}
            className="max-w-md w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="12-hour">12-hour (AM/PM)</option>
            <option value="24-hour">24-hour</option>
          </select>
          <p className="text-xs text-gray-500">Display format for time across the platform</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isUpdating}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save Platform Settings"}
        </button>
      </div>
    </div>
  );
}
