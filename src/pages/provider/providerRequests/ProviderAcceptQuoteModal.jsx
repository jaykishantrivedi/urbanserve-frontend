import { MessageSquare, X } from 'lucide-react';
import Button from '../../../components/ui/Button';

export default function ProviderAcceptQuoteModal({
  selectedRequest,
  setSelectedRequest,
  message,
  setMessage,
  submitAcceptance,
  isAccepting,
}) {
  if (!selectedRequest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedRequest(null)}
      />

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md relative z-10 overflow-hidden flex flex-col animate-slide-down">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Send Response Quote</h2>
          <button
            onClick={() => setSelectedRequest(null)}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submitAcceptance} className="p-6">
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
              <MessageSquare size={16} className="text-blue-500" /> Add a message for the user (Optional)
            </label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="e.g. I can be there by 10 AM. I have all the tools required."
              rows={4}
              maxLength={300}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-2 text-right">{message.length}/300</p>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button variant="outline" type="button" onClick={() => setSelectedRequest(null)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isAccepting}>
              Send Quote
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
