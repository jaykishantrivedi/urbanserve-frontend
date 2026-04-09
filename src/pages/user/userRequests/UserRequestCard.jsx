import { Calendar, ChevronRight, Clock, MapPin, XCircle } from 'lucide-react';
import { getRequestStatusClass } from './userRequestStatusConfig';

export default function UserRequestCard({ request, onView, onCancel }) {
    return (
        <div
            onClick={() => onView(request._id)}
            className={`bg-white border hover:border-blue-200 transition-all cursor-pointer rounded-2xl p-5 shadow-sm group ${request.status === 'cancelled' ? 'border-red-100 opacity-75' : 'border-gray-100'}`}
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {request.service?.serviceName || 'Service'}
                        </h3>
                        <span
                            className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${getRequestStatusClass(request.status)}`}
                        >
                            {request.status}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-gray-600 font-medium">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={15} className="text-gray-400" />
                            {request.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={15} className="text-gray-400" />
                            {new Date(request.preferredDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={15} className="text-gray-400" />
                            {request.preferredTime}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5">
                    {request.status === 'open' && (
                        <button
                            onClick={(event) => onCancel(request._id, event)}
                            className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors min-w-15"
                        >
                            <XCircle size={20} className="mb-1" />
                            <span className="text-[10px] uppercase font-bold tracking-wider">Cancel</span>
                        </button>
                    )}
                    <div className="flex flex-col items-center justify-center p-2 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors min-w-15 group-hover:scale-105">
                        <ChevronRight size={20} className="mb-1" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">View</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
