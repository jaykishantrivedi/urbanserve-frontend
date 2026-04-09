import { useGetUserPaymentsQuery } from '../../redux/paymentApi';
import { useGetUserBookingsQuery } from '../../redux/bookingApi';
import { generateReceipt } from '../../utils/generateReceipt';
import { Download, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const methodLabel = { razorpay: 'Razorpay', cash: 'Cash', upi: 'UPI', card: 'Card', netbanking: 'Net Banking' };
const statusCls = { paid: 'bg-emerald-100 text-emerald-700', pending: 'bg-amber-100 text-amber-700', failed: 'bg-red-100 text-red-700' };

export default function UserPaymentsPage() {
    const { data, isLoading } = useGetUserPaymentsQuery();
    const { data: bookingsData } = useGetUserBookingsQuery();
    const navigate = useNavigate();

    const payments = data?.allPayments || [];
    const bookings = bookingsData?.bookings || [];

    const handleDownload = (payment) => {
        const booking = bookings.find(b => b._id === (payment.booking?._id || payment.booking));
        if (!booking) { toast.error('Booking data not loaded yet'); return; }
        generateReceipt({ booking, payment });
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <span className="animate-spin text-4xl text-blue-500">🌀</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-[var(--height-navbar)] pb-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto mt-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Payments</h1>
                    <p className="text-gray-500 mt-2">All your payment transactions and receipts.</p>
                </div>

                {payments.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <CreditCard size={32} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No payments yet</h3>
                        <p className="text-gray-500 mt-2">Completed bookings and their payments will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {payments.map(payment => (
                            <div key={payment._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-gray-900">{payment.booking?.service?.serviceName || 'Service'}</h3>
                                            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase ${statusCls[payment.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
                                                {payment.paymentStatus}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-1">Provider: <span className="font-medium text-gray-700">{payment.provider?.businessName}</span></p>
                                        <p className="text-sm text-gray-400">
                                            {methodLabel[payment.paymentMethod] || payment.paymentMethod} · {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : '—'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 mb-0.5">Amount</p>
                                            <p className="text-xl font-extrabold text-gray-900">₹{payment.amount?.toLocaleString('en-IN')}</p>
                                        </div>
                                        {payment.paymentStatus === 'paid' && (
                                            <button
                                                onClick={() => handleDownload(payment)}
                                                className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl font-semibold text-sm transition-colors"
                                            >
                                                <Download size={15} /> Receipt
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
