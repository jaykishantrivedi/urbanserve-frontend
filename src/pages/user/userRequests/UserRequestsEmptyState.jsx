import { FileText } from 'lucide-react';

export default function UserRequestsEmptyState({ onBrowseServices }) {
    return (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No active requests</h3>
            <p className="text-gray-500 mt-2 mb-6">You haven't requested any services yet.</p>
            <button
                onClick={onBrowseServices}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors"
            >
                Browse Services
            </button>
        </div>
    );
}
