import { useGetNotificationsQuery, useMarkAsReadMutation } from '../../redux/notificationApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bell, CheckCircle, Info, XCircle, AlertTriangle, Clock } from 'lucide-react';

export default function NotificationsPage() {
    const { data: notificationsData, isLoading } = useGetNotificationsQuery();
    const [markAsRead] = useMarkAsReadMutation();
    const navigate = useNavigate();
    
    const { userData } = useSelector(state => state.auth);
    const role = userData?.user?.role;

    const notifications = notificationsData?.notifications || [];

    const handleNotificationClick = async (notification) => {
        if (!notification.isRead) {
            await markAsRead(notification._id);
        }

        // Routing logic based on type and role
        if (role === 'provider') {
            switch(notification.type) {
                case 'NEW_SERVICE_REQUEST':
                    navigate('/provider/requests');
                    break;
                case 'REQUEST_CANCELLED':
                    navigate('/provider/requests');
                    break;
                case 'MINIMUM_BALANCE_WARNING':
                    navigate('/provider/wallet');
                    break;
                default: 
                    break;
            }
        } else if (role === 'user') {
            switch(notification.type) {
                case 'QUOTE_RECEIVED':
                    navigate(`/user/requests/${notification.relatedId}`); // Assuming relatedId holds the serviceRequestId
                    break;
                case 'REQUEST_EXPIRED':
                    navigate('/user/requests');
                    break;
                default:
                    break;
            }
        }
    };

    const getIcon = (type) => {
        switch(type) {
            case 'NEW_SERVICE_REQUEST': return <Bell className="text-blue-500" size={20} />;
            case 'QUOTE_RECEIVED': return <CheckCircle className="text-emerald-500" size={20} />;
            case 'MINIMUM_BALANCE_WARNING': return <AlertTriangle className="text-amber-500" size={20} />;
            case 'REQUEST_CANCELLED': 
            case 'REQUEST_EXPIRED': return <XCircle className="text-red-500" size={20} />;
            default: return <Info className="text-gray-500" size={20} />;
        }
    };

    const getBgColor = (type, isRead) => {
        if (isRead) return "bg-white border-gray-100 opacity-70";
        switch(type) {
            case 'NEW_SERVICE_REQUEST': return "bg-blue-50/50 border-blue-100";
            case 'QUOTE_RECEIVED': return "bg-emerald-50/50 border-emerald-100";
            case 'MINIMUM_BALANCE_WARNING': return "bg-amber-50/50 border-amber-100";
            case 'REQUEST_CANCELLED':
            case 'REQUEST_EXPIRED': return "bg-red-50/50 border-red-100";
            default: return "bg-gray-50/50 border-gray-100";
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
                <span className="animate-spin text-4xl text-blue-500">🌀</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-[var(--height-navbar)] pb-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto mt-8">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
                    <p className="text-gray-500 mt-2">Catch up on your latest alerts and activities.</p>
                </div>

                {notifications.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
                        <p className="text-gray-500 mt-2">You have no new notifications.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map(notif => (
                            <div 
                                key={notif._id} 
                                onClick={() => handleNotificationClick(notif)}
                                className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${getBgColor(notif.type, notif.isRead)}`}
                            >
                                <div className="mt-1 flex-shrink-0 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                                    {getIcon(notif.type)}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-base font-bold mb-1 ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</h4>
                                    <p className={`text-sm leading-relaxed ${notif.isRead ? 'text-gray-500' : 'text-gray-600 font-medium'}`}>{notif.message}</p>
                                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                        <Clock size={12} />
                                        <span>{new Date(notif.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                                {!notif.isRead && (
                                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 shrink-0 shadow-sm shadow-blue-500/50"></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
