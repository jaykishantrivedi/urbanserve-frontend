import { useState } from 'react';
import { X, Calendar, MapPin, Clock, MessageSquare, Briefcase } from 'lucide-react';
import { useCreateServiceRequestMutation, useSendRequestToProvidersMutation } from '../../redux/serviceRequestApi';
import Button from '../ui/Button';
import { toast } from 'react-toastify';

const ServiceRequestModal = ({ isOpen, onClose, serviceId, providerId = null, serviceName = "this service" }) => {
    
    const [createRequest, { isLoading: isCreating }] = useCreateServiceRequestMutation();
    const [sendToProviders, { isLoading: isSending }] = useSendRequestToProvidersMutation();

    const [formData, setFormData] = useState({
        location: '',
        address: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reqRes = await createRequest({
                service: serviceId,
                ...formData
            }).unwrap();

            const requestId = reqRes.serviceRequest._id;
            await sendToProviders({ requestId, providerId }).unwrap();

            toast.success(providerId ? "Enquiry successfully sent to this provider!" : "Enquiry successfully broadcasted to nearby providers!");
            onClose();
            
        } catch (error) {
            toast.error(error?.data?.message || "Failed to submit request.");
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-100 flex justify-between items-center px-6 py-4 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Request Enquiry</h2>
                        <p className="text-sm text-gray-500 mt-1">For {serviceName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors focus:outline-none"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    {/* Location Field */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <MapPin size={16} className="text-blue-500" /> City
                        </label>
                        <input
                            required
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Surat, Mumbai"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>

                    {/* Address Field */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Briefcase size={16} className="text-blue-500" /> Full Address
                        </label>
                        <textarea
                            required
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Your full operational address"
                            rows={2}
                            maxLength={200}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Preferred Date */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar size={16} className="text-blue-500" /> Preferred Date
                            </label>
                            <input
                                required
                                type="date"
                                name="preferredDate"
                                min={today}
                                value={formData.preferredDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-700"
                            />
                        </div>

                        {/* Preferred Time */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Clock size={16} className="text-blue-500" /> Preferred Time
                            </label>
                            <input
                                required
                                type="time"
                                name="preferredTime"
                                value={formData.preferredTime}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <MessageSquare size={16} className="text-blue-500" /> Additional Details (Optional)
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Describe the problem, add specific instructions, or list requirements..."
                            maxLength={500}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                        />
                    </div>

                    {/* Footer / Submit */}
                    <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Button 
                            variant="outline" 
                            type="button" 
                            onClick={onClose}
                            disabled={isCreating || isSending}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit"
                            disabled={isCreating || isSending || !formData.location || !formData.address || !formData.preferredDate || !formData.preferredTime}
                            isLoading={isCreating || isSending}
                        >
                            {providerId ? "Send Direct Request" : "Broadcast to Area"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ServiceRequestModal;
