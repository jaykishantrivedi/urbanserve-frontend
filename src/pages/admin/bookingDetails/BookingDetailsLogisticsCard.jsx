import { Briefcase, Calendar, FileText, MapPin, Search } from "lucide-react"
import { BookingDetailsInfoItem } from "./BookingDetailsInfoItem"

export function BookingDetailsLogisticsCard({ serviceDate, serviceTime, service, location, serviceRequest, formatDt }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden line-clamp-none">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Service Logistics</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                <BookingDetailsInfoItem icon={Calendar} label="Scheduled Date" value={formatDt(serviceDate, serviceTime)} />
                <BookingDetailsInfoItem
                    icon={Briefcase}
                    label="Service Type"
                    value={service?.serviceName}
                    valueClass="text-indigo-600 font-semibold"
                />
                <BookingDetailsInfoItem icon={MapPin} label="Region" value={location} />

                <div className="sm:col-span-2">
                    <BookingDetailsInfoItem icon={Search} label="Full Address" value={serviceRequest?.address} />
                </div>

                <div className="sm:col-span-2">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        <FileText className="w-3.5 h-3.5" /> Customer Notes
                    </label>
                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {serviceRequest?.message || <span className="text-gray-400 italic">No notes provided</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}
