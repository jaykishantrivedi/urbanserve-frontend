import { ArrowLeft } from 'lucide-react';

export default function ReviewBackButton({ onBack }) {
    return (
        <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium text-sm mb-6 transition-colors"
        >
            <ArrowLeft size={16} /> Back to Booking
        </button>
    );
}
