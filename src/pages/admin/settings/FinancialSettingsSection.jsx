import { DollarSign } from "lucide-react";
import { Input, Label } from "./FieldPrimitives";

export default function FinancialSettingsSection({
  commission,
  onCommissionChange,
  minimumWalletBalance,
  onMinimumWalletBalanceChange,
  maximumCashLimit,
  onMaximumCashLimitChange,
  currency,
  onSave,
  isUpdating,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-green-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Commission & Financial Limits</h3>
          <p className="text-sm text-gray-500">Set commission rates, block thresholds, and cash caps</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="commission">Platform Commission: {commission}%</Label>
          <div className="max-w-md flex items-center gap-4">
            <input
              type="range"
              id="commission"
              min="0"
              max="50"
              step="1"
              value={commission}
              onChange={(e) => onCommissionChange(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <p className="text-xs text-gray-500">Percentage charged per completed booking</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="min-wallet">Minimum Wallet Balance (Providers)</Label>
          <Input
            id="min-wallet"
            type="number"
            min="0"
            value={minimumWalletBalance}
            onChange={(e) => onMinimumWalletBalanceChange(e.target.value)}
            className="max-w-md"
            placeholder="e.g. 100"
          />
          <p className="text-xs text-gray-500">
            Providers falling below this amount will not receive new booking leads.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-cash">Maximum Allowed Cash at Hand</Label>
          <Input
            id="max-cash"
            type="number"
            min="0"
            value={maximumCashLimit}
            onChange={(e) => onMaximumCashLimitChange(e.target.value)}
            className="max-w-md"
            placeholder="e.g. 5000"
          />
          <p className="text-xs text-gray-500">
            Providers accumulating over this much physical cash must remit to admin.
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 max-w-md">
          <p className="text-sm text-indigo-800">
            <span className="font-semibold">Calculation Example:</span> For a {currency}1,000 cash booking,
            platform earns {currency}
            {(1000 * commission) / 100}. The provider&apos;s virtual wallet will be debited by this amount.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isUpdating}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save Financial Rules"}
        </button>
      </div>
    </div>
  );
}
